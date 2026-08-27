/**
 * @jest-environment node
 */

export {}

const mockShares = new Map<string, any>()

jest.mock('../lib/share-storage', () => ({
  storeData: jest.fn(async (key: string, data: any) => {
    mockShares.set(key, JSON.parse(JSON.stringify(data)))
    return true
  }),
  getData: jest.fn(async (key: string) => {
    const data = mockShares.get(key)
    return data ? JSON.parse(JSON.stringify(data)) : null
  }),
  updateData: jest.fn(async (key: string, data: any) => {
    mockShares.set(key, JSON.parse(JSON.stringify(data)))
  }),
  deleteData: jest.fn(async (key: string) => {
    mockShares.delete(key)
  }),
}))

const shareActions = require('../app/actions/share')

function createShare(maxViews = 1, readCapability?: string) {
  return shareActions.createSecureShare({
    title: 'Sensitive title',
    encryptedContent: 'encrypted-content',
    iv: 'initialization-vector',
    expirationTime: '1h',
    maxViews,
    requirePassword: false,
    linkType: 'standard',
    readCapability,
  })
}

describe('Share Actions - Basic Tests', () => {
  beforeEach(() => mockShares.clear())

  it('should have createSecureShare function', () => {
    // This is a basic test to ensure the module can be imported
    expect(typeof shareActions.createSecureShare).toBe('function')
  })

  it('should have getSecureShare function', () => {
    expect(typeof shareActions.getSecureShare).toBe('function')
  })

  it('should have getShareMetadata function', () => {
    expect(typeof shareActions.getShareMetadata).toBe('function')
  })

  it('should have deleteSecureShare function', () => {
    expect(typeof shareActions.deleteSecureShare).toBe('function')
  })

  it('should validate input data structure', () => {
    // Test that the functions exist and can be called
    const { createSecureShare } = shareActions
    
    // This should not throw an error when called with invalid data
    expect(async () => {
      await createSecureShare({
        title: '',
        encryptedContent: '',
        iv: '',
        expirationTime: '1h',
        maxViews: 0,
        requirePassword: false,
        linkType: 'standard',
      })
    }).not.toThrow()
  })
})

describe('Share capability authorization', () => {
  beforeEach(() => mockShares.clear())

  it('stores capability hashes and returns each capability once', async () => {
    const created = await createShare()

    expect(created).toEqual(expect.objectContaining({
      success: true,
      readCapability: expect.any(String),
      deleteCapability: expect.any(String),
    }))

    const stored = mockShares.get(`share:${created.id}`)
    expect(stored.readCapabilityHash).toEqual(expect.any(String))
    expect(stored.deleteCapabilityHash).toEqual(expect.any(String))
    expect(stored.readCapabilityHash).not.toBe(created.readCapability)
    expect(stored.deleteCapabilityHash).not.toBe(created.deleteCapability)
    expect(created.readCapability).not.toBe(created.deleteCapability)
  })

  it('rejects malformed client-derived read capabilities', async () => {
    const created = await createShare(1, 'too-short')

    expect(created).toEqual({ success: false, error: 'Invalid read capability' })
    expect(mockShares.size).toBe(0)
  })

  it('accepts a client-derived read capability', async () => {
    const readCapability = 'A'.repeat(43)
    const created = await createShare(1, readCapability)

    expect(created.readCapability).toBe(readCapability)
    await expect(shareActions.getShareMetadata(created.id, readCapability)).resolves.toMatchObject({ success: true })
  })

  it('requires the read capability for metadata and redemption', async () => {
    const created = await createShare()

    await expect(shareActions.getShareMetadata(created.id)).resolves.toMatchObject({ success: false })
    await expect(shareActions.getShareMetadata(created.id, 'wrong-capability')).resolves.toMatchObject({ success: false })
    await expect(shareActions.getShareMetadata(created.id, created.readCapability)).resolves.toMatchObject({
      success: true,
      data: { currentViews: 0 },
    })

    await expect(shareActions.getSecureShare(created.id, undefined, 'wrong-capability')).resolves.toMatchObject({ success: false })
    expect(mockShares.has(`share:${created.id}`)).toBe(true)

    await expect(shareActions.getSecureShare(created.id, undefined, created.readCapability)).resolves.toMatchObject({
      success: true,
      data: { currentViews: 1 },
    })
    expect(mockShares.has(`share:${created.id}`)).toBe(false)
  })

  it('requires the delete capability for explicit deletion', async () => {
    const created = await createShare(2)

    await expect(shareActions.deleteSecureShare(created.id, created.readCapability)).resolves.toMatchObject({ success: false })
    await expect(shareActions.deleteSecureShare(created.id, 'wrong-capability')).resolves.toMatchObject({ success: false })
    expect(mockShares.has(`share:${created.id}`)).toBe(true)

    await expect(shareActions.deleteSecureShare(created.id, created.deleteCapability)).resolves.toEqual({ success: true })
    expect(mockShares.has(`share:${created.id}`)).toBe(false)
  })

  it('keeps legacy shares without capability hashes accessible', async () => {
    const id = 'legacy-share'
    mockShares.set(`share:${id}`, {
      id,
      title: '',
      encryptedContent: 'legacy-encrypted-content',
      iv: 'legacy-iv',
      expiresAt: new Date(Date.now() + 60_000).toISOString(),
      maxViews: 1,
      currentViews: 0,
      requirePassword: false,
      createdAt: new Date().toISOString(),
    })

    await expect(shareActions.getShareMetadata(id)).resolves.toMatchObject({ success: true })
    await expect(shareActions.getSecureShare(id)).resolves.toMatchObject({ success: true })
  })
})
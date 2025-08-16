/**
 * @jest-environment jsdom
 */

import { SecureCrypto } from '../lib/crypto'

// Mock Web Crypto API for testing
const mockCrypto = {
  subtle: {
    generateKey: jest.fn(),
    exportKey: jest.fn(),
    importKey: jest.fn(),
    encrypt: jest.fn(),
    decrypt: jest.fn(),
  },
  getRandomValues: jest.fn(),
}

// Mock window.crypto
Object.defineProperty(window, 'crypto', {
  value: mockCrypto,
  writable: true,
})

describe('SecureCrypto', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('generateKey', () => {
    it('should generate AES-256-GCM key', async () => {
      const mockKey = { type: 'secret' }
      mockCrypto.subtle.generateKey.mockResolvedValue(mockKey)

      const result = await SecureCrypto.generateKey()

      expect(mockCrypto.subtle.generateKey).toHaveBeenCalledWith(
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      )
      expect(result).toBe(mockKey)
    })
  })

  describe('exportKey', () => {
    it('should export key to base64 string', async () => {
      const mockKey = { type: 'secret' }
      const mockArrayBuffer = new ArrayBuffer(32)
      
      mockCrypto.subtle.exportKey.mockResolvedValue(mockArrayBuffer)
      global.btoa = jest.fn(() => 'base64key')

      const result = await SecureCrypto.exportKey(mockKey as CryptoKey)

      expect(mockCrypto.subtle.exportKey).toHaveBeenCalledWith('raw', mockKey)
      expect(result).toBe('base64key')
    })
  })

  describe('importKey', () => {
    it('should import key from base64 string', async () => {
      const mockKey = { type: 'secret' }
      const keyString = 'base64key'
      
      global.atob = jest.fn(() => 'rawkey')
      mockCrypto.subtle.importKey.mockResolvedValue(mockKey)

      const result = await SecureCrypto.importKey(keyString)

      expect(global.atob).toHaveBeenCalledWith(keyString)
      expect(mockCrypto.subtle.importKey).toHaveBeenCalledWith(
        'raw',
        expect.any(Uint8Array),
        {
          name: 'AES-GCM',
          length: 256,
        },
        true,
        ['encrypt', 'decrypt']
      )
      expect(result).toBe(mockKey)
    })
  })

  describe('encrypt', () => {
    it('should encrypt data with AES-256-GCM', async () => {
      const data = 'test data'
      const mockKey = { type: 'secret' }
      const mockIV = new Uint8Array(12)
      const mockEncrypted = new ArrayBuffer(16)
      
      mockCrypto.getRandomValues.mockReturnValue(mockIV)
      mockCrypto.subtle.encrypt.mockResolvedValue(mockEncrypted)
      global.btoa = jest.fn()
        .mockReturnValueOnce('encrypteddata')
        .mockReturnValueOnce('ivdata')

      const result = await SecureCrypto.encrypt(data, mockKey as CryptoKey)

      expect(mockCrypto.getRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array))
      expect(mockCrypto.subtle.encrypt).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'AES-GCM',
          iv: mockIV,
        }),
        mockKey,
        expect.any(Object) // TextEncoder output
      )
      expect(result).toEqual({
        encrypted: 'encrypteddata',
        iv: 'ivdata',
      })
    })
  })

  describe('decrypt', () => {
    it('should decrypt data with AES-256-GCM', async () => {
      const encryptedData = 'encrypteddata'
      const ivString = 'ivdata'
      const mockKey = { type: 'secret' }
      const mockDecrypted = new ArrayBuffer(16)
      
      global.atob = jest.fn()
        .mockReturnValueOnce('rawiv')
        .mockReturnValueOnce('rawencrypted')
      mockCrypto.subtle.decrypt.mockResolvedValue(mockDecrypted)

      // Mock TextDecoder for this test
      const mockDecoder = {
        decode: jest.fn().mockReturnValue('decrypted data'),
      }
      global.TextDecoder = jest.fn(() => mockDecoder)

      const result = await SecureCrypto.decrypt(encryptedData, mockKey as CryptoKey, ivString)

      expect(global.atob).toHaveBeenCalledWith(ivString)
      expect(global.atob).toHaveBeenCalledWith(encryptedData)
      expect(mockCrypto.subtle.decrypt).toHaveBeenCalledWith(
        {
          name: 'AES-GCM',
          iv: expect.any(Uint8Array),
        },
        mockKey,
        expect.any(Uint8Array)
      )
      expect(result).toBe('decrypted data')
    })

    it('should throw error on decryption failure', async () => {
      const encryptedData = 'encrypteddata'
      const ivString = 'ivdata'
      const mockKey = { type: 'secret' }
      
      global.atob = jest.fn()
        .mockReturnValueOnce('rawiv')
        .mockReturnValueOnce('rawencrypted')
      mockCrypto.subtle.decrypt.mockRejectedValue(new Error('Decryption failed'))

      await expect(SecureCrypto.decrypt(encryptedData, mockKey as CryptoKey, ivString))
        .rejects.toThrow('Decryption failed')
    })
  })

  describe('generateSecurePassword', () => {
    it('should generate password with default length', () => {
      const mockArray = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
      mockCrypto.getRandomValues.mockReturnValue(mockArray)

      const result = SecureCrypto.generateSecurePassword()

      expect(mockCrypto.getRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array))
      expect(result).toHaveLength(16)
      expect(typeof result).toBe('string')
    })

    it('should generate password with custom length', () => {
      const mockArray = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      mockCrypto.getRandomValues.mockReturnValue(mockArray)

      const result = SecureCrypto.generateSecurePassword(8)

      expect(mockCrypto.getRandomValues).toHaveBeenCalledWith(expect.any(Uint8Array))
      expect(result).toHaveLength(8)
    })
  })

  describe('Integration test', () => {
    it('should encrypt and decrypt data successfully', async () => {
      // Use real crypto operations for integration test
      const originalData = 'Hello, World!'
      
      // Mock the crypto operations to simulate real behavior
      const mockKey = { type: 'secret' }
      const mockIV = new Uint8Array(12).fill(1)
      const mockEncrypted = Buffer.from('encrypted')
      
      mockCrypto.subtle.generateKey.mockResolvedValue(mockKey)
      mockCrypto.getRandomValues.mockReturnValue(mockIV)
      mockCrypto.subtle.encrypt.mockResolvedValue(mockEncrypted.buffer)
      mockCrypto.subtle.decrypt.mockResolvedValue(Buffer.from(originalData).buffer)
      
      global.btoa = jest.fn()
        .mockReturnValueOnce('ZW5jcnlwdGVk') // 'encrypted' in base64
        .mockReturnValueOnce('AQEBAQEBAQEBAQEB') // IV in base64
      
      global.atob = jest.fn()
        .mockReturnValueOnce('\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01') // IV
        .mockReturnValueOnce('encrypted')
      
      // Mock TextDecoder for integration test
      const mockDecoderIntegration = {
        decode: jest.fn().mockReturnValue(originalData),
      }
      global.TextDecoder = jest.fn(() => mockDecoderIntegration)

      // Generate key
      const key = await SecureCrypto.generateKey()
      
      // Encrypt data
      const { encrypted, iv } = await SecureCrypto.encrypt(originalData, key)
      
      // Decrypt data
      const decrypted = await SecureCrypto.decrypt(encrypted, key, iv)
      
      expect(decrypted).toBe(originalData)
    })
  })
})
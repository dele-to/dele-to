"use server"

import { randomUUID, randomBytes } from "crypto"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// Logging utility
const DEBUG_ENABLED = process.env.DEBUG_ENABLED || false
const log = DEBUG_ENABLED ? console.log : () => {}
const logError = DEBUG_ENABLED ? console.error : () => {}
const logWarn = DEBUG_ENABLED ? console.warn : () => {}

// File-based storage as fallback (persists across server restarts)
const STORAGE_DIR = path.join(process.cwd(), ".secure-shares")
const STORAGE_FILE = path.join(STORAGE_DIR, "shares.json")

// Initialize Redis using proper ES module import
let redis: any = null
let redisInitialized = false

async function initRedis() {
  if (redisInitialized) return redis

  try {
    // Check for multiple possible environment variable names
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.REDIS_URL

    const redisToken =
      process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

    log("🔍 Environment variable check:")
    log("  UPSTASH_REDIS_REST_URL:", !!process.env.UPSTASH_REDIS_REST_URL)
    log("  UPSTASH_REDIS_REST_TOKEN:", !!process.env.UPSTASH_REDIS_REST_TOKEN)
    log("  KV_REST_API_URL:", !!process.env.KV_REST_API_URL)
    log("  KV_REST_API_TOKEN:", !!process.env.KV_REST_API_TOKEN)
    log("  REDIS_URL:", !!process.env.REDIS_URL)
    log("  Using URL:", !!redisUrl)
    log("  Using Token:", !!redisToken)

    if (redisUrl && redisToken) {
      log("🔄 Initializing Redis with available credentials...")

      // Use dynamic import for Upstash Redis
      const { Redis } = await import("@upstash/redis")

      redis = new Redis({
        url: redisUrl,
        token: redisToken,
      })

      // Test the connection
      const pingResult = await redis.ping()
      log("✅ Redis initialized successfully, ping result:", pingResult)
      redisInitialized = true
      return redis
    } else {
      log("⚠️ No Redis credentials found in environment variables")
      log(
        "  Available env vars:",
        Object.keys(process.env).filter(
          (key) => key.includes("REDIS") || key.includes("KV") || key.includes("UPSTASH"),
        ),
      )
    }
  } catch (error) {
    logWarn("❌ Redis initialization failed:", error)
    redis = null
    redisInitialized = true
  }
  return null
}

interface ShareData {
  id: string
  title: string
  encryptedContent: string
  iv: string
  expiresAt: string
  maxViews: number
  currentViews: number
  requirePassword: boolean
  passwordHash?: string
  createdAt: string
}

interface FileStorage {
  [key: string]: {
    data: ShareData
    expiresAt: number
  }
}

// Ensure storage directory exists
async function ensureStorageDir() {
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR, { recursive: true })
    log("📁 Created storage directory:", STORAGE_DIR)
  }
}

// Load shares from file
async function loadFileStorage(): Promise<FileStorage> {
  try {
    await ensureStorageDir()
    if (existsSync(STORAGE_FILE)) {
      const content = await readFile(STORAGE_FILE, "utf-8")
      const storage = JSON.parse(content) as FileStorage

      // Clean expired shares
      const now = Date.now()
      const cleaned: FileStorage = {}
      let removedCount = 0

      for (const [key, value] of Object.entries(storage)) {
        if (value.expiresAt > now) {
          cleaned[key] = value
        } else {
          removedCount++
        }
      }

      if (removedCount > 0) {
        log(`🧹 Cleaned ${removedCount} expired shares from file storage`)
        await saveFileStorage(cleaned)
      }

      log(`📁 Loaded ${Object.keys(cleaned).length} shares from file storage`)
      return cleaned
    } else {
      log("� No existin g storage file found, starting fresh")
    }
  } catch (error) {
    logError("❌ Failed to load file storage:", error)
  }
  return {}
}

// Save shares to file
async function saveFileStorage(storage: FileStorage): Promise<void> {
  try {
    await ensureStorageDir()
    await writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2))
    log(`💾 Saved ${Object.keys(storage).length} shares to file storage`)
  } catch (error) {
    logError("❌ Failed to save file storage:", error)
    throw error
  }
}

function hashPassword(password: string): string {
  const salt = process.env.SALT || "default-salt-change-in-production"
  return Buffer.from(password + salt).toString("base64")
}

function generateShareId(linkType: string = "standard"): string {
  if (linkType === "shorter") {
    // Generate a shorter, URL-safe ID (8 characters)
    return randomBytes(6).toString('base64url')
  } else {
    // Use standard UUID for maximum security
    return randomUUID()
  }
}

function getExpirationTime(timeString: string): Date {
  const now = new Date()
  switch (timeString) {
    case "15m":
      return new Date(now.getTime() + 15 * 60 * 1000)
    case "1h":
      return new Date(now.getTime() + 60 * 60 * 1000)
    case "24h":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000)
    case "7d":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    default:
      return new Date(now.getTime() + 60 * 60 * 1000)
  }
}

async function storeData(key: string, data: ShareData, ttlSeconds: number): Promise<boolean> {
  log(`📦 Storing data with key: ${key}, ID: ${data.id}, TTL: ${ttlSeconds}s`)

  const expiresAt = Date.now() + ttlSeconds * 1000
  let redisStored = false
  let fileStored = false

  // Ensure Redis is initialized before using it
  const redisClient = await initRedis()

  // Try Redis first if available
  if (redisClient) {
    try {
      const safeTtl = Math.max(300, Math.min(ttlSeconds, 7 * 24 * 60 * 60))
      const result = await redisClient.setex(key, safeTtl, JSON.stringify(data))
      log(`✅ Redis storage successful:`, result)
      redisStored = true
    } catch (error) {
      logError("❌ Redis storage failed:", error)
    }
  }

  // Always store in file system as backup/primary
  try {
    const fileStorage = await loadFileStorage()
    fileStorage[key] = { data, expiresAt }
    await saveFileStorage(fileStorage)
    log(`✅ File storage successful for key: ${key}`)
    fileStored = true
  } catch (error) {
    logError("❌ File storage failed:", error)
  }

  // Return true if at least one storage method succeeded
  const stored = redisStored || fileStored
  log(`📊 Storage summary - Redis: ${redisStored}, File: ${fileStored}, Overall: ${stored}`)

  return stored
}

export async function getData(key: string): Promise<ShareData | null> {
  log(`🔍 Retrieving data with key: ${key}`)

  // Ensure Redis is initialized before using it
  const redisClient = await initRedis()

  // Try Redis first if available
  if (redisClient) {
    try {
      const result = await redisClient.get(key)
      if (result) {
        log(`🔍 Raw Redis result type:`, typeof result)

        // Handle different response types from Redis
        let parsed
        if (typeof result === "string") {
          try {
            parsed = JSON.parse(result)
          } catch (parseError) {
            logError(`❌ Failed to parse Redis JSON:`, parseError)
            logError(`❌ Raw data:`, result)
            throw parseError
          }
        } else if (typeof result === "object" && result !== null) {
          // Redis client might have already parsed the JSON
          parsed = result
        } else {
          logError(`❌ Unexpected Redis result type:`, typeof result)
          throw new Error(`Unexpected Redis result type: ${typeof result}`)
        }

        log(`✅ Retrieved from Redis, share ID: ${parsed.id}`)
        return parsed
      } else {
        log(`🔍 No data found in Redis for key: ${key}`)
      }
    } catch (error) {
      logError("❌ Redis get failed:", error)
    }
  } else {
    log("⚠️ Redis not available, checking file storage only")
  }

  // Try file storage
  try {
    const fileStorage = await loadFileStorage()
    const stored = fileStorage[key]

    if (stored) {
      if (stored.expiresAt > Date.now()) {
        log(`✅ Retrieved from file storage, share ID: ${stored.data.id}`)
        return stored.data
      } else {
        log(`⏰ File data expired, removing key: ${key}`)
        delete fileStorage[key]
        await saveFileStorage(fileStorage)
      }
    } else {
      log(`🔍 No data found in file storage for key: ${key}`)

      // Debug: Show what keys we do have
      const availableKeys = Object.keys(fileStorage)
      log(`🔍 Available keys in file storage:`, availableKeys)

      // Check if there's a similar key (maybe without prefix)
      const similarKeys = availableKeys.filter((k) => k.includes(key.replace("share:", "")))
      if (similarKeys.length > 0) {
        log(`🔍 Found similar keys:`, similarKeys)
      }
    }
  } catch (error) {
    logError("❌ File storage get failed:", error)
  }

  log(`❌ No data found for key: ${key}`)
  return null
}

async function deleteData(key: string): Promise<void> {
  log(`🗑️ Deleting data with key: ${key}`)

  // Ensure Redis is initialized before using it
  const redisClient = await initRedis()

  // Delete from Redis
  if (redisClient) {
    try {
      await redisClient.del(key)
      log(`✅ Redis delete successful`)
    } catch (error) {
      logError("❌ Redis delete failed:", error)
    }
  }

  // Delete from file storage
  try {
    const fileStorage = await loadFileStorage()
    if (fileStorage[key]) {
      delete fileStorage[key]
      await saveFileStorage(fileStorage)
      log(`✅ File storage delete successful`)
    }
  } catch (error) {
    logError("❌ File storage delete failed:", error)
  }
}

async function updateData(key: string, data: ShareData, ttlSeconds: number): Promise<void> {
  log(`🔄 Updating data with key: ${key}`)

  const expiresAt = Date.now() + ttlSeconds * 1000

  // Ensure Redis is initialized before using it
  const redisClient = await initRedis()

  // Update Redis
  if (redisClient) {
    try {
      const safeTtl = Math.max(300, Math.min(ttlSeconds, 7 * 24 * 60 * 60))
      await redisClient.setex(key, safeTtl, JSON.stringify(data))
      log(`✅ Redis update successful`)
    } catch (error) {
      logError("❌ Redis update failed:", error)
    }
  }

  // Update file storage
  try {
    const fileStorage = await loadFileStorage()
    fileStorage[key] = { data, expiresAt }
    await saveFileStorage(fileStorage)
    log(`✅ File storage update successful`)
  } catch (error) {
    logError("❌ File storage update failed:", error)
  }
}

export async function createSecureShare(data: {
  title: string
  encryptedContent: string
  iv: string
  expirationTime: string
  maxViews: number
  requirePassword: boolean
  password?: string
  linkType?: string
}) {
  log("🚀 Creating secure share with data:", {
    title: data.title,
    hasContent: !!data.encryptedContent,
    hasIv: !!data.iv,
    expirationTime: data.expirationTime,
    maxViews: data.maxViews,
    requirePassword: data.requirePassword,
    linkType: data.linkType || "standard",
  })

  try {
    // Validate input data
    if (!data.encryptedContent || !data.iv) {
      logError("❌ Missing encrypted content or IV")
      return { success: false, error: "Missing encrypted content or IV" }
    }

    if (data.maxViews < 1 || data.maxViews > 100) {
      logError("❌ Invalid max views count:", data.maxViews)
      return { success: false, error: "Invalid max views count" }
    }

    const id = generateShareId(data.linkType || "standard")
    const expiresAt = getExpirationTime(data.expirationTime)
    const now = new Date()

    log(`🆔 Generated ${data.linkType || "standard"} ID: ${id}`)
    log(`⏰ Expiration time: ${expiresAt.toISOString()}`)

    // Ensure expiration is in the future
    if (expiresAt <= now) {
      logError("❌ Invalid expiration time - in the past")
      return { success: false, error: "Invalid expiration time" }
    }

    const share: ShareData = {
      id,
      title: data.title || "",
      encryptedContent: data.encryptedContent,
      iv: data.iv,
      expiresAt: expiresAt.toISOString(),
      maxViews: data.maxViews,
      currentViews: 0,
      requirePassword: data.requirePassword,
      passwordHash: data.requirePassword && data.password ? hashPassword(data.password) : undefined,
      createdAt: now.toISOString(),
    }

    // Calculate TTL in seconds
    const ttlSeconds = Math.floor((expiresAt.getTime() - now.getTime()) / 1000)
    log(`⏱️ Calculated TTL: ${ttlSeconds} seconds`)

    if (ttlSeconds <= 0) {
      logError("❌ Invalid TTL calculation:", ttlSeconds)
      return { success: false, error: "Invalid TTL calculation" }
    }

    const key = `share:${id}`
    log(`🔑 Using storage key: ${key}`)

    const stored = await storeData(key, share, ttlSeconds)

    if (!stored) {
      logError("❌ Failed to store data in any storage system")
      return { success: false, error: "Failed to store secure share" }
    }

    // Immediate verification - try to retrieve what we just stored
    log(`🔍 Verifying storage by retrieving key: ${key}`)
    const verification = await getData(key)
    if (verification && verification.id === id) {
      log(`✅ Storage verification successful for ID: ${id}`)
    } else {
      logError(`❌ Storage verification failed for ID: ${id}`)
      logError(`❌ Expected ID: ${id}, Got:`, verification?.id || "null")

      // Still return success since we stored it, but log the verification issue
      logWarn(`⚠️ Continuing despite verification failure - data may still be accessible`)
    }

    log(`🎉 Successfully created secure share with ID: ${id}`)
    return { success: true, id }
  } catch (error) {
    logError("❌ Error creating secure share:", error)
    return { success: false, error: "Failed to create secure share" }
  }
}

export async function getSecureShare(id: string, password?: string) {
  log(`🔍 Getting secure share with ID: ${id}`)

  try {
    if (!id || typeof id !== "string") {
      logError("❌ Invalid share ID:", id)
      return { success: false, error: "Invalid share ID" }
    }

    const key = `share:${id}`
    log(`🔑 Looking for storage key: ${key}`)

    const share = await getData(key)

    if (!share) {
      logError(`❌ Share not found for ID: ${id}`)
      return { success: false, error: "Share not found or has expired" }
    }

    log(`✅ Found share: ${share.id}, views: ${share.currentViews}/${share.maxViews}`)

    // Check if max views reached
    if (share.currentViews >= share.maxViews) {
      log("⚠️ Max views reached, deleting share")
      await deleteData(key)
      return { success: false, error: "This share has reached its maximum view limit" }
    }

    // Check password if required
    if (share.requirePassword) {
      if (!password) {
        log("🔒 Password required but not provided")
        return { success: false, error: "Password required" }
      }
      if (share.passwordHash !== hashPassword(password)) {
        log("❌ Incorrect password provided")
        return { success: false, error: "Incorrect password" }
      }
    }

    // Increment view count
    share.currentViews++
    log(`📈 Incremented view count to: ${share.currentViews}`)

    // If this was the last allowed view, delete the share
    if (share.currentViews >= share.maxViews) {
      log("🗑️ Last view reached, deleting share")
      await deleteData(key)
    } else {
      // Update the share with new view count
      const expiresAt = new Date(share.expiresAt)
      const now = new Date()
      const remainingTtl = Math.floor((expiresAt.getTime() - now.getTime()) / 1000)

      if (remainingTtl > 0) {
        await updateData(key, share, remainingTtl)
      }
    }

    // Return encrypted data - decryption happens client-side
    return {
      success: true,
      data: {
        id: share.id,
        title: share.title,
        encryptedContent: share.encryptedContent,
        iv: share.iv,
        expiresAt: share.expiresAt,
        maxViews: share.maxViews,
        currentViews: share.currentViews,
        requirePassword: share.requirePassword,
      },
    }
  } catch (error) {
    logError("❌ Error getting secure share:", error)
    return { success: false, error: "Failed to retrieve secure share" }
  }
}

export async function getShareMetadata(id: string) {
  log(`📋 Getting metadata for share ID: ${id}`)

  try {
    if (!id || typeof id !== "string") {
      logError("❌ Invalid share ID for metadata:", id)
      return { success: false, error: "Invalid share ID" }
    }

    const key = `share:${id}`
    log(`🔑 Looking for metadata with storage key: ${key}`)

    const share = await getData(key)

    if (!share) {
      logError(`❌ Share metadata not found for ID: ${id}`)
      return { success: false, error: "Share not found or has expired" }
    }

    log(`✅ Found metadata for share: ${share.id}`)

    // Return only metadata (no encrypted content)
    return {
      success: true,
      data: {
        id: share.id,
        title: share.title,
        expiresAt: share.expiresAt,
        maxViews: share.maxViews,
        currentViews: share.currentViews,
        requirePassword: share.requirePassword,
      },
    }
  } catch (error) {
    logError("❌ Error getting share metadata:", error)
    return { success: false, error: "Failed to retrieve share metadata" }
  }
}

// Debug function to list all stored shares
export async function debugListShares() {
  log("🐛 === DEBUG: Listing all shares ===")

  try {
    const fileStorage = await loadFileStorage()
    log("📁 File storage keys:", Object.keys(fileStorage))
    log("📊 File storage size:", Object.keys(fileStorage).length)

    // Log file storage contents
    for (const [key, value] of Object.entries(fileStorage)) {
      log(`🔍 ${key}:`, {
        id: value.data?.id,
        title: value.data?.title,
        expiresAt: new Date(value.expiresAt).toISOString(),
        expired: value.expiresAt <= Date.now(),
        currentViews: value.data?.currentViews,
        maxViews: value.data?.maxViews,
      })
    }

    return {
      success: true,
      fileStorage: {
        keys: Object.keys(fileStorage),
        count: Object.keys(fileStorage).length,
        shares: Object.entries(fileStorage).map(([key, value]) => ({
          key,
          id: value.data?.id,
          title: value.data?.title,
          expired: value.expiresAt <= Date.now(),
          currentViews: value.data?.currentViews,
          maxViews: value.data?.maxViews,
        })),
      },
    }
  } catch (error) {
    logError("❌ Failed to load file storage:", error)
    return { success: false, error: "Failed to load storage" }
  }
}

// Test function to verify a specific share exists
export async function testShareExists(id: string) {
  log(`🧪 Testing if share exists: ${id}`)

  const key = `share:${id}`
  log(`🔑 Testing storage key: ${key}`)

  const share = await getData(key)
  const exists = !!share

  log(`🧪 Share ${id} exists: ${exists}`)
  if (exists) {
    log(`🧪 Share details:`, {
      id: share.id,
      title: share.title,
      currentViews: share.currentViews,
      maxViews: share.maxViews,
      expiresAt: share.expiresAt,
    })
  }

  return { success: true, exists, share }
}

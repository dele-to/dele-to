import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

const DEBUG_ENABLED = process.env.DEBUG_ENABLED || false
const log = DEBUG_ENABLED ? console.log : () => {}
const logError = DEBUG_ENABLED ? console.error : () => {}
const logWarn = DEBUG_ENABLED ? console.warn : () => {}

const STORAGE_DIR = path.join(process.cwd(), ".secure-shares")
const STORAGE_FILE = path.join(STORAGE_DIR, "shares.json")

export interface ShareData {
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

let redis: any = null
let redisInitialized = false

async function initRedis() {
  if (redisInitialized) return redis

  try {
    const redisUrl =
      process.env.UPSTASH_REDIS_REST_URL ||
      process.env.KV_REST_API_URL ||
      process.env.REDIS_URL

    const redisToken =
      process.env.UPSTASH_REDIS_REST_TOKEN ||
      process.env.KV_REST_API_TOKEN ||
      process.env.UPSTASH_REDIS_REST_TOKEN

    if (redisUrl && redisToken) {
      const { Redis } = await import("@upstash/redis")

      redis = new Redis({
        url: redisUrl,
        token: redisToken,
      })

      const pingResult = await redis.ping()
      log("✅ Redis initialized successfully, ping result:", pingResult)
      redisInitialized = true
      return redis
    } else {
      log("⚠️ No Redis credentials found in environment variables")
    }
  } catch (error) {
    logWarn("❌ Redis initialization failed:", error)
    redis = null
    redisInitialized = true
  }
  return null
}

async function ensureStorageDir() {
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR, { recursive: true })
    log("📁 Created storage directory:", STORAGE_DIR)
  }
}

async function loadFileStorage(): Promise<FileStorage> {
  try {
    await ensureStorageDir()
    if (existsSync(STORAGE_FILE)) {
      const content = await readFile(STORAGE_FILE, "utf-8")
      const storage = JSON.parse(content) as FileStorage

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

      return cleaned
    }
  } catch (error) {
    logError("❌ Failed to load file storage:", error)
  }
  return {}
}

async function saveFileStorage(storage: FileStorage): Promise<void> {
  try {
    await ensureStorageDir()
    await writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2))
  } catch (error) {
    logError("❌ Failed to save file storage:", error)
    throw error
  }
}

export async function storeData(
  key: string,
  data: ShareData,
  ttlSeconds: number,
): Promise<boolean> {
  log(`📦 Storing data with key: ${key}, ID: ${data.id}, TTL: ${ttlSeconds}s`)

  const expiresAt = Date.now() + ttlSeconds * 1000
  let redisStored = false
  let fileStored = false

  const redisClient = await initRedis()

  if (redisClient) {
    try {
      const safeTtl = Math.max(300, Math.min(ttlSeconds, 7 * 24 * 60 * 60))
      await redisClient.setex(key, safeTtl, JSON.stringify(data))
      redisStored = true
    } catch (error) {
      logError("❌ Redis storage failed:", error)
    }
  }

  try {
    const fileStorage = await loadFileStorage()
    fileStorage[key] = { data, expiresAt }
    await saveFileStorage(fileStorage)
    fileStored = true
  } catch (error) {
    logError("❌ File storage failed:", error)
  }

  return redisStored || fileStored
}

export async function getData(key: string): Promise<ShareData | null> {
  log(`🔍 Retrieving data with key: ${key}`)

  const redisClient = await initRedis()

  if (redisClient) {
    try {
      const result = await redisClient.get(key)
      if (result) {
        let parsed: any
        if (typeof result === "string") {
          parsed = JSON.parse(result)
        } else if (typeof result === "object" && result !== null) {
          parsed = result
        } else {
          throw new Error(`Unexpected Redis result type: ${typeof result}`)
        }
        return parsed as ShareData
      }
    } catch (error) {
      logError("❌ Redis get failed:", error)
    }
  }

  try {
    const fileStorage = await loadFileStorage()
    const stored = fileStorage[key]

    if (stored) {
      if (stored.expiresAt > Date.now()) {
        return stored.data
      } else {
        delete fileStorage[key]
        await saveFileStorage(fileStorage)
      }
    }
  } catch (error) {
    logError("❌ File storage get failed:", error)
  }

  return null
}

export async function deleteData(key: string): Promise<void> {
  log(`🗑️ Deleting data with key: ${key}`)

  const redisClient = await initRedis()

  if (redisClient) {
    try {
      await redisClient.del(key)
    } catch (error) {
      logError("❌ Redis delete failed:", error)
    }
  }

  try {
    const fileStorage = await loadFileStorage()
    if (fileStorage[key]) {
      delete fileStorage[key]
      await saveFileStorage(fileStorage)
    }
  } catch (error) {
    logError("❌ File storage delete failed:", error)
  }
}

export async function updateData(
  key: string,
  data: ShareData,
  ttlSeconds: number,
): Promise<void> {
  log(`🔄 Updating data with key: ${key}`)

  const expiresAt = Date.now() + ttlSeconds * 1000

  const redisClient = await initRedis()

  if (redisClient) {
    try {
      const safeTtl = Math.max(300, Math.min(ttlSeconds, 7 * 24 * 60 * 60))
      await redisClient.setex(key, safeTtl, JSON.stringify(data))
    } catch (error) {
      logError("❌ Redis update failed:", error)
    }
  }

  try {
    const fileStorage = await loadFileStorage()
    fileStorage[key] = { data, expiresAt }
    await saveFileStorage(fileStorage)
  } catch (error) {
    logError("❌ File storage update failed:", error)
  }
}

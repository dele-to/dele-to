"use server"

import { randomUUID, randomBytes } from "crypto"
import {
  storeData,
  getData,
  updateData,
  deleteData,
  type ShareData,
} from "@/lib/share-storage"

// Logging utility
const DEBUG_ENABLED = process.env.DEBUG_ENABLED || false
const log = DEBUG_ENABLED ? console.log : () => {}
const logError = DEBUG_ENABLED ? console.error : () => {}
const logWarn = DEBUG_ENABLED ? console.warn : () => {}

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

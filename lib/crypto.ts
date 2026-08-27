"use client"

// Client-side encryption utilities using Web Crypto API
export class SecureCrypto {
  private static encodeBase64Url(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
  }

  private static decodeBase64Url(value: string): Uint8Array {
    const padding = "=".repeat((4 - (value.length % 4)) % 4)
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + padding
    return new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0)),
    )
  }

  static generateRootSecret(): string {
    return this.encodeBase64Url(window.crypto.getRandomValues(new Uint8Array(32)))
  }

  static async deriveShareSecrets(rootSecret: string): Promise<{
    encryptionKey: CryptoKey
    readCapability: string
  }> {
    const rootBytes = this.decodeBase64Url(rootSecret)
    if (rootBytes.length !== 32) throw new Error("Invalid root secret")

    const encoder = new TextEncoder()
    const rootKeyMaterial = new ArrayBuffer(rootBytes.byteLength)
    new Uint8Array(rootKeyMaterial).set(rootBytes)
    const baseKey = await window.crypto.subtle.importKey(
      "raw",
      rootKeyMaterial,
      "HKDF",
      false,
      ["deriveKey", "deriveBits"],
    )
    const params = (info: string) => ({
      name: "HKDF",
      hash: "SHA-256",
      salt: encoder.encode("deleto:share:v1"),
      info: encoder.encode(info),
    })
    const [encryptionKey, readCapabilityBits] = await Promise.all([
      window.crypto.subtle.deriveKey(
        params("encryption"),
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"],
      ),
      window.crypto.subtle.deriveBits(params("read-capability"), baseKey, 256),
    ])

    return {
      encryptionKey,
      readCapability: this.encodeBase64Url(new Uint8Array(readCapabilityBits)),
    }
  }

  // Generate a random encryption key
  static async generateKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    )
  }

  // Export key to base64 string for URL fragment
  static async exportKey(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("raw", key)
    const keyArray = new Uint8Array(exported)
    return btoa(String.fromCharCode(...keyArray))
  }

  // Import key from base64 string
  static async importKey(keyString: string): Promise<CryptoKey> {
    const keyArray = new Uint8Array(
      atob(keyString)
        .split("")
        .map((char) => char.charCodeAt(0)),
    )
    return await window.crypto.subtle.importKey(
      "raw",
      keyArray,
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    )
  }

  // Encrypt data with AES-256-GCM
  static async encrypt(data: string, key: CryptoKey): Promise<{ encrypted: string; iv: string }> {
    const encoder = new TextEncoder()
    const iv = window.crypto.getRandomValues(new Uint8Array(12)) // 96-bit IV for GCM

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encoder.encode(data),
    )

    return {
      encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv)),
    }
  }

  // Decrypt data with AES-256-GCM
  static async decrypt(encryptedData: string, key: CryptoKey, ivString: string): Promise<string> {
    try {
      const iv = new Uint8Array(
        atob(ivString)
          .split("")
          .map((char) => char.charCodeAt(0)),
      )

      const encrypted = new Uint8Array(
        atob(encryptedData)
          .split("")
          .map((char) => char.charCodeAt(0)),
      )

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        encrypted,
      )

      const decoder = new TextDecoder()
      const result = decoder.decode(decrypted)

      return result
    } catch (error) {
      throw error
    }
  }

  // Generate a secure random password for additional protection
  static generateSecurePassword(length = 16): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    const array = new Uint8Array(length)
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => charset[byte % charset.length]).join("")
  }
}

"use client"

import React, { useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeCanvas } from "qrcode.react"
import { Download } from "lucide-react"

interface QrCodeModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title?: string
}

export function QrCodeModal({ isOpen, onClose, url, title }: QrCodeModalProps) {
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas")
      if (canvas) {
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
        const downloadLink = document.createElement("a")
        downloadLink.href = pngUrl
        downloadLink.download = `${title || "secret-qr-code"}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share via QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4" ref={qrRef}>
          <QRCodeCanvas value={url} size={256} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={true} />
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={downloadQRCode}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

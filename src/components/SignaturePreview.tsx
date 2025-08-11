import React, { useRef, useState, useEffect } from 'react'
import { SignatureData } from '../types'
import QRCode from 'qrcode'
import './SignaturePreview.css'

interface SignaturePreviewProps {
  signatureData: SignatureData
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ signatureData }) => {
  const signatureRef = useRef<HTMLDivElement>(null)
  const [qrCode, setQrCode] = useState<string>('')
  const [logoUrl, setLogoUrl] = useState<string>('')

  // Generate QR code when signature data changes
  useEffect(() => {
    if (signatureData.showQr && signatureData.name) {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${signatureData.name}`,
        `TITLE:${signatureData.title || ''}`,
        signatureData.email ? `EMAIL:${signatureData.email}` : '',
        signatureData.phone ? `TEL:${signatureData.phone}` : '',
        signatureData.website ? `URL:${signatureData.website}` : '',
        'END:VCARD'
      ].filter(Boolean).join('\n')

      QRCode.toDataURL(vcard, {
        width: 60,
        margin: 0,
        color: {
          dark: signatureData.accentColor,
          light: signatureData.backgroundColor
        }
      }).then(url => setQrCode(url))
    } else {
      setQrCode('')
    }
  }, [signatureData])

  // Handle logo file
  useEffect(() => {
    if (signatureData.logo) {
      const url = URL.createObjectURL(signatureData.logo)
      setLogoUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setLogoUrl('')
    }
  }, [signatureData.logo])

  const handleExportHTML = () => {
    if (!signatureRef.current) return

    const html = signatureRef.current.outerHTML
    const blob = new Blob([`<!DOCTYPE html><html><body>${html}</body></html>`], {
      type: 'text/html'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email-signature.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportImage = async () => {
    if (!signatureRef.current) return

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(signatureRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: signatureData.backgroundColor,
        scale: 2
      })

      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'email-signature.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to export image:', error)
      alert('Failed to export image. Please try again.')
    }
  }

  const renderInfoField = (key: string, label: string, value: string, icon: string, hide?: boolean) => {
    if (hide || !value) return null

    return (
      <div key={key} className="info-field">
        <span className="info-icon" style={{ color: signatureData.accentColor }}>
          <svg width={signatureData.iconSize} height={signatureData.iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {icon}
          </svg>
        </span>
        <span className="info-text">{value}</span>
      </div>
    )
  }

  if (!signatureData.name && !signatureData.email) {
    return (
      <div className="signature-preview glass">
        <div className="preview-placeholder">
          <div className="placeholder-icon">✉️</div>
          <h3>Preview Your Signature</h3>
          <p>Fill in your details on the left to see a live preview of your email signature here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="signature-preview glass">
      <div className="preview-header">
        <h2 className="preview-title">Live Preview</h2>
        <div className="export-buttons">
          <button onClick={handleExportHTML} className="export-btn export-html">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            Export HTML
          </button>
          <button onClick={handleExportImage} className="export-btn export-image">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            Export Image
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div
          ref={signatureRef}
          className="signature-display"
          style={{
            background: signatureData.backgroundColor,
            color: signatureData.textColor,
            fontFamily: `"${signatureData.font}", ${signatureData.font === 'Inter' ? 'system-ui, -apple-system, sans-serif' : signatureData.font === 'JetBrains Mono' ? 'monospace' : 'sans-serif'}`,
            padding: '20px',
            borderRadius: '8px',
            minWidth: '320px',
            maxWidth: '480px',
            display: 'flex',
            alignItems: signatureData.layout === 'vertical' ? 'flex-start' : 'center',
            flexDirection: signatureData.layout === 'vertical' ? 'column' : 'row',
            gap: `${signatureData.spacing}px`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          {signatureData.showLogo && logoUrl && (
            <div
              className="logo-container"
              style={{
                width: `${signatureData.logoWidth}px`,
                height: `${signatureData.logoHeight}px`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginBottom: signatureData.layout === 'vertical' ? `${signatureData.spacing}px` : '0',
                marginRight: signatureData.layout === 'horizontal' ? `${signatureData.spacing}px` : '0',
                overflow: 'hidden'
              }}
            >
              <img
                src={logoUrl}
                alt="Logo"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  background: '#fff',
                  borderRadius: '6px',
                  transform: signatureData.rotateLogo ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.5s cubic-bezier(0.4,0.2,0.2,1)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          )}

          <div className="info-container" style={{ flex: 1, minWidth: 0 }}>
            <div className="name" style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>
              {signatureData.name}
            </div>

            {signatureData.title && (
              <div className="title" style={{ color: signatureData.accentColor, fontWeight: 500, fontSize: '14px', marginBottom: '8px' }}>
                {signatureData.title}
              </div>
            )}

            {renderInfoField('email', 'Email', signatureData.email, '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', signatureData.hideEmail)}

            {renderInfoField('phone', 'Phone', signatureData.phone, '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>', signatureData.hidePhone)}

            {renderInfoField('website', 'Website', signatureData.website, '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>', signatureData.hideUrl)}

            {signatureData.address && (
              <div className="address" style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                {signatureData.address}
              </div>
            )}

            {signatureData.industry && (
              <div className="industry" style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>
                {signatureData.industry}
              </div>
            )}

            {signatureData.subtext && (
              <div className="subtext" style={{ fontSize: '13px', color: signatureData.accentColor, fontWeight: 500, marginTop: '8px' }}>
                {signatureData.subtext}
              </div>
            )}
          </div>

          {qrCode && (
            <div className="qr-container" style={{ marginLeft: '12px', display: 'flex', alignItems: 'center' }}>
              <img src={qrCode} alt="QR Code" style={{ width: '60px', height: '60px' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignaturePreview

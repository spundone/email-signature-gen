import React, { useRef, useState, useEffect } from 'react'
import { SignatureData } from '../types'
import QRCode from 'qrcode'
import './SignaturePreview.css'

interface SignaturePreviewProps {
  signatureData: SignatureData
}

const EmailIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const PhoneIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }} aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1v3.61a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.61a1 1 0 0 1 1 1c0 1.35.27 2.67.76 3.88a1 1 0 0 1-.21 1.11l-2.2 2.2z" />
  </svg>
)

const WebsiteIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ signatureData }) => {
  const signatureRef = useRef<HTMLDivElement>(null)
  const [qrCode, setQrCode] = useState<string>('')
  const [logoUrl, setLogoUrl] = useState<string>('')

  // Generate vCard for QR code
  useEffect(() => {
    if (signatureData.showQr && signatureData.name) {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${signatureData.name}`,
        signatureData.title ? `TITLE:${signatureData.title}` : '',
        signatureData.company ? `ORG:${signatureData.company}` : '',
        signatureData.email ? `EMAIL;TYPE=INTERNET:${signatureData.email}` : '',
        signatureData.phone ? `TEL;TYPE=CELL:${signatureData.phone}` : '',
        signatureData.website ? `URL:${signatureData.website}` : '',
        signatureData.address ? `ADR;TYPE=WORK:;;${signatureData.address}` : '',
        signatureData.industry ? `NOTE:Industry: ${signatureData.industry}` : '',
        signatureData.subtext ? `NOTE:${signatureData.subtext}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n')
      QRCode.toDataURL(vcard, {
        width: 60,
        margin: 0,
        color: {
          dark: signatureData.accentColor,
          light: signatureData.backgroundColor,
        },
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
      type: 'text/html',
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
        scale: 2,
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

  const handleCopyToClipboard = async () => {
    if (!signatureRef.current) return

    try {
      // Create a clean email signature HTML
      const signatureElement = signatureRef.current.cloneNode(true) as HTMLElement

      // Remove any inline styles that might cause issues in email clients
      signatureElement.removeAttribute('style')

      // Add email-friendly styles inline
      const emailSignature = `
<div style="font-family: ${signatureData.font === 'Inter' ? 'Inter, system-ui, -apple-system, sans-serif' : signatureData.font === 'JetBrains Mono' ? 'JetBrains Mono, monospace' : signatureData.font + ', sans-serif'}; color: ${signatureData.textColor}; background: ${signatureData.backgroundColor}; padding: 20px; border-radius: 8px; max-width: 480px;">
  ${signatureElement.innerHTML}
</div>`

      // Create a temporary element to hold the HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = emailSignature

      // Use the Clipboard API with both text and HTML
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([emailSignature], { type: 'text/html' }),
        'text/plain': new Blob([emailSignature], { type: 'text/plain' })
      })

      await navigator.clipboard.write([clipboardItem])

      // Show success feedback
      const button = document.querySelector('.export-copy') as HTMLButtonElement
      if (button) {
        const originalText = button.innerHTML
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          Copied!
        `
        button.style.background = 'var(--accent-yellow)'
        button.style.color = 'var(--bg-primary)'

        setTimeout(() => {
          button.innerHTML = originalText
          button.style.background = ''
          button.style.color = ''
        }, 2000)
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback to text copy if rich HTML copy fails
      try {
        const signatureElement = signatureRef.current.cloneNode(true) as HTMLElement
        signatureElement.removeAttribute('style')
        const emailSignature = `
<div style="font-family: ${signatureData.font === 'Inter' ? 'Inter, system-ui, -apple-system, sans-serif' : signatureData.font === 'JetBrains Mono' ? 'JetBrains Mono, monospace' : signatureData.font + ', sans-serif'}; color: ${signatureData.textColor}; background: ${signatureData.backgroundColor}; padding: 20px; border-radius: 8px; max-width: 480px;">
  ${signatureElement.innerHTML}
</div>`
        await navigator.clipboard.writeText(emailSignature)

        // Show success feedback
        const button = document.querySelector('.export-copy') as HTMLButtonElement
        if (button) {
          const originalText = button.innerHTML
          button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            Copied!
          `
          button.style.background = 'var(--accent-yellow)'
          button.style.color = 'var(--bg-primary)'

          setTimeout(() => {
            button.innerHTML = originalText
            button.style.background = ''
            button.style.color = ''
          }, 2000)
        }
      } catch (fallbackError) {
        alert('Failed to copy to clipboard. Please try using the Export HTML button instead.')
      }
    }
  }

  const renderInfoField = (
    key: string,
    label: string,
    value: string,
    icon: React.ReactNode,
    hide?: boolean
  ) => {
    if (hide || !value) return null
    return (
      <div key={key} className="info-field" style={{ gap: signatureData.iconPadding }}>
        {signatureData.showIcons && (
          <span className="info-icon" style={{ color: signatureData.accentColor }}>
            {icon}
          </span>
        )}
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
          <button onClick={handleCopyToClipboard} className="export-btn export-copy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Signature
          </button>
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
                alignItems: signatureData.logoAlign === 'start' ? 'flex-start' : signatureData.logoAlign === 'end' ? 'flex-end' : 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginBottom: signatureData.layout === 'vertical' ? `${signatureData.spacing}px` : '0',
                marginRight: signatureData.layout === 'horizontal' ? `${signatureData.spacing}px` : '0',
                overflow: 'hidden',
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
                  objectFit: signatureData.logoCrop,
                  background: '#fff',
                  borderRadius: '6px',
                  transform: signatureData.rotateLogo ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.5s cubic-bezier(0.4,0.2,0.2,1)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
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

            {renderInfoField('email', 'Email', signatureData.email, <EmailIcon color={signatureData.accentColor} size={signatureData.iconSize} />, signatureData.hideEmail)}
            {renderInfoField('phone', 'Phone', signatureData.phone, <PhoneIcon color={signatureData.accentColor} size={signatureData.iconSize} />, signatureData.hidePhone)}
            {renderInfoField('website', 'Website', signatureData.website, <WebsiteIcon color={signatureData.accentColor} size={signatureData.iconSize} />, signatureData.hideUrl)}

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

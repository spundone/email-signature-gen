import React from 'react'
import { SignatureData } from '../types'
import { fontOptions } from '../config/fonts'
import { getRandomDemoSignature } from '../data/demoSignatures'
import './SignatureForm.css'

interface SignatureFormProps {
  signatureData: SignatureData
  onUpdate: (data: Partial<SignatureData>) => void
}

const SignatureForm: React.FC<SignatureFormProps> = ({ signatureData, onUpdate }) => {
  const handleInputChange = (field: keyof SignatureData, value: any) => {
    onUpdate({ [field]: value })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onUpdate({ logo: file })
  }

  const handleLoadDemo = () => {
    const demoData = getRandomDemoSignature()
    onUpdate(demoData)
  }

  return (
    <div className="signature-form glass">
      <div className="form-header">
        <h2 className="form-title">Customize Your Signature</h2>
        <button onClick={handleLoadDemo} className="demo-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
          Load Demo
        </button>
      </div>

      <div className="form-section">
        <h3 className="section-title">Personal Information</h3>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            value={signatureData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="John Doe"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            value={signatureData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Software Engineer"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={signatureData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Tech Corp"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={signatureData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john@company.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={signatureData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            value={signatureData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://company.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={signatureData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="City, State, Country"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            value={signatureData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            placeholder="Technology"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subtext">Additional Text</label>
          <textarea
            id="subtext"
            value={signatureData.subtext}
            onChange={(e) => handleInputChange('subtext', e.target.value)}
            placeholder="e.g., We are hiring! Check out our careers page."
            className="form-textarea"
            rows={3}
          />
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Logo & Branding</h3>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signatureData.showLogo}
              onChange={(e) => handleInputChange('showLogo', e.target.checked)}
              className="form-checkbox"
            />
            Show Logo
          </label>
        </div>

        {signatureData.showLogo && (
          <>
            <div className="form-group">
              <label htmlFor="logo">Upload Logo</label>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="form-file-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="logoWidth">Logo Width (px)</label>
                <input
                  type="number"
                  id="logoWidth"
                  value={signatureData.logoWidth}
                  onChange={(e) => handleInputChange('logoWidth', parseInt(e.target.value))}
                  min="24"
                  max="160"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="logoHeight">Logo Height (px)</label>
                <input
                  type="number"
                  id="logoHeight"
                  value={signatureData.logoHeight}
                  onChange={(e) => handleInputChange('logoHeight', parseInt(e.target.value))}
                  min="24"
                  max="160"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="logoAlign">Logo Alignment</label>
                <select
                  id="logoAlign"
                  value={signatureData.logoAlign}
                  onChange={(e) => handleInputChange('logoAlign', e.target.value)}
                  className="form-select"
                >
                  {signatureData.layout === 'horizontal' ? (
                    <>
                      <option value="start">Left</option>
                      <option value="center">Center</option>
                      <option value="end">Right</option>
                    </>
                  ) : (
                    <>
                      <option value="start">Top</option>
                      <option value="center">Center</option>
                      <option value="end">Bottom</option>
                    </>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="logoCrop">Logo Crop</label>
                <select
                  id="logoCrop"
                  value={signatureData.logoCrop}
                  onChange={(e) => handleInputChange('logoCrop', e.target.value)}
                  className="form-select"
                >
                  <option value="contain">Fit (No Crop)</option>
                  <option value="cover">Crop (Fill)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={signatureData.rotateLogo}
                  onChange={(e) => handleInputChange('rotateLogo', e.target.checked)}
                  className="form-checkbox"
                />
                Rotate Logo
              </label>
            </div>
          </>
        )}
      </div>

      <div className="form-section">
        <h3 className="section-title">Design & Layout</h3>

        <div className="form-group">
          <label htmlFor="layout">Layout</label>
          <select
            id="layout"
            value={signatureData.layout}
            onChange={(e) => handleInputChange('layout', e.target.value)}
            className="form-select"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="font">Font Family</label>
          <select
            id="font"
            value={signatureData.font}
            onChange={(e) => handleInputChange('font', e.target.value)}
            className="form-select"
          >
            {fontOptions.map((font) => (
              <optgroup key={font.category} label={font.category.charAt(0).toUpperCase() + font.category.slice(1)}>
                <option value={font.value}>{font.label}</option>
              </optgroup>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="backgroundColor">Background Color</label>
          <input
            type="color"
            id="backgroundColor"
            value={signatureData.backgroundColor}
            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
            className="form-color-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="textColor">Text Color</label>
          <input
            type="color"
            id="textColor"
            value={signatureData.textColor}
            onChange={(e) => handleInputChange('textColor', e.target.value)}
            className="form-color-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="accentColor">Accent Color</label>
          <input
            type="color"
            id="accentColor"
            value={signatureData.accentColor}
            onChange={(e) => handleInputChange('accentColor', e.target.value)}
            className="form-color-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="spacing">Spacing (px)</label>
          <input
            type="range"
            id="spacing"
            value={signatureData.spacing}
            onChange={(e) => handleInputChange('spacing', parseInt(e.target.value))}
            min="0"
            max="40"
            step="1"
            className="form-range"
          />
          <span className="range-value">{signatureData.spacing}px</span>
        </div>

        <div className="form-group">
          <label htmlFor="iconSize">Icon Size (px)</label>
          <input
            type="range"
            id="iconSize"
            value={signatureData.iconSize}
            onChange={(e) => handleInputChange('iconSize', parseInt(e.target.value))}
            min="12"
            max="40"
            step="1"
            className="form-range"
          />
          <span className="range-value">{signatureData.iconSize}px</span>
        </div>

        <div className="form-group">
          <label htmlFor="iconPadding">Icon Padding (px, gap between icon and text)</label>
          <input
            type="range"
            id="iconPadding"
            value={signatureData.iconPadding}
            onChange={(e) => handleInputChange('iconPadding', parseInt(e.target.value))}
            min="0"
            max="24"
            step="1"
            className="form-range"
          />
          <span className="range-value">{signatureData.iconPadding}px</span>
        </div>
      </div>

      <div className="form-section">
        <h3 className="section-title">Options</h3>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signatureData.showQr}
              onChange={(e) => handleInputChange('showQr', e.target.checked)}
              className="form-checkbox"
            />
            Show QR Code
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signatureData.hideEmail}
              onChange={(e) => handleInputChange('hideEmail', e.target.checked)}
              className="form-checkbox"
            />
            Hide Email
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signatureData.hidePhone}
              onChange={(e) => handleInputChange('hidePhone', e.target.checked)}
              className="form-checkbox"
            />
            Hide Phone
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signatureData.hideUrl}
              onChange={(e) => handleInputChange('hideUrl', e.target.checked)}
              className="form-checkbox"
            />
            Hide Website
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={signatureData.showIcons}
              onChange={(e) => handleInputChange('showIcons', e.target.checked)}
              className="form-checkbox"
            />
            Show Icons
          </label>
        </div>
      </div>
    </div>
  )
}

export default SignatureForm

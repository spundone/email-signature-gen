import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="header glass-strong">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h1 className="title">
              <span className="title-main">Email Signature</span>
              <span className="title-accent">Generator</span>
            </h1>
          </div>
          <div className="header-description">
            Create professional email signatures with ease
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

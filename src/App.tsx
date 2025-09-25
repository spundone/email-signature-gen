import React, { useState } from 'react'
import Header from './components/Header'
import SignatureForm from './components/SignatureForm'
import SignaturePreview from './components/SignaturePreview'
import { SignatureData } from './types'
import { getDefaultFont } from './config/fonts'
import './App.css'

function App() {
    const [signatureData, setSignatureData] = useState<SignatureData>({
        name: '',
        title: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        industry: '',
        logo: null,
        showLogo: true,
        backgroundColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#0099ff',
        font: getDefaultFont(),
        layout: 'horizontal',
        spacing: 18,
        iconSize: 20,
        iconPadding: 6,
        showQr: false,
        subtext: '',
        hideEmail: false,
        hidePhone: false,
        hideUrl: false,
        logoWidth: 56,
        logoHeight: 56,
        rotateLogo: false,
        showIcons: true,
        logoAlign: 'center',
        logoCrop: 'contain',
    })

    const handleSignatureUpdate = (newData: Partial<SignatureData>) => {
        setSignatureData(prev => ({ ...prev, ...newData }))
    }

    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <div className="container">
                    <div className="content-grid">
                        <SignatureForm
                            signatureData={signatureData}
                            onUpdate={handleSignatureUpdate}
                        />
                        <SignaturePreview
                            signatureData={signatureData}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App

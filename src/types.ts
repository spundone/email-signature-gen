export interface SignatureData {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  address: string
  industry: string
  logo: File | null
  showLogo: boolean
  backgroundColor: string
  textColor: string
  accentColor: string
  font: string
  layout: 'horizontal' | 'vertical'
  spacing: number
  iconSize: number
  iconPadding: number
  showQr: boolean
  subtext: string
  hideEmail: boolean
  hidePhone: boolean
  hideUrl: boolean
  logoWidth: number
  logoHeight: number
  rotateLogo: boolean
  showIcons: boolean
}

export interface LogoData {
  src: string
  alt: string
}

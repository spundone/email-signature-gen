export interface FontOption {
  value: string
  label: string
  category: 'sans-serif' | 'serif' | 'monospace' | 'display'
  googleFont?: string
}

export const fontOptions: FontOption[] = [
  // Sans-serif fonts
  {
    value: 'Inter',
    label: 'Inter',
    category: 'sans-serif',
    googleFont: 'Inter:wght@300;400;500;600;700'
  },
  {
    value: 'Roboto',
    label: 'Roboto',
    category: 'sans-serif',
    googleFont: 'Roboto:wght@300;400;500;700'
  },
  {
    value: 'Open Sans',
    label: 'Open Sans',
    category: 'sans-serif',
    googleFont: 'Open+Sans:wght@300;400;500;600;700'
  },
  {
    value: 'Lato',
    label: 'Lato',
    category: 'sans-serif',
    googleFont: 'Lato:wght@300;400;700'
  },
  {
    value: 'Poppins',
    label: 'Poppins',
    category: 'sans-serif',
    googleFont: 'Poppins:wght@300;400;500;600;700'
  },
  {
    value: 'Montserrat',
    label: 'Montserrat',
    category: 'sans-serif',
    googleFont: 'Montserrat:wght@300;400;500;600;700'
  },
  {
    value: 'Source Sans Pro',
    label: 'Source Sans Pro',
    category: 'sans-serif',
    googleFont: 'Source+Sans+Pro:wght@300;400;600;700'
  },
  {
    value: 'Nunito',
    label: 'Nunito',
    category: 'sans-serif',
    googleFont: 'Nunito:wght@300;400;500;600;700'
  },
  
  // Serif fonts
  {
    value: 'Merriweather',
    label: 'Merriweather',
    category: 'serif',
    googleFont: 'Merriweather:wght@300;400;700'
  },
  {
    value: 'Playfair Display',
    label: 'Playfair Display',
    category: 'serif',
    googleFont: 'Playfair+Display:wght@400;500;600;700'
  },
  {
    value: 'Lora',
    label: 'Lora',
    category: 'serif',
    googleFont: 'Lora:wght@400;500;600;700'
  },
  
  // Monospace fonts
  {
    value: 'JetBrains Mono',
    label: 'JetBrains Mono',
    category: 'monospace',
    googleFont: 'JetBrains+Mono:wght@300;400;500;600;700'
  },
  {
    value: 'Fira Code',
    label: 'Fira Code',
    category: 'monospace',
    googleFont: 'Fira+Code:wght@300;400;500;600;700'
  },
  {
    value: 'Source Code Pro',
    label: 'Source Code Pro',
    category: 'monospace',
    googleFont: 'Source+Code+Pro:wght@300;400;500;600;700'
  },
  
  // Display fonts
  {
    value: 'Oswald',
    label: 'Oswald',
    category: 'display',
    googleFont: 'Oswald:wght@200;300;400;500;600;700'
  },
  {
    value: 'Bebas Neue',
    label: 'Bebas Neue',
    category: 'display',
    googleFont: 'Bebas+Neue'
  }
]

export const getDefaultFont = (): string => 'Inter'

export const getGoogleFontsUrl = (): string => {
  const fonts = fontOptions
    .filter(font => font.googleFont)
    .map(font => font.googleFont)
    .join('&family=')
  
  return `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`
}

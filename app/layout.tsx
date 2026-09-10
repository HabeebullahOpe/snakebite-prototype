import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/hooks/useLanguage'
import { AlertProvider } from '@/lib/hooks/useAlerts'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SnakeAid - Emergency Snakebite Response',
  description: 'Snakebite emergency response for Osun State, Nigeria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="font-body bg-[#F3EBD9] min-h-screen"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <AlertProvider>
            {children}
          </AlertProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
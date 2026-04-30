import type { Metadata } from 'next'
import { Dancing_Script, Quicksand, Playfair_Display } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400','600','700'],
  display: 'swap',
});
const quicksand = Quicksand({
  weight: ['300','400','500','600','700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400','700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Happy Birthday Karishma 🐼✨ — A Magical Celebration',
  description: 'A premium cinematic birthday experience for Karishma. Interactive cat, magical letter, confetti, games & memories.',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} ${quicksand.variable} ${playfair.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'n8n Kling AI YouTube Automation',
  description: 'Automated AI video generation and YouTube posting workflow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

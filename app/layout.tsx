import { GoogleAnalytics } from "nextjs-google-analytics";

import './globals.css'
import Footer from './Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <GoogleAnalytics trackPageViews />
      <body>{children}</body>
      <Footer/>
    </html>
  )
}

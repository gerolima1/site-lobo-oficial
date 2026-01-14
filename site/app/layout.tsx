import type React from "react"
import type { Metadata } from "next"
import { Inter, Rajdhani } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import AuthProvider from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })
const rajdhani = Rajdhani({ weight: ["400", "500", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BOT DE FILAS FREE FIRE - Filas Automáticas para Discord",
  description: "Sistema de gerenciamento de filas Free Fire com White Label, Pagamentos PIX e Painel de Controle completo",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased`}>
        {/* O AuthProvider permite que o login funcione em todo o site */}
        <AuthProvider>
          <Header />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}

"use client"

import { Gamepad2, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Gamepad2 className="h-8 w-8 text-primary neon-border" />
              <div className="absolute inset-0 h-8 w-8 rounded-full bg-primary/20 blur-lg" />
            </div>
            <span className="text-xl font-bold gradient-text">BOT FILAS</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Preços
            </a>
            {session && (
              <Link href="/dashboard" className="text-sm text-primary font-medium flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Painel
              </Link>
            )}
          </nav>

          {/* Área do Usuário (Sem o botão de login duplicado) */}
          <div className="flex items-center gap-4">
            {session && (
              <div className="h-8 w-8 rounded-full border border-primary/50 overflow-hidden">
                <img 
                  src={session.user?.image || ""} 
                  alt="Perfil" 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

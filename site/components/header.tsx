"use client"

import { Gamepad2, LayoutDashboard, LogIn } from "lucide-react"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"

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

          {/* Área do Usuário */}
          <div className="flex items-center gap-4">
            {session ? (
              // Se estiver Logado: Mostra Foto
              <div className="h-10 w-10 rounded-full border-2 border-primary/50 overflow-hidden shadow-[0_0_10px_rgba(var(--primary),0.3)]">
                <img 
                  src={session.user?.image || ""} 
                  alt="Perfil" 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              // Se estiver Deslogado: Mostra Botão de Login
              <button
                onClick={() => signIn("discord")}
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
              >
                <LogIn className="h-4 w-4" />
                Login via Discord
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

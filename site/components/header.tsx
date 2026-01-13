"use client"

import { Gamepad2, LogOut, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react" // ✨ Importamos as funções de login

export function Header() {
  const { data: session } = useSession() // ✨ Isso verifica se o usuário está logado

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

          {/* Navigation - Escondido no Mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Preços
            </a>
          </nav>

          {/* Área de Login Dinâmica */}
          <div className="flex items-center gap-4">
            {session ? (
              /* 🟢 SE ESTIVER LOGADO: Mostra Foto/Nome e Botão Sair */
              <div className="flex items-center gap-3">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Painel
                </Link>
                
                <div className="h-8 w-8 rounded-full border border-primary/50 overflow-hidden">
                  <img 
                    src={session.user?.image || ""} 
                    alt="Perfil" 
                    className="h-full w-full object-cover"
                  />
                </div>

                <button 
                  onClick={() => signOut()}
                  className="p-2 hover:bg-red-500/10 rounded-full text-red-400 transition-colors"
                  title="Sair"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              /* 🔴 SE NÃO ESTIVER LOGADO: Mostra o botão de Login */
              <button 
                onClick={() => signIn('discord')}
                className="neon-button rounded-full text-sm px-6 py-2 transition-all hover:scale-105"
              >
                Login com Discord
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
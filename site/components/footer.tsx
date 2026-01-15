"use client"

import { Gamepad2, Instagram, Twitter, MessageSquare, Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 bg-background pt-20 pb-10 overflow-hidden">
      {/* Brilho decorativo no fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand - Lado Esquerdo */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Gamepad2 className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 blur-lg" />
              </div>
              <span className="text-xl font-black tracking-tighter gradient-text uppercase">BOT FILAS</span>
            </Link>
            <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">
              A solução definitiva para gerenciamento de filas e automação de vendas para sua comunidade no Discord.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-foreground/50 hover:text-primary transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-foreground/50 hover:text-primary transition-all">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-foreground/50 hover:text-primary transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-foreground/50 hover:text-primary transition-all">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Dinâmicos */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Produto</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#features" className="text-foreground/50 hover:text-primary transition-colors">Recursos Pro</a></li>
              <li><a href="#pricing" className="text-foreground/50 hover:text-primary transition-colors">Planos e Preços</a></li>
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Atualizações</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Suporte</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Documentação</a></li>
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Status do Bot</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-foreground/50 hover:text-primary transition-colors">Reembolso</a></li>
            </ul>
          </div>
        </div>

        {/* Linha Final */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/30 font-medium">
            © {currentYear} BOT DE FILAS. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold text-foreground/20">
            <span>Powered by Lobo Tech</span>
            <span>Security by Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

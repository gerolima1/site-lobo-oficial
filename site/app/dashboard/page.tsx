"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Bot, Server, Settings, ExternalLink, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bots, setBots] = useState([])
  const [loading, setLoading] = useState(true)

  // 🛡️ Proteção de Rota: Se não estiver logado, volta para a Home
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  // 🚀 Aqui buscaremos os bots do banco futuramente
  // Por enquanto, vamos simular a busca para montar o layout
  useEffect(() => {
    if (session) {
      // Simulação de delay de carregamento
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [session])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header do Dashboard */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Painel Administrativo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black gradient-text">Bem-vindo, {session?.user?.name?.split(' ')[0]}!</h1>
            <p className="text-foreground/50 mt-1">Gerencie sua infraestrutura de bots e filas.</p>
          </div>

          <div className="flex items-center gap-4 glass-effect p-2 pr-6 rounded-full border border-white/10 shadow-xl">
            <img 
              src={session?.user?.image || ""} 
              alt="Avatar" 
              className="h-10 w-10 rounded-full border border-primary/50"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">{session?.user?.name}</span>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">Conta Verificada</span>
            </div>
          </div>
        </header>

        {/* Grid de Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card: Status do Bot */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="group glass-effect p-8 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot className="h-20 w-20 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Bot Principal</h3>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-400 font-medium">Lobo Ativo</span>
                </div>
                <button className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-primary hover:text-black rounded-xl text-sm font-bold transition-all duration-300">
                  <Settings className="h-4 w-4" /> Configurar Fila
                </button>
              </div>
            </div>

            <div className="group glass-effect p-8 rounded-[2rem] border border-white/5 hover:border-secondary/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Server className="h-20 w-20 text-secondary" />
              </div>

              <div className="relative z-10">
                <div className="h-12 w-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 border border-secondary/20">
                  <Server className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Servidores</h3>
                <p className="text-sm text-foreground/50 mb-6 leading-relaxed">O bot está operando em <span className="text-white font-bold">12 servidores</span> ativos no momento.</p>
                <button className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-secondary hover:text-black rounded-xl text-sm font-bold transition-all duration-300">
                  <ExternalLink className="h-4 w-4" /> Ver Servidores
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar de Informações */}
          <div className="glass-effect p-8 rounded-[2rem] border border-white/5">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="h-2 w-2 bg-primary rounded-full" />
              Logs de Atividade
            </h4>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 border-l-2 border-white/5 pl-4 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-xs text-foreground/40 font-mono">14:20:05</span>
                    <span className="text-sm text-foreground/80">Token atualizado com sucesso via painel.</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-[10px] text-primary font-bold uppercase mb-2">Dica Pro</p>
              <p className="text-xs text-foreground/60 leading-relaxed">Mantenha seu token em sigilo. Nunca compartilhe a chave de acesso com terceiros.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

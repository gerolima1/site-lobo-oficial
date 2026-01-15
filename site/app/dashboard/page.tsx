"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Bot, Server, Settings, ExternalLink, Loader2, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Estados para os dados do banco
  const [botData, setBotData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // 🛡️ Proteção de Rota
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  // 📡 Busca os dados reais da nossa API
  useEffect(() => {
    const fetchBotData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/get-token')
          const data = await response.json()
          
          if (response.ok && data.token) {
            setBotData(data)
          } else {
            setBotData(null) // Nenhum bot encontrado
          }
        } catch (err) {
          console.error("Erro ao buscar bot:", err)
          setError(true)
        } finally {
          setLoading(false)
        }
      }
    }

    if (status === "authenticated") {
      fetchBotData()
    }
  }, [session, status])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground/50 animate-pulse">Consultando banco de dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Painel Administrativo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black gradient-text">Olá, {session?.user?.name?.split(' ')[0]}!</h1>
            <p className="text-foreground/50 mt-1">Aqui está o status da sua infraestrutura.</p>
          </div>

          <div className="flex items-center gap-4 glass-effect p-2 pr-6 rounded-full border border-white/10 shadow-xl">
            <img src={session?.user?.image || ""} alt="Avatar" className="h-10 w-10 rounded-full border border-primary/50" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">{session?.user?.name}</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-tighter">Membro VIP</span>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {botData ? (
              /* Se existir um BOT no banco */
              <div className="group glass-effect p-8 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-14 w-14 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30">
                      <Bot className="h-7 w-7 text-primary" />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-green-500 uppercase">Hospedado</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">Seu Lobo Ativo</h3>
                  <p className="text-sm text-foreground/50 mb-6 font-mono">Token: {botData.token.substring(0, 20)}****************</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-4 bg-primary text-black rounded-2xl text-sm font-bold hover:scale-[1.02] transition-all">
                      <Settings className="h-4 w-4" /> Painel de Controle
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold transition-all">
                      <Server className="h-4 w-4" /> Servidores
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Se NÃO existir bot ou der erro */
              <div className="glass-effect p-12 rounded-[2.5rem] border border-dashed border-white/10 text-center">
                <AlertCircle className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum Bot Conectado</h3>
                <p className="text-foreground/50 mb-8 max-w-sm mx-auto">Você ainda não vinculou um token de bot à sua conta. Vá até a página inicial para conectar.</p>
                <button 
                  onClick={() => router.push('/')}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-all"
                >
                  Conectar agora
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-effect p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-6">Logs do Sistema</h4>
              <div className="space-y-6">
                <div className="border-l-2 border-primary/30 pl-4 py-1">
                  <p className="text-xs text-foreground/30 mb-1">Hoje às 14:20</p>
                  <p className="text-sm text-white/80 font-medium">Sessão iniciada via Discord</p>
                </div>
                <div className="border-l-2 border-white/10 pl-4 py-1 opacity-50">
                  <p className="text-xs text-foreground/30 mb-1">Ontem</p>
                  <p className="text-sm text-white/80 font-medium">Nenhuma atividade registrada</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

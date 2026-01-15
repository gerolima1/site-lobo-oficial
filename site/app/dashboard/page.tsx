"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Bot, Server, Settings, Loader2, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [botData, setBotData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🛡️ Proteção de Rota
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  // 📡 Busca os dados reais
  useEffect(() => {
    const fetchBotData = async () => {
      // Pequeno delay para garantir que o Railway validou o Cookie
      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        const response = await fetch('/api/get-token', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.token) {
            setBotData(data)
          }
        }
      } catch (err) {
        console.error("Erro na comunicação com a API:", err)
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchBotData()
    }
  }, [session, status])

  // Tela de Carregamento
  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white/50 animate-pulse font-medium">Sincronizando com a rede...</p>
        </div>
      </div>
    )
  }

  // Se o usuário não estiver logado, não renderiza nada (o useEffect redirecionará)
  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard className="h-5 w-5 text-blue-500" />
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Painel Administrativo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
               Olá, {session.user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-white/40 mt-1 font-medium">Status da sua infraestrutura na nuvem.</p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-2 pr-6 rounded-full border border-white/10 shadow-2xl">
            <img 
              src={session.user?.image || ""} 
              alt="Avatar" 
              className="h-10 w-10 rounded-full border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">{session.user?.name}</span>
              <span className="text-[10px] text-blue-500 font-black uppercase tracking-tighter">Membro VIP</span>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {botData ? (
              <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-[2.5rem] border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bot className="h-32 w-32 text-blue-500" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-14 w-14 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                      <Bot className="h-7 w-7 text-blue-500" />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Ativo</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-1">Seu Lobo Ativo</h3>
                  <p className="text-sm text-white/40 mb-6 font-mono bg-black/40 p-3 rounded-xl border border-white/5">
                    ID: {botData.token?.substring(0, 15)}...
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                      <Settings className="h-4 w-4" /> Configurar
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold border border-white/10 transition-all">
                      <Server className="h-4 w-4" /> Status Real-time
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.02] p-12 rounded-[2.5rem] border border-dashed border-white/10 text-center">
                <AlertCircle className="h-12 w-12 text-white/10 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum Bot Detectado</h3>
                <p className="text-white/40 mb-8 max-w-sm mx-auto font-medium">
                    Não encontramos tokens vinculados à sua conta no banco de dados Neon.
                </p>
                <button 
                  onClick={() => router.push('/')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-black transition-all shadow-xl shadow-blue-600/20"
                >
                  Vincular Token Agora
                </button>
              </div>
            )}
          </div>

          {/* Sidebar de Status */}
          <div className="space-y-6">
            <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5">
              <h4 className="text-sm font-black text-white/30 uppercase tracking-[0.2em] mb-6">Logs de Atividade</h4>
              <div className="space-y-6">
                <div className="border-l-2 border-blue-500 pl-4 py-1 bg-blue-500/5">
                  <p className="text-[10px] text-blue-500 font-bold mb-1">AGORA</p>
                  <p className="text-sm text-white/80 font-medium">Sessão validada via Railway</p>
                </div>
                <div className="border-l-2 border-white/10 pl-4 py-1 opacity-40">
                  <p className="text-[10px] text-white/30 mb-1">DATABASE</p>
                  <p className="text-sm text-white/80 font-medium">Conexão Neon estabelecida</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

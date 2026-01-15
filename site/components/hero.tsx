"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"

export function Hero() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)

  // 🚀 Função que conecta ao Banco Neon
  const handleConnect = async () => {
    if (!token) return alert("❌ Digite um token primeiro!")
    
    setLoading(true)
    try {
      const response = await fetch('/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("✅ SUCESSO! Lobo Conectado e salvo no banco.")
        setToken("") // Limpa o campo
      } else {
        // Mostra o erro real que veio do servidor (ex: erro de senha)
        alert(`⚠️ Erro no Banco: ${data.error || "Erro desconhecido"}`)
        console.error("Detalhes do erro:", data)
      }
    } catch (error) {
      alert("🔥 Erro de conexão com a API. Verifique os logs.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          <span className="text-xs font-bold text-primary tracking-wider uppercase">✨ Sistema Atualizado 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          <span className="gradient-text filter drop-shadow-lg">Filas Free Fire</span>
          <br />
          <span className="text-foreground">Ultra Modernas</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Gerencie suas filas de Free Fire no Discord com tecnologia de ponta. 
          Conecte seu token e assuma o controle total.
        </p>

        {/* 📥 Campo de Input e Botão de Conectar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Cole o Token do Bot aqui..."
              className="w-full p-4 pl-6 rounded-xl bg-background/50 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-sm"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button 
            onClick={handleConnect}
            disabled={loading}
            className="group relative neon-button rounded-xl px-8 py-4 w-full sm:w-auto font-bold flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                "Conectando..."
              ) : (
                <>
                  Conectar Lobo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
          <div className="glass-effect rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-colors">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5K+</div>
            <div className="text-xs md:text-sm text-foreground/60 font-medium uppercase tracking-wide">Servidores</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-white/5 hover:border-secondary/20 transition-colors">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">50K+</div>
            <div className="text-xs md:text-sm text-foreground/60 font-medium uppercase tracking-wide">Usuários</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-colors">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">24/7</div>
            <div className="text-xs md:text-sm text-foreground/60 font-medium uppercase tracking-wide">Online</div>
          </div>
        </div>
      </div>
    </section>
  )
}

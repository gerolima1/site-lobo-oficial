"use client"

import { useState } from "react"

export function Hero() {
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)

  // 🚀 Função mágica que envia o token para o Banco Neon
  const handleConnect = async () => {
    if (!token) return alert("❌ Digite um token primeiro!")
    
    setLoading(true)
    try {
      const response = await fetch('/api/save-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      })

      if (response.ok) {
        alert("✅ Lobo Conectado! Token salvo no Neon.")
        setToken("") // Limpa o campo
      } else {
        alert("⚠️ Erro ao salvar. Verifique se a tabela existe no Neon.")
      }
    } catch (error) {
      alert("🔥 Erro de conexão!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect">
          <span className="text-xs font-semibold text-primary">✨ LOBO ATUALIZADO 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Filas Free Fire</span>
          <br />
          <span className="text-foreground">Ultra Modernas</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
          Gerencie suas filas de Free Fire no Discord. Digite o token do seu bot abaixo para conectar ao painel.
        </p>

        {/* 📥 Campo de Input e Botão de Conectar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input 
            type="text" 
            placeholder="Cole o Token do Bot aqui..."
            className="w-full sm:w-80 p-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button 
            onClick={handleConnect}
            disabled={loading}
            className="neon-button rounded-lg px-8 py-4 w-full sm:w-auto"
          >
            {loading ? "Conectando..." : "Conectar Lobo"}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
          <div className="glass-effect rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-primary">5K+</div>
            <div className="text-xs md:text-sm text-foreground/60">Servidores Ativos</div>
          </div>
          <div className="glass-effect rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-secondary">50K+</div>
            <div className="text-xs md:text-sm text-foreground/60">Usuários Diários</div>
          </div>
          <div className="glass-effect rounded-lg p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold gradient-text">24/7</div>
            <div className="text-xs md:text-sm text-foreground/60">Suporte Online</div>
          </div>
        </div>
      </div>
    </section>
  )
}
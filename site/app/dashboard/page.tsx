"use client"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Painel do Cliente</h1>
            <p className="text-foreground/60">Gerencie seus bots de Free Fire</p>
          </div>
          <div className="glass-effect p-2 px-4 rounded-full border border-primary/30">
            <span className="text-sm">Conectado como Usuário</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de Bot Ativo */}
          <div className="glass-effect p-6 rounded-2xl border border-white/10 hover:border-primary/50 transition-all">
            <div className="h-12 w-12 bg-primary/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-2xl">??</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Bot Principal</h3>
            <p className="text-sm text-foreground/50 mb-4">Status: <span className="text-green-400">Ativo</span></p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
              Configurar Fila
            </button>
          </div>

          {/* Card de Servidores */}
          <div className="glass-effect p-6 rounded-2xl border border-white/10">
             <div className="h-12 w-12 bg-secondary/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-2xl">???</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Servidores</h3>
            <p className="text-sm text-foreground/50 mb-4">Gerencie onde o bot está.</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm">
              Ver Servidores
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

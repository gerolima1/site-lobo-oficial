"use client"

import { Zap, CreditCard, Settings, ShieldCheck, Target, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "White Label",
      description: "Personalize completamente o bot com suas cores e branding. Sua marca em evidência em todos os comandos.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "PIX Automático",
      description: "Sistema de pagamentos integrado. Liberação de cargos e acesso instantâneo após a confirmação do PIX.",
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Painel de Controle",
      description: "Dashboard intuitivo para gerenciar suas filas, configurar preços e monitorar vendas em tempo real.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
  ]

  return (
    <section id="features" className="relative py-24 px-4 bg-background">
      {/* Luz de fundo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Recursos <span className="gradient-text">Exclusivos</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Desenvolvido para grandes comunidades, nossa infraestrutura garante estabilidade e rapidez em cada transação.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative glass-effect rounded-3xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Efeito de Brilho no Hover (Background) */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10">
                {/* Ícone com animação de pulso no hover */}
                <div className={`mb-8 inline-flex p-4 ${feature.bg} rounded-2xl ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-foreground/60 leading-relaxed text-base">
                  {feature.description}
                </p>

                {/* Link decorativo ou indicador de ação */}
                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  Saiba mais <Zap className="h-3 w-3 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

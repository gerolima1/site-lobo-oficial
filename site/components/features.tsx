"use client"

import { Zap, CreditCard, Settings } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "White Label",
      description: "Personalize completamente o bot com suas cores e branding. Seu logo, sua identidade visual.",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "PIX Automático",
      description: "Receba pagamentos instantaneamente. Integração automática com suas contas de cobranças.",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Painel de Controle",
      description: "Dashboard completo para gerenciar filas, usuários e configurações em tempo real.",
    },
  ]

  return (
    <section id="features" className="relative py-20 px-4 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Recursos Poderosos</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar filas profissionalmente
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-effect rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:neon-border"
            >
              {/* Icon */}
              <div className="mb-6 relative inline-block">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>

              {/* Description */}
              <p className="text-foreground/60 leading-relaxed">{feature.description}</p>

              {/* Decorative Line */}
              <div className="mt-6 h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Check } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "49",
      currency: "R$",
      period: "/mês",
      description: "Para comunidades pequenas",
      features: [
        "Até 100 usuários simultâneos",
        "1 servidor Discord",
        "Suporte via email",
        "White Label básico",
        "Relatórios mensais",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "129",
      currency: "R$",
      period: "/mês",
      description: "Mais popular para comunidades",
      features: [
        "Até 1000 usuários simultâneos",
        "10 servidores Discord",
        "Suporte prioritário 24/7",
        "White Label completo",
        "Relatórios em tempo real",
        "Análise de dados avançada",
        "API completa",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      currency: "",
      period: "",
      description: "Para grandes operações",
      features: [
        "Usuários ilimitados",
        "Servidores ilimitados",
        "Suporte dedicado 24/7",
        "White Label premium",
        "Customizações específicas",
        "SLA garantido",
        "Consultoria gratuita",
      ],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="relative py-20 px-4 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Planos Futuristas</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Escolha o plano perfeito para sua comunidade</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "glass-effect border-2 border-primary scale-105 neon-border"
                  : "glass-effect border border-foreground/10 hover:border-primary/30"
              }`}
            >
              {/* Highlight Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-gradient-to-r from-primary to-secondary text-black px-4 py-1 rounded-full text-xs font-bold">
                    MAIS POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
              <p className="text-foreground/60 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary">
                  {plan.currency}
                  {plan.price}
                  <span className="text-lg text-foreground/60">{plan.period}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full rounded-lg py-3 font-semibold mb-8 transition-all ${
                  plan.highlighted
                    ? "neon-button"
                    : "border border-foreground/20 text-foreground hover:border-primary/50"
                }`}
              >
                Começar Agora
              </button>

              {/* Features List */}
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

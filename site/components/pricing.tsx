"use client"

import { Check, Sparkles } from "lucide-react"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "49",
      currency: "R$",
      period: "/mês",
      description: "Ideal para quem está começando agora.",
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
      description: "A escolha preferida das grandes guilds.",
      features: [
        "Até 1000 usuários simultâneos",
        "10 servidores Discord",
        "Suporte prioritário 24/7",
        "White Label completo",
        "Relatórios em tempo real",
        "API completa",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      currency: "",
      period: "",
      description: "Poder ilimitado para sua operação.",
      features: [
        "Usuários ilimitados",
        "Servidores ilimitados",
        "Suporte dedicado 24/7",
        "White Label premium",
        "Customizações específicas",
        "SLA garantido",
      ],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="relative py-24 px-4 bg-background overflow-hidden">
      {/* Detalhe de luz de fundo */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] -z-10" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4 uppercase tracking-widest">
            <Sparkles className="h-3 w-3" /> Investimento
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Planos <span className="gradient-text">Futuristas</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
            Escalabilidade real para o seu negócio. Sem taxas escondidas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.highlighted
                  ? "glass-effect border-2 border-primary/50 shadow-[0_0_40px_rgba(var(--primary),0.15)] bg-gradient-to-b from-primary/5 to-transparent py-12"
                  : "glass-effect border border-white/5 hover:border-white/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-primary text-black px-6 py-1.5 rounded-full text-xs font-black tracking-tighter uppercase shadow-[0_0_20px_rgba(var(--primary),0.5)]">
                    MAIS VENDIDO
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground/50">{plan.currency}</span>
                <span className="text-5xl font-black text-white tracking-tighter">
                  {plan.price}
                </span>
                <span className="text-sm font-medium text-foreground/40">{plan.period}</span>
              </div>

              <button
                className={`w-full rounded-2xl py-4 font-bold text-sm transition-all duration-300 mb-8 active:scale-95 ${
                  plan.highlighted
                    ? "neon-button shadow-lg shadow-primary/20"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {plan.price === "Custom" ? "Falar com Consultor" : "Adquirir Agora"}
              </button>

              <div className="space-y-4">
                <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest mb-4">O que está incluso:</p>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3 group/item">
                    <div className={`p-1 rounded-full ${plan.highlighted ? "bg-primary/20" : "bg-white/5"}`}>
                      <Check className={`h-3 w-3 ${plan.highlighted ? "text-primary" : "text-foreground/40"}`} />
                    </div>
                    <span className="text-foreground/70 text-sm group-hover/item:text-foreground transition-colors">
                      {feature}
                    </span>
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

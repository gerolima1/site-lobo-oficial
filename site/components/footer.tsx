"use client"

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-foreground mb-4">BOT FILAS</h3>
            <p className="text-foreground/60 text-sm">Filas profissionais para sua comunidade Discord</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Termos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-foreground/10 pt-8">
          <p className="text-center text-sm text-foreground/60">© 2026 BOT DE FILAS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

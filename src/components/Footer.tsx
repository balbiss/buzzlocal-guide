import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface-sunken border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <span className="font-extrabold text-primary-foreground text-sm">JR</span>
              </div>
              <div className="leading-none">
                <span className="text-lg font-extrabold text-foreground block">JR INOVAÇÕES</span>
                <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Desenvolvimento de Pessoas</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fortalecendo o futuro através de ensinamentos reais. Desenvolvimento de Pessoas & Consultoria Empresarial.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-primary shrink-0" />
                <a href="mailto:jrinovacoes@gmail.com" className="hover:text-primary transition-colors">jrinovacoes@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-primary shrink-0" />
                <a href="tel:+5511975858999" className="hover:text-primary transition-colors">(11) 97585-8999</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-primary shrink-0" />
                <span>São José dos Campos – SP – Brasil</span>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">CNPJ: 27.642.916/0001-00</p>
          </div>

          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2026 JR INOVAÇÕES. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

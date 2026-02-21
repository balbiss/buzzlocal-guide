import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <span className="font-extrabold text-sm text-primary-foreground">E</span>
              </div>
              <span className="text-xl font-extrabold">Eventora</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              A principal plataforma de descoberta e divulgação de eventos da sua região.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Encontrar Eventos</Link></li>
              <li><a href="#categorias" className="hover:text-primary-foreground transition-colors">Categorias</a></li>
              <li><a href="#blog" className="hover:text-primary-foreground transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Organizadores</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#organizadores" className="hover:text-primary-foreground transition-colors">Divulgar Evento</a></li>
              <li><a href="#como-funciona" className="hover:text-primary-foreground transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Planos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          © 2026 Eventora. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

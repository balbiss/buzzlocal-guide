import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo-jr.png";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre os eventos da JR Inovações.");

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (hash: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="JR Inovações" className="h-10 w-auto" />
          <span className="text-lg font-bold text-foreground tracking-wide">JR Inovações</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/#sobre" onClick={() => handleAnchorClick("#sobre")} className="text-muted-foreground hover:text-primary transition-colors">Sobre</a>
          <a href="/#eventos" onClick={() => handleAnchorClick("#eventos")} className="text-muted-foreground hover:text-primary transition-colors">Eventos</a>
          <a href="/#galeria" onClick={() => handleAnchorClick("#galeria")} className="text-muted-foreground hover:text-primary transition-colors">Galeria</a>
          <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
          <a href="/#contato" onClick={() => handleAnchorClick("#contato")} className="text-muted-foreground hover:text-primary transition-colors">Contato</a>
        </nav>

        <div className="hidden md:block">
          <Button size="sm" className="gradient-primary text-primary-foreground border-0 font-bold shadow-glow" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <a href="/#sobre" onClick={() => handleAnchorClick("#sobre")} className="py-2 text-foreground">Sobre</a>
            <a href="/#eventos" onClick={() => handleAnchorClick("#eventos")} className="py-2 text-foreground">Eventos</a>
            <a href="/#galeria" onClick={() => handleAnchorClick("#galeria")} className="py-2 text-foreground">Galeria</a>
            <Link to="/blog" onClick={() => setOpen(false)} className="py-2 text-foreground">Blog</Link>
            <a href="/#contato" onClick={() => handleAnchorClick("#contato")} className="py-2 text-foreground">Contato</a>
            <Button size="sm" className="gradient-primary text-primary-foreground border-0 font-bold w-full mt-2" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

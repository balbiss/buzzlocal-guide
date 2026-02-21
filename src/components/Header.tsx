import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-sm">E</span>
          </div>
          <span className="text-xl font-extrabold text-foreground tracking-tight">Eventora</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Encontrar Eventos</Link>
          <a href="#categorias" className="text-muted-foreground hover:text-foreground transition-colors">Categorias</a>
          <a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="#como-funciona">Cadastrar Evento</a>
          </Button>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0 shadow-hero" asChild>
            <a href="#organizadores">Divulgar Evento</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <Link to="/" className="py-2 text-foreground" onClick={() => setMobileOpen(false)}>Encontrar Eventos</Link>
            <a href="#categorias" className="py-2 text-foreground" onClick={() => setMobileOpen(false)}>Categorias</a>
            <a href="#blog" className="py-2 text-foreground" onClick={() => setMobileOpen(false)}>Blog</a>
            <Button size="sm" className="gradient-primary text-primary-foreground border-0 w-full mt-2">
              Divulgar Evento
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

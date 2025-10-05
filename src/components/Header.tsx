import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Wrench } from "lucide-react";

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">AssistTech</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Início
          </Link>
          <a href="#servicos" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Serviços
          </a>
          <a href="#como-funciona" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Como Funciona
          </a>
          <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:11999887766" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" />
            (11) 99988-7766
          </a>
          <Button onClick={scrollToContact} size="sm" className="bg-gradient-primary hover:bg-primary-hover">
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

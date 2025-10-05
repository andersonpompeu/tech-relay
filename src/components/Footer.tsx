import { Link } from "react-router-dom";
import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Wrench className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">AssistTech</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Assistência técnica especializada em eletrodomésticos com profissionais qualificados e garantia de serviço.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4 text-primary hover:text-primary-foreground" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4 text-primary hover:text-primary-foreground" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4 text-primary hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/servicos/conserto-geladeira" className="hover:text-primary transition-colors">Conserto de Geladeira</Link></li>
              <li><Link to="/servicos/conserto-maquina-lavar" className="hover:text-primary transition-colors">Conserto de Máquina de Lavar</Link></li>
              <li><Link to="/servicos/conserto-fogao" className="hover:text-primary transition-colors">Conserto de Fogão</Link></li>
              <li><Link to="/servicos/conserto-micro-ondas" className="hover:text-primary transition-colors">Conserto de Micro-ondas</Link></li>
              <li><Link to="/servicos/conserto-ar-condicionado" className="hover:text-primary transition-colors">Conserto de Ar Condicionado</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Início</Link></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Serviços</a></li>
              <li><a href="#como-funciona" className="hover:text-primary transition-colors">Como Funciona</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Telefone</p>
                  <a href="tel:11999887766" className="hover:text-primary transition-colors">(11) 99988-7766</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <a href="mailto:contato@assisttech.com.br" className="hover:text-primary transition-colors">contato@assisttech.com.br</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Endereço</p>
                  <p>São Paulo, SP<br />Atendemos toda a região</p>
                </div>
              </li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              <strong>Horário:</strong><br />
              Segunda a Sábado: 8h às 20h
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AssistTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

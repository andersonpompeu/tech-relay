import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Shield } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block rounded-full bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground">
              Assistência Técnica de Confiança
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Conserto de Eletrodomésticos em{" "}
              <span className="text-primary">São Paulo</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Atendimento rápido com profissionais qualificados e garantia de serviço. 
              Seu eletrodoméstico funcionando em até 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="bg-gradient-primary hover:bg-primary-hover text-base"
              >
                Solicitar Orçamento Grátis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <a href="tel:11999887766">Ligar Agora</a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Atendimento 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Garantia 90 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">Certificados</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop"
              alt="Técnico consertando eletrodomésticos"
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card border">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
                    alt="Professional 1"
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                    alt="Professional 2"
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="Professional 3"
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">+50 Técnicos</p>
                  <p className="text-xs text-muted-foreground">Qualificados e Certificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

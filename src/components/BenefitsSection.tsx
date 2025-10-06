import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Award, DollarSign, Shield, Package, MapPin } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Respondemos em minutos e agendamos para o mesmo dia ou próximo dia útil.",
  },
  {
    icon: Award,
    title: "Profissionais Qualificados",
    description: "Técnicos certificados com anos de experiência em eletrodomésticos.",
  },
  {
    icon: Shield,
    title: "Garantia de Serviço",
    description: "90 dias de garantia em todos os serviços realizados.",
  },
  {
    icon: DollarSign,
    title: "Preço Justo",
    description: "Orçamento transparente sem compromisso. Você só paga se aprovar.",
  },
  {
    icon: Package,
    title: "Peças Originais",
    description: "Trabalhamos apenas com peças originais e de qualidade garantida.",
  },
  {
    icon: MapPin,
    title: "Cobertura Total",
    description: "Atendemos toda a região de São Paulo e grande São Paulo.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Por Que Nos Escolher
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Qualidade, confiança e satisfação garantida em cada atendimento
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={benefit.title}
                className="hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Calendar, Wrench, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "Você Solicita",
    description: "Preencha o formulário ou ligue. Atendemos em minutos.",
    number: "01",
  },
  {
    icon: Calendar,
    title: "Profissional Contata",
    description: "Um técnico especializado entrará em contato rapidamente.",
    number: "02",
  },
  {
    icon: Wrench,
    title: "Visita Agendada",
    description: "Agendamos a visita técnica no melhor horário para você.",
    number: "03",
  },
  {
    icon: CheckCircle2,
    title: "Problema Resolvido",
    description: "Seu eletrodoméstico consertado com garantia de 90 dias.",
    number: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e rápido em 4 passos
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={step.number}
                className="relative overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5">
                  {step.number}
                </div>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

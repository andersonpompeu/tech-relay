import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Refrigerator, 
  WashingMachine, 
  Flame, 
  Microwave, 
  Wind, 
  Droplets,
  UtensilsCrossed,
  Waves
} from "lucide-react";

const services = [
  {
    icon: Refrigerator,
    name: "Geladeira e Freezer",
    slug: "conserto-geladeira",
    description: "Conserto e manutenção de geladeiras e freezers de todas as marcas. Problemas com temperatura, ruídos e vazamentos.",
    price: "A partir de R$ 120",
  },
  {
    icon: WashingMachine,
    name: "Máquina de Lavar",
    slug: "conserto-maquina-lavar",
    description: "Reparos em máquinas de lavar roupas. Vazamentos, problemas na centrifugação e componentes elétricos.",
    price: "A partir de R$ 100",
  },
  {
    icon: Flame,
    name: "Fogão e Cooktop",
    slug: "conserto-fogao",
    description: "Conserto de fogões e cooktops. Problemas com acendimento, válvulas, queimadores e forno.",
    price: "A partir de R$ 90",
  },
  {
    icon: Microwave,
    name: "Micro-ondas",
    slug: "conserto-micro-ondas",
    description: "Reparo de micro-ondas de todas as marcas. Problemas com aquecimento, painel e componentes internos.",
    price: "A partir de R$ 110",
  },
  {
    icon: UtensilsCrossed,
    name: "Lava-louças",
    slug: "conserto-lava-loucas",
    description: "Manutenção e conserto de lava-louças. Vazamentos, problemas de drenagem e ciclos de lavagem.",
    price: "A partir de R$ 130",
  },
  {
    icon: Wind,
    name: "Ar Condicionado",
    slug: "conserto-ar-condicionado",
    description: "Instalação, manutenção e conserto de ar condicionado. Limpeza, recarga de gás e problemas elétricos.",
    price: "A partir de R$ 150",
  },
  {
    icon: Refrigerator,
    name: "Freezer",
    slug: "conserto-freezer",
    description: "Conserto de freezers verticais e horizontais. Problemas de refrigeração, gás e componentes.",
    price: "A partir de R$ 140",
  },
  {
    icon: WashingMachine,
    name: "Tanquinho",
    slug: "conserto-tanquinho",
    description: "Reparo de tanquinhos. Centrifugação, motor, timer e componentes elétricos.",
    price: "A partir de R$ 80",
  },
];

const ServicesSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Atendemos todos os tipos de eletrodomésticos com profissionais especializados
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.slug} 
                className="group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-accent">{service.price}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    onClick={scrollToContact}
                    className="flex-1"
                    size="sm"
                  >
                    Solicitar
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="sm"
                  >
          <Link to={`/servicos/${service.slug}`}>
            Ver Mais
          </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

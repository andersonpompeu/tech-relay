import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const serviceData: Record<string, any> = {
  "conserto-geladeira": {
    title: "Conserto de Geladeira em São Paulo",
    description: "Assistência técnica especializada para geladeiras de todas as marcas",
    longDescription: "Conte com os melhores profissionais para o conserto de sua geladeira em São Paulo. Atendemos todas as marcas e modelos, com garantia de serviço e peças originais. Nossa equipe está preparada para resolver problemas de refrigeração, vazamentos, ruídos e qualquer outro defeito.",
    commonProblems: [
      "Geladeira não está gelando adequadamente",
      "Vazamento de água",
      "Ruídos estranhos ou excessivos",
      "Congelamento excessivo",
      "Porta não veda corretamente",
      "Luz interna não acende",
      "Termostato com defeito",
      "Motor não funciona",
    ],
    faq: [
      {
        q: "Quanto custa o conserto de uma geladeira?",
        a: "O valor varia de acordo com o problema identificado. Nosso orçamento inicial é gratuito e sem compromisso. Após a visita técnica, você receberá um orçamento detalhado com o valor do serviço.",
      },
      {
        q: "Vocês trabalham com quais marcas de geladeira?",
        a: "Atendemos todas as marcas: Brastemp, Consul, Electrolux, LG, Samsung, Panasonic, Midea, entre outras. Nossos técnicos são especializados em diversos modelos.",
      },
      {
        q: "Qual o prazo para conserto?",
        a: "Na maioria dos casos, o conserto é realizado na mesma visita. Em situações que necessitam de peças específicas, o prazo pode variar de 1 a 3 dias úteis.",
      },
      {
        q: "Tem garantia?",
        a: "Sim! Oferecemos 90 dias de garantia em todos os serviços realizados e peças substituídas.",
      },
    ],
  },
  "conserto-maquina-lavar": {
    title: "Conserto de Máquina de Lavar em São Paulo",
    description: "Reparo profissional de máquinas de lavar de todas as marcas",
    longDescription: "Serviço especializado de conserto para máquinas de lavar roupas. Nossa equipe técnica resolve problemas de vazamento, centrifugação, aquecimento e componentes eletrônicos com agilidade e qualidade garantida.",
    commonProblems: [
      "Máquina não liga ou não funciona",
      "Vazamento de água",
      "Problemas na centrifugação",
      "Não agita ou não lava",
      "Não drena a água",
      "Ruídos anormais durante o funcionamento",
      "Erro no painel eletrônico",
      "Porta travada ou com defeito",
    ],
    faq: [
      {
        q: "Por que minha máquina está vazando?",
        a: "Vazamentos podem ser causados por mangueiras danificadas, vedações desgastadas, bomba de drenagem com problema ou excesso de sabão. Nossa equipe faz o diagnóstico preciso.",
      },
      {
        q: "A máquina faz barulho, o que pode ser?",
        a: "Ruídos anormais podem indicar rolamentos desgastados, objetos presos no tambor, correias soltas ou problemas no motor. É importante verificar rapidamente para evitar danos maiores.",
      },
      {
        q: "Quanto tempo leva o conserto?",
        a: "Problemas simples são resolvidos na hora. Casos que necessitam de peças específicas podem levar de 1 a 5 dias úteis, dependendo da disponibilidade.",
      },
    ],
  },
};

const ServicePage = () => {
  const { serviceName } = useParams<{ serviceName: string }>();
  const service = serviceName ? serviceData[serviceName] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
            <Button asChild>
              <Link to="/">Voltar para Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
            
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => {
                  const contactSection = document.getElementById('contato');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Solicitar Orçamento Grátis
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:11999887766">Ligar Agora</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-12">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Sobre o Serviço</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.longDescription}
                  </p>
                </CardContent>
              </Card>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Problemas Comuns</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.commonProblems.map((problem: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {service.faq.map((item: any, index: number) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="bg-card border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <Card className="bg-gradient-primary text-primary-foreground">
                <CardContent className="pt-6 text-center">
                  <h2 className="text-2xl font-bold mb-2">Precisa de Atendimento?</h2>
                  <p className="mb-6 opacity-90">
                    Entre em contato agora e receba atendimento rápido e profissional
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      onClick={() => {
                        const contactSection = document.getElementById('contato');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Solicitar Orçamento
                    </Button>
                    <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                      <a href="tel:11999887766">Ligar Agora</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ContactFormSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;

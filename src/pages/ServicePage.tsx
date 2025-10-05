import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
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
import { CheckCircle2, ArrowLeft, MapPin, Clock, Shield } from "lucide-react";
import { servicesData, localBusinessSchema } from "@/data/servicesData";

const ServicePage = () => {
  const { serviceName } = useParams<{ serviceName: string }>();
  const service = serviceName ? servicesData[serviceName] : null;

  useEffect(() => {
    if (service) {
      window.scrollTo(0, 0);
    }
  }, [service]);

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

  // Schema markup para FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map((item: any) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://assisttech.com.br/servicos/${serviceName}`} />
        <link rel="canonical" href={`https://assisttech.com.br/servicos/${serviceName}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

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
              <h1 className="text-4xl font-bold mb-4">{service.h1}</h1>
              <p className="text-xl text-muted-foreground mb-4">{service.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Atendemos toda São Paulo</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Disponível 24h</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Garantia 90 dias</span>
                </div>
              </div>
              
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
                  <h2 className="text-2xl font-bold mb-4">Sobre o Serviço de {service.title}</h2>
                  <div className="prose prose-lg max-w-none">
                    {service.longDescription.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-12 bg-muted/30">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">{service.h2Price}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.priceInfo}
                  </p>
                </CardContent>
              </Card>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Problemas Comuns em {service.title}</h2>
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
                  <h2 className="text-2xl font-bold mb-2">Precisa de Atendimento Agora?</h2>
                  <p className="mb-6 opacity-90">
                    Entre em contato e receba atendimento rápido com profissionais qualificados
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

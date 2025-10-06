import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Patricia Oliveira",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    service: "Conserto de Geladeira",
    rating: 5,
    text: "Excelente atendimento! O técnico foi pontual, educado e resolveu o problema da minha geladeira em menos de uma hora. Super recomendo!",
  },
  {
    name: "Eduardo Santos",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    service: "Conserto de Máquina de Lavar",
    rating: 5,
    text: "Profissionais muito competentes. Minha máquina estava com problema há semanas e eles resolveram rapidamente. Preço justo e serviço de qualidade.",
  },
  {
    name: "Juliana Costa",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    service: "Instalação de Ar Condicionado",
    rating: 5,
    text: "Muito satisfeita com o serviço! Desde o primeiro contato até a finalização, tudo foi perfeito. Voltarei a contratar com certeza.",
  },
  {
    name: "Ricardo Ferreira",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    service: "Conserto de Fogão",
    rating: 5,
    text: "Atendimento nota 10! O técnico explicou tudo certinho e ainda deu dicas de manutenção. Meu fogão ficou funcionando perfeitamente.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Satisfação e confiança comprovadas por quem já utilizou nossos serviços
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground italic">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

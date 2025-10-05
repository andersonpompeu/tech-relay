import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual o prazo para atendimento?",
    answer: "Respondemos em minutos após o primeiro contato. A visita técnica pode ser agendada no mesmo dia ou no próximo dia útil, dependendo da disponibilidade e urgência do caso.",
  },
  {
    question: "Vocês cobram pela visita técnica?",
    answer: "A taxa de visita é cobrada apenas se você não aprovar o orçamento. Caso aprove e realize o conserto, a taxa é abatida do valor total do serviço.",
  },
  {
    question: "Trabalham com quais marcas de eletrodomésticos?",
    answer: "Trabalhamos com todas as principais marcas: Brastemp, Consul, Electrolux, LG, Samsung, Midea, Philco, Panasonic, entre outras. Nossos técnicos são especializados em diversas marcas e modelos.",
  },
  {
    question: "Qual a garantia do serviço?",
    answer: "Oferecemos 90 dias de garantia em todos os serviços realizados e peças substituídas. Se houver qualquer problema relacionado ao serviço executado neste período, retornamos sem custos adicionais.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos diversas formas de pagamento: dinheiro, PIX, cartões de débito e crédito (à vista ou parcelado). O pagamento é realizado apenas após a conclusão e aprovação do serviço.",
  },
  {
    question: "Atendem aos finais de semana?",
    answer: "Sim! Atendemos de segunda a sábado. Para atendimentos de urgência aos domingos e feriados, consulte disponibilidade através do nosso WhatsApp ou telefone.",
  },
  {
    question: "Como faço para solicitar um orçamento?",
    answer: "É muito simples! Você pode preencher o formulário no site, ligar para o nosso telefone ou enviar mensagem pelo WhatsApp. Respondemos rapidamente e agendamos a visita técnica no melhor horário para você.",
  },
  {
    question: "Qual região vocês atendem?",
    answer: "Atendemos toda a cidade de São Paulo e região metropolitana, incluindo ABC, Guarulhos, Osasco e demais cidades da Grande São Paulo. Consulte cobertura para sua região específica.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border rounded-lg px-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;

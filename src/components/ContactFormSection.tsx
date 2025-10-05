import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLeads } from "@/contexts/LeadContext";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  nomeCliente: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  telefone: z.string().min(10, "Telefone inválido").max(15),
  email: z.string().email("Email inválido").max(255).optional().or(z.literal("")),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  tipoAparelho: z.string().min(1, "Selecione o tipo de aparelho"),
  descricaoProblema: z.string().min(10, "Descreva o problema com mais detalhes").max(1000),
  melhorHorario: z.string().min(1, "Selecione o melhor horário"),
});

type FormData = z.infer<typeof formSchema>;

const ContactFormSection = () => {
  const { addLead, professionals } = useLeads();
  const [showSuccess, setShowSuccess] = useState(false);
  const [assignedProfessional, setAssignedProfessional] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeCliente: "",
      telefone: "",
      email: "",
      cep: "",
      tipoAparelho: "",
      descricaoProblema: "",
      melhorHorario: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const lead = addLead({
      nomeCliente: data.nomeCliente,
      telefone: data.telefone,
      email: data.email || "",
      cep: data.cep,
      tipoAparelho: data.tipoAparelho,
      descricaoProblema: data.descricaoProblema,
      melhorHorario: data.melhorHorario,
    });
    
    if (!lead) {
      toast.error("Não há profissionais disponíveis no momento. Tente novamente mais tarde.");
      return;
    }

    const professional = professionals.find(p => p.id === lead.profissionalDesignado);
    setAssignedProfessional(professional?.nome || "");
    setShowSuccess(true);
    form.reset();

    setTimeout(() => {
      setShowSuccess(false);
    }, 8000);

    toast.success("Solicitação enviada com sucesso!");
  };

  if (showSuccess) {
    return (
      <section id="contato" className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
                <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Solicitação Recebida com Sucesso!
            </h2>
            <p className="text-xl mb-6">
              {assignedProfessional} entrará em contato com você em breve.
            </p>
            <p className="text-lg opacity-90">
              Aguarde nosso retorno. Geralmente respondemos em poucos minutos!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 text-primary-foreground animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Solicite seu Orçamento Grátis
            </h2>
            <p className="text-lg opacity-90">
              Preencha o formulário e receba o contato de um profissional qualificado
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-2xl animate-slide-up">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nomeCliente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone/WhatsApp *</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP *</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tipoAparelho"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Aparelho *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Geladeira">Geladeira</SelectItem>
                            <SelectItem value="Freezer">Freezer</SelectItem>
                            <SelectItem value="Máquina de Lavar">Máquina de Lavar</SelectItem>
                            <SelectItem value="Tanquinho">Tanquinho</SelectItem>
                            <SelectItem value="Fogão">Fogão</SelectItem>
                            <SelectItem value="Cooktop">Cooktop</SelectItem>
                            <SelectItem value="Micro-ondas">Micro-ondas</SelectItem>
                            <SelectItem value="Lava-louças">Lava-louças</SelectItem>
                            <SelectItem value="Ar Condicionado">Ar Condicionado</SelectItem>
                            <SelectItem value="Secadora">Secadora</SelectItem>
                            <SelectItem value="Purificador">Purificador de Água</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="melhorHorario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Melhor Horário para Contato *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Manhã (8h-12h)">Manhã (8h-12h)</SelectItem>
                          <SelectItem value="Tarde (13h-17h)">Tarde (13h-17h)</SelectItem>
                          <SelectItem value="Noite (18h-20h)">Noite (18h-20h)</SelectItem>
                          <SelectItem value="Qualquer horário">Qualquer horário</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descricaoProblema"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do Problema *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva o problema que está ocorrendo com seu eletrodoméstico..."
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent-hover text-base"
                >
                  Solicitar Orçamento Grátis
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;

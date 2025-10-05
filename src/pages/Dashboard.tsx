import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeads } from "@/contexts/LeadContext";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Home,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Dashboard = () => {
  const { professionals, leads, resetRotation, currentIndex } = useLeads();
  const [activeTab, setActiveTab] = useState("overview");

  const activeProfessionals = professionals.filter(p => p.ativo);
  const totalLeads = leads.length;
  const todayLeads = leads.filter(l => {
    const today = new Date();
    return l.timestamp.toDateString() === today.toDateString();
  }).length;

  const totalConversions = leads.filter(l => l.status === 'convertido').length;
  const conversionRate = totalLeads > 0 ? ((totalConversions / totalLeads) * 100).toFixed(1) : "0";

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pendente: { variant: "secondary" as const, label: "Pendente", icon: AlertCircle },
      em_atendimento: { variant: "default" as const, label: "Em Atendimento", icon: Clock },
      convertido: { variant: "default" as const, label: "Convertido", icon: CheckCircle2 },
      perdido: { variant: "destructive" as const, label: "Perdido", icon: XCircle },
    };
    
    const config = statusMap[status as keyof typeof statusMap] || statusMap.pendente;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Administrativo</h1>
              <p className="text-sm text-muted-foreground">Gerencie profissionais e acompanhe leads</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {todayLeads} hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Profissionais Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeProfessionals.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                de {professionals.length} cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalConversions} convertidos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rodízio Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">#{currentIndex + 1}</div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={resetRotation}
                className="mt-2 w-full"
              >
                <RotateCcw className="mr-2 h-3 w-3" />
                Resetar
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="professionals">Profissionais</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leads por Profissional</CardTitle>
                  <CardDescription>Distribuição atual de leads</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {professionals.map((prof) => (
                      <div key={prof.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={prof.foto}
                            alt={prof.nome}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-sm">{prof.nome}</p>
                            <p className="text-xs text-muted-foreground">
                              {prof.ativo ? "Ativo" : "Inativo"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{prof.leadsRecebidos}</p>
                          <p className="text-xs text-muted-foreground">
                            {prof.leadsConvertidos} convertidos
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status dos Leads</CardTitle>
                  <CardDescription>Distribuição por status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { status: 'pendente', label: 'Pendentes', count: leads.filter(l => l.status === 'pendente').length },
                      { status: 'em_atendimento', label: 'Em Atendimento', count: leads.filter(l => l.status === 'em_atendimento').length },
                      { status: 'convertido', label: 'Convertidos', count: leads.filter(l => l.status === 'convertido').length },
                      { status: 'perdido', label: 'Perdidos', count: leads.filter(l => l.status === 'perdido').length },
                    ].map((item) => (
                      <div key={item.status} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-2xl font-bold">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professionals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Profissionais</CardTitle>
                <CardDescription>Gerenciamento de técnicos cadastrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionals.map((prof) => (
                    <div key={prof.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <img
                            src={prof.foto}
                            alt={prof.nome}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{prof.nome}</h3>
                            <p className="text-sm text-muted-foreground">{prof.telefone}</p>
                            <p className="text-sm text-muted-foreground">{prof.email}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {prof.especialidades.map((esp) => (
                                <Badge key={esp} variant="secondary" className="text-xs">
                                  {esp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge variant={prof.ativo ? "default" : "secondary"}>
                          {prof.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">Leads Recebidos</p>
                          <p className="text-lg font-semibold">{prof.leadsRecebidos}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Convertidos</p>
                          <p className="text-lg font-semibold text-accent">{prof.leadsConvertidos}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tempo Médio</p>
                          <p className="text-lg font-semibold">{prof.tempoMedioResposta}min</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Leads</CardTitle>
                <CardDescription>Todos os leads recebidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum lead recebido ainda.
                    </p>
                  ) : (
                    leads.map((lead) => {
                      const professional = professionals.find(p => p.id === lead.profissionalDesignado);
                      return (
                        <div key={lead.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{lead.nomeCliente}</h3>
                              <p className="text-sm text-muted-foreground">
                                {format(lead.timestamp, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                            {getStatusBadge(lead.status)}
                          </div>
                          
                          <div className="grid gap-2 text-sm">
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">Telefone:</span>
                              <span className="font-medium">{lead.telefone}</span>
                            </div>
                            {lead.email && (
                              <div className="flex gap-2">
                                <span className="text-muted-foreground">Email:</span>
                                <span className="font-medium">{lead.email}</span>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">CEP:</span>
                              <span className="font-medium">{lead.cep}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">Aparelho:</span>
                              <span className="font-medium">{lead.tipoAparelho}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">Problema:</span>
                              <span className="font-medium">{lead.descricaoProblema}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground">Horário:</span>
                              <span className="font-medium">{lead.melhorHorario}</span>
                            </div>
                          </div>

                          {professional && (
                            <div className="mt-3 pt-3 border-t flex items-center gap-2">
                              <img
                                src={professional.foto}
                                alt={professional.nome}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-xs text-muted-foreground">Designado para</p>
                                <p className="text-sm font-medium">{professional.nome}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

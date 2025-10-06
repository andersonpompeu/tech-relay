import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Lead } from '@/contexts/LeadContext';

export const useSupabaseLeads = () => {
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      
      return data.map(l => ({
        id: l.id,
        timestamp: new Date(l.timestamp),
        nomeCliente: l.nome_cliente,
        telefone: l.telefone,
        email: l.email,
        cep: l.cep,
        tipoAparelho: l.tipo_aparelho,
        descricaoProblema: l.descricao_problema,
        melhorHorario: l.melhor_horario,
        profissionalDesignado: l.profissional_designado || '',
        status: l.status as Lead['status'],
      })) as Lead[];
    },
  });

  const addLead = useMutation({
    mutationFn: async (leadData: { 
      lead: Omit<Lead, 'id' | 'timestamp' | 'profissionalDesignado' | 'status'>;
      profissionalId: string;
    }) => {
      const { data, error } = await supabase
        .from('leads')
        .insert({
          nome_cliente: leadData.lead.nomeCliente,
          telefone: leadData.lead.telefone,
          email: leadData.lead.email,
          cep: leadData.lead.cep,
          tipo_aparelho: leadData.lead.tipoAparelho,
          descricao_problema: leadData.lead.descricaoProblema,
          melhor_horario: leadData.lead.melhorHorario,
          profissional_designado: leadData.profissionalId,
          status: 'pendente',
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        id: data.id,
        timestamp: new Date(data.timestamp),
        nomeCliente: data.nome_cliente,
        telefone: data.telefone,
        email: data.email,
        cep: data.cep,
        tipoAparelho: data.tipo_aparelho,
        descricaoProblema: data.descricao_problema,
        melhorHorario: data.melhor_horario,
        profissionalDesignado: data.profissional_designado || '',
        status: data.status as Lead['status'],
      } as Lead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const updateLeadStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Lead['status'] }) => {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  return {
    leads,
    isLoading,
    addLead: addLead.mutateAsync,
    updateLeadStatus: (id: string, status: Lead['status']) => 
      updateLeadStatus.mutateAsync({ id, status }),
  };
};

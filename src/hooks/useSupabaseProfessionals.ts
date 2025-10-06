import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Professional } from '@/contexts/LeadContext';

export const useSupabaseProfessionals = () => {
  const queryClient = useQueryClient();

  const { data: professionals = [], isLoading } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return data.map(p => ({
        id: p.id,
        nome: p.nome,
        telefone: p.telefone,
        email: p.email,
        foto: p.foto || '',
        especialidades: p.especialidades || [],
        ativo: p.ativo,
        leadsRecebidos: p.leads_recebidos,
        leadsConvertidos: p.leads_convertidos,
        tempoMedioResposta: p.tempo_medio_resposta,
      })) as Professional[];
    },
  });

  const addProfessional = useMutation({
    mutationFn: async (professional: Omit<Professional, 'id' | 'leadsRecebidos' | 'leadsConvertidos' | 'tempoMedioResposta'>) => {
      const { data, error } = await supabase
        .from('professionals')
        .insert({
          nome: professional.nome,
          telefone: professional.telefone,
          email: professional.email,
          foto: professional.foto,
          especialidades: professional.especialidades,
          ativo: professional.ativo,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });

  const updateProfessional = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Professional> }) => {
      const dbUpdates: any = {};
      if (updates.nome !== undefined) dbUpdates.nome = updates.nome;
      if (updates.telefone !== undefined) dbUpdates.telefone = updates.telefone;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.foto !== undefined) dbUpdates.foto = updates.foto;
      if (updates.especialidades !== undefined) dbUpdates.especialidades = updates.especialidades;
      if (updates.ativo !== undefined) dbUpdates.ativo = updates.ativo;
      if (updates.leadsRecebidos !== undefined) dbUpdates.leads_recebidos = updates.leadsRecebidos;
      if (updates.leadsConvertidos !== undefined) dbUpdates.leads_convertidos = updates.leadsConvertidos;
      if (updates.tempoMedioResposta !== undefined) dbUpdates.tempo_medio_resposta = updates.tempoMedioResposta;

      const { error } = await supabase
        .from('professionals')
        .update(dbUpdates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });

  const deleteProfessional = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('professionals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });

  return {
    professionals,
    isLoading,
    addProfessional: addProfessional.mutateAsync,
    updateProfessional: (id: string, updates: Partial<Professional>) => 
      updateProfessional.mutateAsync({ id, updates }),
    deleteProfessional: deleteProfessional.mutateAsync,
  };
};

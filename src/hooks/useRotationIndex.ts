import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useRotationIndex = () => {
  const queryClient = useQueryClient();

  const { data: currentIndex = 0 } = useQuery({
    queryKey: ['rotation-index'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_config')
        .select('valor')
        .eq('chave', 'rotation_index')
        .single();
      
      if (error) throw error;
      return parseInt(data.valor as string) || 0;
    },
  });

  const updateIndex = useMutation({
    mutationFn: async (newIndex: number) => {
      const { error } = await supabase
        .from('system_config')
        .update({ valor: newIndex.toString() })
        .eq('chave', 'rotation_index');
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rotation-index'] });
    },
  });

  const resetRotation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('system_config')
        .update({ valor: '0' })
        .eq('chave', 'rotation_index');
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rotation-index'] });
    },
  });

  return {
    currentIndex,
    updateIndex: updateIndex.mutateAsync,
    resetRotation: resetRotation.mutateAsync,
  };
};

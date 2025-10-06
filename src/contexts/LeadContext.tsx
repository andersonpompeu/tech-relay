import React, { createContext, useContext, ReactNode } from 'react';
import { useSupabaseProfessionals } from '@/hooks/useSupabaseProfessionals';
import { useSupabaseLeads } from '@/hooks/useSupabaseLeads';
import { useRotationIndex } from '@/hooks/useRotationIndex';

export interface Professional {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  foto: string;
  especialidades: string[];
  ativo: boolean;
  leadsRecebidos: number;
  leadsConvertidos: number;
  tempoMedioResposta: number;
}

export interface Lead {
  id: string;
  timestamp: Date;
  nomeCliente: string;
  telefone: string;
  email: string;
  cep: string;
  tipoAparelho: string;
  descricaoProblema: string;
  melhorHorario: string;
  profissionalDesignado: string;
  status: 'pendente' | 'em_atendimento' | 'convertido' | 'perdido';
}

interface LeadContextType {
  professionals: Professional[];
  leads: Lead[];
  currentIndex: number;
  isLoading: boolean;
  addProfessional: (professional: Omit<Professional, 'id' | 'leadsRecebidos' | 'leadsConvertidos' | 'tempoMedioResposta'>) => Promise<void>;
  updateProfessional: (id: string, updates: Partial<Professional>) => Promise<void>;
  deleteProfessional: (id: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'profissionalDesignado' | 'status'>) => Promise<Lead | null>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  resetRotation: () => Promise<void>;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    professionals, 
    isLoading: professionalsLoading,
    addProfessional: addProfessionalMutation,
    updateProfessional: updateProfessionalMutation,
    deleteProfessional: deleteProfessionalMutation,
  } = useSupabaseProfessionals();

  const {
    leads,
    isLoading: leadsLoading,
    addLead: addLeadMutation,
    updateLeadStatus: updateLeadStatusMutation,
  } = useSupabaseLeads();

  const {
    currentIndex,
    updateIndex,
    resetRotation: resetRotationMutation,
  } = useRotationIndex();

  const isLoading = professionalsLoading || leadsLoading;

  const addProfessional = async (professional: Omit<Professional, 'id' | 'leadsRecebidos' | 'leadsConvertidos' | 'tempoMedioResposta'>) => {
    await addProfessionalMutation(professional);
  };

  const updateProfessional = async (id: string, updates: Partial<Professional>) => {
    await updateProfessionalMutation(id, updates);
  };

  const deleteProfessional = async (id: string) => {
    await deleteProfessionalMutation(id);
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'timestamp' | 'profissionalDesignado' | 'status'>): Promise<Lead | null> => {
    const activeProfessionals = professionals.filter(p => p.ativo);
    
    if (activeProfessionals.length === 0) {
      return null;
    }

    const selectedProfessional = activeProfessionals[currentIndex % activeProfessionals.length];
    
    const newLead = await addLeadMutation({
      lead: leadData,
      profissionalId: selectedProfessional.id,
    });
    
    await updateProfessional(selectedProfessional.id, {
      leadsRecebidos: selectedProfessional.leadsRecebidos + 1,
    });

    await updateIndex((currentIndex + 1) % activeProfessionals.length);

    return newLead;
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    await updateLeadStatusMutation(id, status);
    
    if (status === 'convertido') {
      const lead = leads.find(l => l.id === id);
      if (lead) {
        const professional = professionals.find(p => p.id === lead.profissionalDesignado);
        if (professional) {
          await updateProfessional(professional.id, {
            leadsConvertidos: professional.leadsConvertidos + 1,
          });
        }
      }
    }
  };

  const resetRotation = async () => {
    await resetRotationMutation();
  };

  return (
    <LeadContext.Provider
      value={{
        professionals,
        leads,
        currentIndex,
        isLoading,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        addLead,
        updateLeadStatus,
        resetRotation,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

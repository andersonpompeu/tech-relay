import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  addProfessional: (professional: Omit<Professional, 'id' | 'leadsRecebidos' | 'leadsConvertidos' | 'tempoMedioResposta'>) => void;
  updateProfessional: (id: string, updates: Partial<Professional>) => void;
  deleteProfessional: (id: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'profissionalDesignado' | 'status'>) => Lead | null;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  resetRotation: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const initialProfessionals: Professional[] = [
  {
    id: '1',
    nome: 'João Silva',
    telefone: '11999887766',
    email: 'joao@email.com',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    especialidades: ['Geladeira', 'Freezer', 'Máquina de Lavar'],
    ativo: true,
    leadsRecebidos: 15,
    leadsConvertidos: 12,
    tempoMedioResposta: 8,
  },
  {
    id: '2',
    nome: 'Maria Santos',
    telefone: '11988776655',
    email: 'maria@email.com',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    especialidades: ['Fogão', 'Micro-ondas', 'Cooktop'],
    ativo: true,
    leadsRecebidos: 18,
    leadsConvertidos: 15,
    tempoMedioResposta: 6,
  },
  {
    id: '3',
    nome: 'Carlos Mendes',
    telefone: '11977665544',
    email: 'carlos@email.com',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    especialidades: ['Ar Condicionado', 'Lava-louças', 'Secadora'],
    ativo: true,
    leadsRecebidos: 12,
    leadsConvertidos: 10,
    tempoMedioResposta: 10,
  },
];

const initialLeads: Lead[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    nomeCliente: 'Ana Paula',
    telefone: '11966554433',
    email: 'ana@email.com',
    cep: '01310-100',
    tipoAparelho: 'Geladeira',
    descricaoProblema: 'Não está gelando',
    melhorHorario: 'Manhã (8h-12h)',
    profissionalDesignado: '1',
    status: 'em_atendimento',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    nomeCliente: 'Roberto Lima',
    telefone: '11955443322',
    email: 'roberto@email.com',
    cep: '04567-890',
    tipoAparelho: 'Fogão',
    descricaoProblema: 'Boca não acende',
    melhorHorario: 'Tarde (13h-17h)',
    profissionalDesignado: '2',
    status: 'convertido',
  },
];

export const LeadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addProfessional = (professional: Omit<Professional, 'id' | 'leadsRecebidos' | 'leadsConvertidos' | 'tempoMedioResposta'>) => {
    const newProfessional: Professional = {
      ...professional,
      id: Date.now().toString(),
      leadsRecebidos: 0,
      leadsConvertidos: 0,
      tempoMedioResposta: 0,
    };
    setProfessionals([...professionals, newProfessional]);
  };

  const updateProfessional = (id: string, updates: Partial<Professional>) => {
    setProfessionals(professionals.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProfessional = (id: string) => {
    setProfessionals(professionals.filter(p => p.id !== id));
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'timestamp' | 'profissionalDesignado' | 'status'>): Lead | null => {
    const activeProfessionals = professionals.filter(p => p.ativo);
    
    if (activeProfessionals.length === 0) {
      return null;
    }

    const selectedProfessional = activeProfessionals[currentIndex % activeProfessionals.length];
    
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      timestamp: new Date(),
      profissionalDesignado: selectedProfessional.id,
      status: 'pendente',
    };

    setLeads([newLead, ...leads]);
    
    setProfessionals(professionals.map(p => 
      p.id === selectedProfessional.id 
        ? { ...p, leadsRecebidos: p.leadsRecebidos + 1 }
        : p
    ));

    setCurrentIndex((currentIndex + 1) % activeProfessionals.length);

    return newLead;
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    
    if (status === 'convertido') {
      const lead = leads.find(l => l.id === id);
      if (lead) {
        setProfessionals(professionals.map(p => 
          p.id === lead.profissionalDesignado 
            ? { ...p, leadsConvertidos: p.leadsConvertidos + 1 }
            : p
        ));
      }
    }
  };

  const resetRotation = () => {
    setCurrentIndex(0);
  };

  return (
    <LeadContext.Provider
      value={{
        professionals,
        leads,
        currentIndex,
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

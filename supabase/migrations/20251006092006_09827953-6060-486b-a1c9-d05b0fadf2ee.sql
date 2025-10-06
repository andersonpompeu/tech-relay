-- Create professionals table
CREATE TABLE public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  foto TEXT,
  especialidades TEXT[] NOT NULL DEFAULT '{}',
  ativo BOOLEAN NOT NULL DEFAULT true,
  leads_recebidos INTEGER NOT NULL DEFAULT 0,
  leads_convertidos INTEGER NOT NULL DEFAULT 0,
  tempo_medio_resposta INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  nome_cliente TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  cep TEXT NOT NULL,
  tipo_aparelho TEXT NOT NULL,
  descricao_problema TEXT NOT NULL,
  melhor_horario TEXT NOT NULL,
  profissional_designado UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_atendimento', 'convertido', 'perdido')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead_history table for tracking status changes
CREATE TABLE public.lead_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  status_anterior TEXT,
  status_novo TEXT NOT NULL,
  observacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications_log table
CREATE TABLE public.notifications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  profissional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE NOT NULL,
  tipo_notificacao TEXT NOT NULL CHECK (tipo_notificacao IN ('whatsapp', 'email', 'sms')),
  status TEXT NOT NULL DEFAULT 'enviado' CHECK (status IN ('enviado', 'falhou', 'pendente')),
  detalhes JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system_config table for storing rotation index
CREATE TABLE public.system_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chave TEXT NOT NULL UNIQUE,
  valor JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial rotation index
INSERT INTO public.system_config (chave, valor) VALUES ('rotation_index', '0');

-- Enable RLS
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Public access policies (for now, will be restricted with auth later)
CREATE POLICY "Allow public read access to professionals" ON public.professionals FOR SELECT USING (true);
CREATE POLICY "Allow public insert to professionals" ON public.professionals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to professionals" ON public.professionals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to professionals" ON public.professionals FOR DELETE USING (true);

CREATE POLICY "Allow public read access to leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert to leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to leads" ON public.leads FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to leads" ON public.leads FOR DELETE USING (true);

CREATE POLICY "Allow public read access to lead_history" ON public.lead_history FOR SELECT USING (true);
CREATE POLICY "Allow public insert to lead_history" ON public.lead_history FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to notifications_log" ON public.notifications_log FOR SELECT USING (true);
CREATE POLICY "Allow public insert to notifications_log" ON public.notifications_log FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to system_config" ON public.system_config FOR SELECT USING (true);
CREATE POLICY "Allow public update to system_config" ON public.system_config FOR UPDATE USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_professionals_updated_at
BEFORE UPDATE ON public.professionals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_config_updated_at
BEFORE UPDATE ON public.system_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to log lead status changes
CREATE OR REPLACE FUNCTION public.log_lead_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.lead_history (lead_id, status_anterior, status_novo)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_lead_status_change_trigger
AFTER UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.log_lead_status_change();

-- Insert initial professionals data
INSERT INTO public.professionals (nome, telefone, email, foto, especialidades, ativo, leads_recebidos, leads_convertidos, tempo_medio_resposta) VALUES
('João Silva', '11999887766', 'joao@email.com', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', ARRAY['Geladeira', 'Freezer', 'Máquina de Lavar'], true, 15, 12, 8),
('Maria Santos', '11988776655', 'maria@email.com', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', ARRAY['Fogão', 'Micro-ondas', 'Cooktop'], true, 18, 15, 6),
('Carlos Mendes', '11977665544', 'carlos@email.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', ARRAY['Ar Condicionado', 'Lava-louças', 'Secadora'], true, 12, 10, 10);
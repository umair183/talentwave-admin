import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PayrollRecord {
  id: string;
  employee_id: string;
  pay_period_start: string;
  pay_period_end: string;
  gross_salary: number;
  deductions: number;
  net_salary: number;
  status: 'pending' | 'processed' | 'paid';
  processed_at: string | null;
  employees?: {
    first_name: string;
    last_name: string;
    employee_id: string;
  };
}

export const usePayroll = () => {
  return useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payroll')
        .select(`
          *,
          employees (
            first_name,
            last_name,
            employee_id
          )
        `)
        .order('pay_period_end', { ascending: false });

      if (error) throw error;
      return data as PayrollRecord[];
    },
  });
};

export const useCreatePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payroll: Omit<PayrollRecord, 'id' | 'employees'>) => {
      const { data, error } = await supabase
        .from('payroll')
        .insert([payroll])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll'] });
    },
  });
};
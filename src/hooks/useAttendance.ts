import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  hours_worked: number | null;
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes: string | null;
  employees?: {
    first_name: string;
    last_name: string;
    employee_id: string;
  };
}

export const useAttendance = () => {
  return useQuery({
    queryKey: ['attendance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select(`
          *,
          employees (
            first_name,
            last_name,
            employee_id
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as AttendanceRecord[];
    },
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attendance: Omit<AttendanceRecord, 'id' | 'employees'>) => {
      const { data, error } = await supabase
        .from('attendance')
        .insert([attendance])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
};
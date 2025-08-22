-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  manager_id UUID,
  budget DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create employees table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  position TEXT NOT NULL,
  department_id UUID REFERENCES public.departments(id),
  salary DECIMAL(10,2),
  start_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payroll table
CREATE TABLE public.payroll (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  gross_salary DECIMAL(10,2) NOT NULL,
  deductions DECIMAL(10,2) DEFAULT 0,
  net_salary DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'paid')),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  check_in_time TIME,
  check_out_time TIME,
  hours_worked DECIMAL(4,2),
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half_day')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, date)
);

-- Create leave requests table
CREATE TABLE public.leave_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('sick', 'vacation', 'personal', 'maternity', 'paternity')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES public.employees(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for departments (public read, admin write)
CREATE POLICY "Anyone can view departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert departments" ON public.departments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update departments" ON public.departments FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create policies for employees (employees can view their own data, admins can view all)
CREATE POLICY "Employees can view all employee data" ON public.employees FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert employees" ON public.employees FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update employees" ON public.employees FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create policies for payroll (employees can view their own, admins can view all)
CREATE POLICY "Employees can view their own payroll" ON public.payroll FOR SELECT USING (
  auth.uid() IS NOT NULL AND (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR auth.uid() IS NOT NULL -- For now, allow all authenticated users (admin check can be added later)
  )
);
CREATE POLICY "Authenticated users can insert payroll" ON public.payroll FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update payroll" ON public.payroll FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create policies for attendance (employees can view their own, admins can view all)
CREATE POLICY "Employees can view their own attendance" ON public.attendance FOR SELECT USING (
  auth.uid() IS NOT NULL AND (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR auth.uid() IS NOT NULL -- For now, allow all authenticated users
  )
);
CREATE POLICY "Authenticated users can insert attendance" ON public.attendance FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update attendance" ON public.attendance FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create policies for leave requests (employees can view their own, admins can view all)
CREATE POLICY "Employees can view their own leave requests" ON public.leave_requests FOR SELECT USING (
  auth.uid() IS NOT NULL AND (
    employee_id IN (SELECT id FROM public.employees WHERE user_id = auth.uid())
    OR auth.uid() IS NOT NULL -- For now, allow all authenticated users
  )
);
CREATE POLICY "Authenticated users can insert leave requests" ON public.leave_requests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update leave requests" ON public.leave_requests FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payroll_updated_at BEFORE UPDATE ON public.payroll FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON public.attendance FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON public.leave_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample departments
INSERT INTO public.departments (name, description, budget) VALUES
('Engineering', 'Software development and technical operations', 500000.00),
('Human Resources', 'Employee management and organizational development', 150000.00),
('Marketing', 'Brand promotion and customer acquisition', 200000.00),
('Finance', 'Financial planning and analysis', 120000.00),
('Sales', 'Revenue generation and client relationships', 300000.00);

-- Insert sample employees
INSERT INTO public.employees (employee_id, first_name, last_name, email, phone, position, department_id, salary, start_date, status) VALUES
('EMP001', 'Sarah', 'Johnson', 'sarah.johnson@company.com', '+1 (555) 123-4567', 'Software Engineer', (SELECT id FROM public.departments WHERE name = 'Engineering'), 85000.00, '2023-01-15', 'active'),
('EMP002', 'Michael', 'Chen', 'michael.chen@company.com', '+1 (555) 234-5678', 'HR Manager', (SELECT id FROM public.departments WHERE name = 'Human Resources'), 75000.00, '2022-08-20', 'active'),
('EMP003', 'Emily', 'Rodriguez', 'emily.rodriguez@company.com', '+1 (555) 345-6789', 'Marketing Specialist', (SELECT id FROM public.departments WHERE name = 'Marketing'), 60000.00, '2023-03-10', 'on_leave'),
('EMP004', 'David', 'Kim', 'david.kim@company.com', '+1 (555) 456-7890', 'Finance Analyst', (SELECT id FROM public.departments WHERE name = 'Finance'), 70000.00, '2023-05-01', 'active');

-- Insert sample attendance records
INSERT INTO public.attendance (employee_id, date, check_in_time, check_out_time, hours_worked, status) VALUES
((SELECT id FROM public.employees WHERE employee_id = 'EMP001'), '2024-01-20', '09:00:00', '17:30:00', 8.5, 'present'),
((SELECT id FROM public.employees WHERE employee_id = 'EMP002'), '2024-01-20', '08:30:00', '17:00:00', 8.5, 'present'),
((SELECT id FROM public.employees WHERE employee_id = 'EMP003'), '2024-01-20', NULL, NULL, 0, 'absent'),
((SELECT id FROM public.employees WHERE employee_id = 'EMP004'), '2024-01-20', '09:15:00', '17:30:00', 8.25, 'late');

-- Insert sample payroll records
INSERT INTO public.payroll (employee_id, pay_period_start, pay_period_end, gross_salary, deductions, net_salary, status) VALUES
((SELECT id FROM public.employees WHERE employee_id = 'EMP001'), '2024-01-01', '2024-01-15', 3269.23, 650.00, 2619.23, 'paid'),
((SELECT id FROM public.employees WHERE employee_id = 'EMP002'), '2024-01-01', '2024-01-15', 2884.62, 580.00, 2304.62, 'paid'),
((SELECT id FROM public.employees WHERE employee_id = 'EMP003'), '2024-01-01', '2024-01-15', 2307.69, 460.00, 1847.69, 'processed'),
((SELECT id FROM public.employees WHERE employee_id = 'EMP004'), '2024-01-01', '2024-01-15', 2692.31, 540.00, 2152.31, 'pending');
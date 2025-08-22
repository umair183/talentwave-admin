import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Download, FileText, TrendingUp } from "lucide-react";
import { useState } from "react";
import { usePayroll } from "@/hooks/usePayroll";

const Payroll = () => {
  const { data: payrollData, isLoading, error } = usePayroll();

  const totalGross = payrollData?.reduce((sum, item) => sum + item.gross_salary, 0) || 0;
  const totalDeductions = payrollData?.reduce((sum, item) => sum + item.deductions, 0) || 0;
  const totalNet = payrollData?.reduce((sum, item) => sum + item.net_salary, 0) || 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading payroll data...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-destructive">Error loading payroll data: {error.message}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-primary hover:bg-primary-hover">
              <FileText className="h-4 w-4 mr-2" />
              Generate Payroll
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">${totalGross.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Gross Salary</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-foreground">${totalDeductions.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Deductions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">${totalNet.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Net Salary</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Payroll Records</span>
            </CardTitle>
            <CardDescription>Recent payroll processing records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Pay Period</TableHead>
                  <TableHead className="text-right">Gross Salary</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData?.map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell className="font-medium">{payroll.employees?.employee_id}</TableCell>
                    <TableCell>{payroll.employees?.first_name} {payroll.employees?.last_name}</TableCell>
                    <TableCell>
                      {new Date(payroll.pay_period_start).toLocaleDateString()} - {new Date(payroll.pay_period_end).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">${payroll.gross_salary.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${payroll.deductions.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${payroll.net_salary.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          payroll.status === 'paid' ? 'default' : 
                          payroll.status === 'processed' ? 'secondary' : 'outline'
                        }
                      >
                        {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
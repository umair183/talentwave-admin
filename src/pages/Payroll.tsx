import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calculator, FileText, Download, TrendingUp, Users } from "lucide-react";

const Payroll = () => {
  const payrollSummary = {
    currentMonth: "March 2024",
    totalAmount: "$89,240",
    employeeCount: 248,
    status: "Processed",
    nextPayDate: "March 31, 2024"
  };

  const payrollHistory = [
    { month: "March 2024", amount: "$89,240", employees: 248, status: "Processed", date: "2024-03-15" },
    { month: "February 2024", amount: "$87,560", employees: 245, status: "Completed", date: "2024-02-15" },
    { month: "January 2024", amount: "$85,890", employees: 242, status: "Completed", date: "2024-01-15" },
    { month: "December 2023", amount: "$91,200", employees: 240, status: "Completed", date: "2023-12-15" },
  ];

  const departmentPayroll = [
    { department: "Engineering", employees: 45, amount: "$32,400", avgSalary: "$8,640" },
    { department: "Sales", employees: 28, amount: "$18,200", avgSalary: "$6,500" },
    { department: "Marketing", employees: 22, amount: "$14,300", avgSalary: "$6,500" },
    { department: "Operations", employees: 15, amount: "$9,750", avgSalary: "$6,500" },
    { department: "Finance", employees: 12, amount: "$8,580", avgSalary: "$7,150" },
    { department: "HR", employees: 8, amount: "$6,010", avgSalary: "$7,513" },
  ];

  const pendingApprovals = [
    { employee: "Sarah Johnson", type: "Overtime", amount: "$420", status: "Pending" },
    { employee: "Michael Chen", type: "Bonus", amount: "$1,500", status: "Pending" },
    { employee: "Emily Rodriguez", type: "Commission", amount: "$890", status: "Pending" },
  ];

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
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="bg-primary hover:bg-primary-hover">
              <Calculator className="h-4 w-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </div>

        {/* Current Payroll Summary */}
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>Current Payroll - {payrollSummary.currentMonth}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">{payrollSummary.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-2xl font-bold text-foreground">{payrollSummary.employeeCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="bg-success text-success-foreground">{payrollSummary.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Pay Date</p>
                <p className="text-lg font-semibold text-foreground">{payrollSummary.nextPayDate}</p>
              </div>
              <div className="flex items-center">
                <Button className="bg-accent hover:bg-accent/90">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Breakdown */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span>Department Breakdown</span>
              </CardTitle>
              <CardDescription>Payroll distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPayroll.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{dept.department}</p>
                      <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{dept.amount}</p>
                      <p className="text-sm text-muted-foreground">Avg: {dept.avgSalary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-warning" />
                <span>Pending Approvals</span>
              </CardTitle>
              <CardDescription>Items requiring approval before processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.employee}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <div className="text-right space-x-2">
                      <span className="font-semibold text-foreground">{item.amount}</span>
                      <Badge variant="outline" className="text-warning border-warning">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Approve All
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payroll History */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-secondary" />
              <span>Payroll History</span>
            </CardTitle>
            <CardDescription>Previous payroll periods and processing records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Period</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Employees</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollHistory.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground">{record.month}</td>
                      <td className="py-3 px-4 font-semibold text-primary">{record.amount}</td>
                      <td className="py-3 px-4 text-foreground">{record.employees}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-success text-success-foreground">
                          {record.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{record.date}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payroll Actions</CardTitle>
            <CardDescription>Common payroll management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-primary-light rounded-lg hover:bg-primary-light/80 transition-colors cursor-pointer">
              <Calculator className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Calculate Payroll</p>
                <p className="text-xs text-muted-foreground">Process current period</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-accent-light rounded-lg hover:bg-accent-light/80 transition-colors cursor-pointer">
              <Users className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-foreground">Employee Salaries</p>
                <p className="text-xs text-muted-foreground">Manage salary details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors cursor-pointer">
              <FileText className="h-6 w-6 text-secondary" />
              <div>
                <p className="font-medium text-foreground">Tax Reports</p>
                <p className="text-xs text-muted-foreground">Generate tax documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
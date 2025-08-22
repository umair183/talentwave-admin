import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, Download, TrendingUp, Calendar, Users, DollarSign } from "lucide-react";

const Reports = () => {
  const reportCategories = [
    {
      title: "Employee Reports",
      description: "Comprehensive employee data and analytics",
      icon: Users,
      reports: [
        { name: "Employee Directory", description: "Complete employee listing with details", status: "Available" },
        { name: "Performance Overview", description: "Employee performance metrics", status: "Available" },
        { name: "Training Records", description: "Employee training and certifications", status: "Available" },
      ]
    },
    {
      title: "Attendance Reports", 
      description: "Time tracking and attendance analytics",
      icon: Calendar,
      reports: [
        { name: "Monthly Attendance", description: "Detailed attendance breakdown by month", status: "Available" },
        { name: "Leave Analysis", description: "Leave patterns and utilization", status: "Available" },
        { name: "Overtime Report", description: "Overtime hours and compensation", status: "Processing" },
      ]
    },
    {
      title: "Payroll Reports",
      description: "Financial and compensation analytics", 
      icon: DollarSign,
      reports: [
        { name: "Salary Summary", description: "Department-wise salary distribution", status: "Available" },
        { name: "Tax Reports", description: "Tax deductions and compliance", status: "Available" },
        { name: "Benefits Analysis", description: "Employee benefits utilization", status: "Available" },
      ]
    }
  ];

  const recentReports = [
    { name: "Q1 2024 Employee Performance", type: "Performance", date: "2024-03-15", size: "2.4 MB", status: "Ready" },
    { name: "March 2024 Attendance Summary", type: "Attendance", date: "2024-03-10", size: "1.8 MB", status: "Ready" },
    { name: "Payroll Report - March", type: "Payroll", date: "2024-03-08", size: "3.2 MB", status: "Ready" },
    { name: "Department Analysis Q1", type: "Analytics", date: "2024-03-05", size: "1.5 MB", status: "Ready" },
  ];

  const quickStats = [
    { label: "Total Reports Generated", value: "127", trend: "+12%", icon: FileText },
    { label: "Average Processing Time", value: "2.3m", trend: "-8%", icon: TrendingUp },
    { label: "Reports This Month", value: "23", trend: "+15%", icon: BarChart3 },
    { label: "Download Count", value: "89", trend: "+22%", icon: Download },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button className="bg-primary hover:bg-primary-hover">
              <FileText className="h-4 w-4 mr-2" />
              Generate Custom Report
            </Button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-medium ${
                        stat.trend.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}>
                        {stat.trend}
                      </span>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-accent" />
              <span>Recent Reports</span>
            </CardTitle>
            <CardDescription>Recently generated reports available for download</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Report Name</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Generated</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{report.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{report.type}</Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{report.date}</td>
                      <td className="py-3 px-4 text-muted-foreground">{report.size}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-success text-success-foreground">{report.status}</Badge>
                      </td>
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

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reportCategories.map((category, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary-light rounded-lg">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.status === 'Available' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Report Builder */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span>Custom Report Builder</span>
            </CardTitle>
            <CardDescription>Create customized reports with specific parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Report Type</label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Employee Report</option>
                  <option>Attendance Report</option>
                  <option>Payroll Report</option>
                  <option>Department Report</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Department</label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>HR</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Format</label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                  <option>JSON</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Estimated processing time: 2-3 minutes
              </p>
              <Button className="bg-accent hover:bg-accent/90">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
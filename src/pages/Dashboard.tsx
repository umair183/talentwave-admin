import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, DollarSign, Clock, TrendingUp, AlertCircle, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "Active employees"
    },
    {
      title: "Departments",
      value: "8",
      change: "+1",
      changeType: "positive", 
      icon: Building,
      description: "Company departments"
    },
    {
      title: "Monthly Payroll",
      value: "$89,240",
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
      description: "This month's total"
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "-2%",
      changeType: "negative",
      icon: Clock,
      description: "Current month average"
    }
  ];

  const recentActivities = [
    { action: "New employee onboarded", employee: "Sarah Johnson", time: "2 hours ago" },
    { action: "Payroll processed", employee: "Accounting Dept", time: "4 hours ago" },
    { action: "Leave request approved", employee: "Michael Chen", time: "6 hours ago" },
    { action: "Department meeting scheduled", employee: "Engineering", time: "1 day ago" },
  ];

  const alerts = [
    { type: "warning", message: "3 employees have pending timesheet approvals", time: "Now" },
    { type: "info", message: "Monthly reports are ready for review", time: "1 hour ago" },
    { type: "success", message: "Payroll processing completed successfully", time: "2 hours ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest HR activities and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.employee}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                <span>Alerts & Notifications</span>
              </CardTitle>
              <CardDescription>Important updates requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 py-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'warning' ? 'bg-warning' : 
                    alert.type === 'info' ? 'bg-primary' : 'bg-success'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used HR management tools</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-primary-light rounded-lg hover:bg-primary-light/80 transition-colors cursor-pointer">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Add Employee</p>
                <p className="text-xs text-muted-foreground">Register new team member</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-accent-light rounded-lg hover:bg-accent-light/80 transition-colors cursor-pointer">
              <DollarSign className="h-6 w-6 text-accent" />
              <div>
                <p className="font-medium text-foreground">Process Payroll</p>
                <p className="text-xs text-muted-foreground">Run monthly payroll</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-secondary-light rounded-lg hover:bg-secondary-light/80 transition-colors cursor-pointer">
              <BarChart3 className="h-6 w-6 text-secondary" />
              <div>
                <p className="font-medium text-foreground">Generate Report</p>
                <p className="text-xs text-muted-foreground">Create analytics report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
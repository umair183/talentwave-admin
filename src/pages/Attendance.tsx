import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, UserCheck, UserX, Timer, Download } from "lucide-react";

const Attendance = () => {
  const todayStats = {
    present: 234,
    absent: 14,
    late: 8,
    onLeave: 12,
    total: 248
  };

  const recentActivity = [
    { employee: "Sarah Johnson", action: "Check In", time: "09:02 AM", status: "present" },
    { employee: "Michael Chen", action: "Check Out", time: "06:15 PM", status: "completed" },
    { employee: "Emily Rodriguez", action: "Check In", time: "09:45 AM", status: "late" },
    { employee: "David Kim", action: "Check In", time: "08:58 AM", status: "present" },
  ];

  const weeklyAttendance = [
    { day: "Monday", date: "Mar 18", present: 242, absent: 6, percentage: 97.6 },
    { day: "Tuesday", date: "Mar 19", present: 238, absent: 10, percentage: 96.0 },
    { day: "Wednesday", date: "Mar 20", present: 245, absent: 3, percentage: 98.8 },
    { day: "Thursday", date: "Mar 21", present: 234, absent: 14, percentage: 94.4 },
    { day: "Friday", date: "Mar 22", present: 0, absent: 0, percentage: 0 },
  ];

  const leaveRequests = [
    { employee: "Alice Cooper", type: "Sick Leave", dates: "Mar 25-26", status: "Pending", duration: "2 days" },
    { employee: "Bob Wilson", type: "Vacation", dates: "Apr 1-5", status: "Approved", duration: "5 days" },
    { employee: "Carol Davis", type: "Personal", dates: "Mar 28", status: "Pending", duration: "1 day" },
  ];

  const departmentAttendance = [
    { department: "Engineering", present: 42, total: 45, percentage: 93.3 },
    { department: "Sales", present: 26, total: 28, percentage: 92.9 },
    { department: "Marketing", present: 21, total: 22, percentage: 95.5 },
    { department: "HR", present: 8, total: 8, percentage: 100 },
    { department: "Finance", present: 11, total: 12, percentage: 91.7 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-primary hover:bg-primary-hover">
              <Calendar className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Today's Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="shadow-sm border-l-4 border-l-success">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-success">{todayStats.present}</p>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <UserX className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-destructive">{todayStats.absent}</p>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-warning">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Timer className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold text-warning">{todayStats.late}</p>
                  <p className="text-sm text-muted-foreground">Late Arrivals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-accent">{todayStats.onLeave}</p>
                  <p className="text-sm text-muted-foreground">On Leave</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">%</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round((todayStats.present / todayStats.total) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest check-ins and check-outs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{activity.employee}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{activity.time}</p>
                      <Badge variant={
                        activity.status === 'present' ? 'default' :
                        activity.status === 'late' ? 'destructive' : 'secondary'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leave Requests */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-accent" />
                <span>Leave Requests</span>
              </CardTitle>
              <CardDescription>Pending and upcoming leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{request.employee}</p>
                      <p className="text-sm text-muted-foreground">{request.type} • {request.dates}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={request.status === 'Approved' ? 'default' : 'outline'}>
                        {request.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{request.duration}</p>
                    </div>
                  </div>
                ))}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View All Requests
                  </Button>
                  <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                    Process Pending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Attendance */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <span>Weekly Attendance Overview</span>
            </CardTitle>
            <CardDescription>Attendance statistics for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Day</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Present</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Absent</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyAttendance.map((day, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{day.day}</td>
                      <td className="py-3 px-4 text-muted-foreground">{day.date}</td>
                      <td className="py-3 px-4 text-success font-semibold">{day.present}</td>
                      <td className="py-3 px-4 text-destructive font-semibold">{day.absent}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${day.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {day.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Department Attendance */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Department Attendance</CardTitle>
            <CardDescription>Today's attendance by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentAttendance.map((dept, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{dept.department}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {dept.present} / {dept.total} present
                    </span>
                    <span className="font-medium text-primary">{dept.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
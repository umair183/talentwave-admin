import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, UserPlus, Briefcase } from "lucide-react";

const Departments = () => {
  const departments = [
    {
      id: 1,
      name: "Engineering",
      description: "Software development and technical operations",
      manager: "Sarah Johnson",
      employeeCount: 45,
      budget: "$2,400,000",
      status: "Active"
    },
    {
      id: 2,
      name: "Human Resources",
      description: "Employee relations and organizational development",
      manager: "Michael Chen",
      employeeCount: 8,
      budget: "$180,000",
      status: "Active"
    },
    {
      id: 3,
      name: "Marketing",
      description: "Brand management and customer acquisition",
      manager: "Emily Rodriguez",
      employeeCount: 22,
      budget: "$850,000",
      status: "Active"
    },
    {
      id: 4,
      name: "Finance",
      description: "Financial planning and accounting operations",
      manager: "David Kim",
      employeeCount: 12,
      budget: "$320,000",
      status: "Active"
    },
    {
      id: 5,
      name: "Sales",
      description: "Revenue generation and client relationships",
      manager: "Lisa Wong",
      employeeCount: 28,
      budget: "$650,000",
      status: "Active"
    },
    {
      id: 6,
      name: "Operations",
      description: "Business operations and process optimization",
      manager: "James Wilson",
      employeeCount: 15,
      budget: "$420,000",
      status: "Restructuring"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                  <p className="text-sm text-muted-foreground">Total Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {departments.filter(dept => dept.status === 'Active').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-warning rounded-full flex items-center justify-center">
                  <span className="text-warning-foreground font-bold">$</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">$4.8M</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <Card key={department.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={department.status === 'Active' ? 'default' : 'secondary'}>
                    {department.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{department.name}</CardTitle>
                <CardDescription>{department.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Manager</p>
                    <p className="font-medium text-foreground">{department.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Employees</p>
                    <p className="font-medium text-foreground">{department.employeeCount}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Annual Budget</p>
                  <p className="text-lg font-semibold text-primary">{department.budget}</p>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Department Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Add Department</CardTitle>
            <CardDescription>Create a new department with basic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Department Name</label>
                <input 
                  type="text" 
                  placeholder="Enter department name"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Manager</label>
                <input 
                  type="text" 
                  placeholder="Assign department manager"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Annual Budget</label>
                <input 
                  type="text" 
                  placeholder="Enter budget amount"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea 
                placeholder="Enter department description and responsibilities"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                rows={3}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button className="bg-primary hover:bg-primary-hover">
                Create Department
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
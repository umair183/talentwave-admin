import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Plus, Users, DollarSign } from "lucide-react";
import { useState } from "react";
import { useDepartments, useCreateDepartment } from "@/hooks/useDepartments";
import { toast } from "sonner";

const Departments = () => {
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
    budget: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: departments, isLoading, error } = useDepartments();
  const createDepartmentMutation = useCreateDepartment();

  const handleCreateDepartment = async () => {
    if (!newDepartment.name) {
      toast.error("Please enter a department name");
      return;
    }

    try {
      await createDepartmentMutation.mutateAsync({
        name: newDepartment.name,
        description: newDepartment.description || null,
        budget: newDepartment.budget ? parseFloat(newDepartment.budget) : null,
        manager_id: null,
      });

      toast.success("Department created successfully");
      setIsDialogOpen(false);
      setNewDepartment({
        name: "",
        description: "",
        budget: ""
      });
    } catch (error) {
      toast.error("Failed to create department");
      console.error("Error creating department:", error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading departments...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-destructive">Error loading departments: {error.message}</div>
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
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-hover">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Enter the department details to create a new department.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter department name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter department description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Annual Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter annual budget"
                    value={newDepartment.budget}
                    onChange={(e) => setNewDepartment({...newDepartment, budget: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-primary hover:bg-primary-hover" 
                  onClick={handleCreateDepartment}
                  disabled={createDepartmentMutation.isPending}
                >
                  {createDepartmentMutation.isPending ? "Adding..." : "Add Department"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{departments?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    ${departments?.reduce((sum, dept) => sum + (dept.budget || 0), 0).toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {departments?.filter(dept => dept.budget && dept.budget > 0).length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Funded Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments?.map((department) => (
            <Card key={department.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline">Department</Badge>
                </div>
                <CardTitle className="text-lg">{department.name}</CardTitle>
                <CardDescription>{department.description || 'No description available'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Budget:</span>
                  </div>
                  <span className="text-sm font-medium">
                    {department.budget ? `$${department.budget.toLocaleString()}` : 'Not set'}
                  </span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
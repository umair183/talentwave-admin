import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Shield, BarChart3, Clock, DollarSign } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Comprehensive employee database with profiles, contact info, and role management."
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring with check-in/check-out functionality."
    },
    {
      icon: DollarSign,
      title: "Payroll Management",
      description: "Automated payroll processing with salary calculations and payment tracking."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Detailed insights and reports on workforce performance and trends."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">HRCorp</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/employee-portal">
              <Button variant="outline">Employee Portal</Button>
            </Link>
            <Link to="/admin-portal">
              <Button>Admin Portal</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-light to-accent-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Modern HR Management
            <span className="block text-primary">Made Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your human resources operations with our comprehensive platform. 
            Manage employees, track attendance, process payroll, and generate insights - all in one place.
          </p>
          <div className="space-x-4">
            <Link to="/admin-portal">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/employee-portal">
              <Button size="lg" variant="outline">
                Employee Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for HR Success
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools necessary to manage your workforce efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your HR Operations?
          </h4>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust our platform for their human resources management.
          </p>
          <Link to="/admin-portal">
            <Button size="lg" variant="secondary" className="bg-card text-primary hover:bg-muted">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-6 w-6 text-secondary-foreground" />
            <span className="text-lg font-semibold text-secondary-foreground">HRCorp</span>
          </div>
          <p className="text-secondary-foreground/80">
            © 2024 HRCorp. Professional HR Management Solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
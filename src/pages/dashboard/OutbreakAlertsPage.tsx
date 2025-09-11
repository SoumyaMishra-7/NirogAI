import { AlertCircle, ArrowLeft, MapPin, Thermometer, Users, Activity, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock data for outbreak alerts
const outbreakAlerts = [
  {
    id: 1,
    title: "Influenza Outbreak",
    location: "New Delhi",
    severity: "High",
    cases: 124,
    status: "Active",
    lastUpdated: "2 hours ago",
    description: "Increased cases of seasonal influenza reported in the area. Health authorities are monitoring the situation closely.",
    recommendations: [
      "Get vaccinated if you haven't already",
      "Practice good hand hygiene",
      "Wear masks in crowded places",
      "Stay home if feeling unwell"
    ]
  },
  {
    id: 2,
    title: "Dengue Alert",
    location: "Mumbai",
    severity: "Medium",
    cases: 87,
    status: "Monitoring",
    lastUpdated: "1 day ago",
    description: "Rising number of dengue cases reported in the region. Authorities have initiated mosquito control measures.",
    recommendations: [
      "Use mosquito repellents",
      "Eliminate standing water",
      "Wear long-sleeved clothing",
      "Use mosquito nets while sleeping"
    ]
  },
  {
    id: 3,
    title: "Heat Wave Warning",
    location: "Rajasthan",
    severity: "High",
    cases: 0,
    status: "Active",
    lastUpdated: "5 hours ago",
    description: "Extreme heat wave conditions expected in the coming days. Temperatures may reach up to 48°C.",
    recommendations: [
      "Stay hydrated",
      "Avoid direct sunlight during peak hours",
      "Wear light-colored, loose clothing",
      "Check on elderly and vulnerable individuals"
    ]
  }
];

export default function OutbreakAlertsPage() {
  const navigate = useNavigate();

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <Badge variant="destructive" className="ml-2">High</Badge>;
      case 'medium':
        return <Badge variant="warning" className="ml-2">Medium</Badge>;
      default:
        return <Badge variant="outline" className="ml-2">Low</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 ml-2">Active</Badge>;
      case 'monitoring':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 ml-2">Monitoring</Badge>;
      default:
        return <Badge variant="outline" className="ml-2">Resolved</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold tracking-tight mt-2">Outbreak Alerts</h1>
          <p className="text-muted-foreground">Stay informed about current health alerts and outbreaks in your area</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Safety Tips
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {outbreakAlerts.map((alert) => (
          <Card key={alert.id} className="border-l-4 border-red-500 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <CardTitle className="text-xl">{alert.title}</CardTitle>
                  {getSeverityBadge(alert.severity)}
                  {getStatusBadge(alert.status)}
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {alert.lastUpdated}
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {alert.location}
                <span className="mx-2">•</span>
                <Users className="h-4 w-4 mr-1" />
                {alert.cases} cases reported
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <p className="text-foreground">{alert.description}</p>
                  
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-amber-500" />
                      Safety Recommendations
                    </h3>
                    <ul className="space-y-2 pl-6 list-disc">
                      {alert.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Affected Areas</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                        Main City Area
                      </li>
                      <li className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                        Suburban Regions
                      </li>
                      <li className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                        Nearby Villages
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Latest Updates</h3>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <p className="font-medium">Case Update</p>
                        <p className="text-muted-foreground text-xs">2 hours ago</p>
                        <p className="mt-1">+15 new cases reported in the last 24 hours</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Response Update</p>
                        <p className="text-muted-foreground text-xs">1 day ago</p>
                        <p className="mt-1">Mobile testing units deployed to affected areas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t flex justify-end">
                <Button variant="outline" className="mr-2">
                  <Activity className="h-4 w-4 mr-2" />
                  Track This Outbreak
                </Button>
                <Button>
                  Share Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

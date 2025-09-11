import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Calendar, User, Clock, Activity, Stethoscope, FileText, Pill, Bell, Search, Plus, Filter, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Appointment = {
  id: number;
  patientName: string;
  time: string;
  type: 'checkup' | 'followup' | 'emergency' | 'consultation';
  status: 'upcoming' | 'completed' | 'cancelled';
  avatar: string;
};

type Patient = {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  nextAppointment: string;
  avatar: string;
};

type Prescription = {
  id: number;
  patientName: string;
  date: string;
  medicine: string;
  dosage: string;
  status: 'active' | 'completed' | 'expired';
};

export default function DoctorDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Get the doctor's name from Clerk user data
  const doctorName = user?.fullName || user?.username || 'Doctor';

  const upcomingAppointments: Appointment[] = [
    { id: 1, patientName: 'Ravi Kumar', time: '10:00 AM', type: 'followup', status: 'upcoming', avatar: '/avatars/1.jpg' },
    { id: 2, patientName: 'Priya Sharma', time: '11:30 AM', type: 'checkup', status: 'upcoming', avatar: '/avatars/2.jpg' },
    { id: 3, patientName: 'Amit Patel', time: '02:15 PM', type: 'consultation', status: 'upcoming', avatar: '/avatars/3.jpg' },
  ];

  const patients: Patient[] = [
    { id: 1, name: 'Ravi Kumar', age: 35, lastVisit: '2025-09-01', condition: 'Diabetes', nextAppointment: '2025-10-01', avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Priya Sharma', age: 28, lastVisit: '2025-09-05', condition: 'Hypertension', nextAppointment: '2025-10-05', avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Amit Patel', age: 45, lastVisit: '2025-09-10', condition: 'Asthma', nextAppointment: '2025-10-10', avatar: '/avatars/3.jpg' },
  ];

  const recentPrescriptions: Prescription[] = [
    { id: 1, patientName: 'Ravi Kumar', date: '2025-09-01', medicine: 'Metformin', dosage: '500mg', status: 'active' },
    { id: 2, patientName: 'Priya Sharma', date: '2025-09-05', medicine: 'Lisinopril', dosage: '10mg', status: 'active' },
    { id: 3, patientName: 'Amit Patel', date: '2025-09-10', medicine: 'Albuterol', dosage: '90mcg', status: 'active' },
  ];

  const performanceData = [
    { name: 'Completed', value: 75 },
    { name: 'Missed', value: 15 },
    { name: 'Rescheduled', value: 10 },
  ];

  const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'followup':
        return 'bg-blue-100 text-blue-800';
      case 'consultation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. {doctorName.split(' ')[0]}</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients, appointments..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">3</span>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-2xl">
          <TabsTrigger value="overview" onClick={() => setActiveTab('overview')}>
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="appointments" onClick={() => setActiveTab('appointments')}>
            <Calendar className="h-4 w-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="patients" onClick={() => setActiveTab('patients')}>
            <User className="h-4 w-4 mr-2" />
            Patients
          </TabsTrigger>
          <TabsTrigger value="prescriptions" onClick={() => setActiveTab('prescriptions')}>
            <FileText className="h-4 w-4 mr-2" />
            Prescriptions
          </TabsTrigger>
          <TabsTrigger value="reports" onClick={() => setActiveTab('reports')}>
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Today's Appointments</CardTitle>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-gray-500">+2 from yesterday</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-gray-500">+12 this month</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Prescriptions</CardTitle>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Pill className="h-5 w-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-gray-500">+5 this week</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Available Slots</CardTitle>
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-gray-500">2 slots today</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Upcoming Appointments</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appt) => (
                      <div key={appt.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={appt.avatar} alt={appt.patientName} />
                          <AvatarFallback>{appt.patientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{appt.patientName}</h4>
                            <Badge variant="outline" className={getAppointmentTypeColor(appt.type)}>
                              {appt.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{appt.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Stats</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-40 w-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={performanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2 w-full">
                    {performanceData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Patients */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Patients</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" className="text-xs">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={patient.avatar} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {patient.name}
                          </div>
                        </TableCell>
                        <TableCell>{patient.age} years</TableCell>
                        <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {patient.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(patient.nextAppointment).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'appointments' && (
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Appointments</CardTitle>
                <p className="text-sm text-gray-500">Manage your appointments and schedule</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 w-full"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={appt.avatar} alt={appt.patientName} />
                            <AvatarFallback>{appt.patientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {appt.patientName}
                        </div>
                      </TableCell>
                      <TableCell>{appt.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getAppointmentTypeColor(appt.type)}>
                          {appt.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {appt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'prescriptions' && (
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <p className="text-sm text-gray-500">Manage patient prescriptions and medications</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Prescription
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPrescriptions.map((rx) => (
                    <TableRow key={rx.id}>
                      <TableCell className="font-medium">{rx.patientName}</TableCell>
                      <TableCell>{new Date(rx.date).toLocaleDateString()}</TableCell>
                      <TableCell>{rx.medicine}</TableCell>
                      <TableCell>{rx.dosage}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {rx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </Tabs>
    </div>
  );
}

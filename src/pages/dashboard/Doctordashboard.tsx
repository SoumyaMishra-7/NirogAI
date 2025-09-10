import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Calendar, User, Clock, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DoctorDashboard() {
  const [patients] = useState([
    { id: 1, name: "Ravi Kumar", age: 35, lastVisit: "2025-09-01", condition: "Diabetes" },
    { id: 2, name: "Priya Sharma", age: 28, lastVisit: "2025-09-05", condition: "Fever" },
  ]);

  const performanceData = [
    { day: "Mon", completed: 8, missed: 2 },
    { day: "Tue", completed: 10, missed: 1 },
    { day: "Wed", completed: 7, missed: 3 },
    { day: "Thu", completed: 12, missed: 0 },
    { day: "Fri", completed: 9, missed: 1 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Calendar size={18}/> Daily Appointments</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">14</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><User size={18}/> Patients</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">52</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock size={18}/> Missed Visits</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">3</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Activity size={18}/> Available Slots</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">6</p></CardContent>
        </Card>
      </div>

      {/* Clinic Performance Chart */}
      <Card>
        <CardHeader><CardTitle>Weekly Performance</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#22c55e" />
              <Bar dataKey="missed" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Patient List */}
      <Card>
        <CardHeader><CardTitle>Patient List</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.lastVisit}</TableCell>
                  <TableCell>{p.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Time Slot Management */}
      <Card>
        <CardHeader><CardTitle>Time Slot Management</CardTitle></CardHeader>
        <CardContent>
          <Button className="mr-2">Add Slot</Button>
          <Button variant="outline">Edit Slots</Button>
        </CardContent>
      </Card>
    </div>
  );
}

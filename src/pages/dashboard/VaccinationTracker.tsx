import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Sample vaccines data
const vaccines = [
  {
    id: 1,
    name: "COVID-19 Vaccine",
    description: "Stay protected from COVID-19",
    progress: 80,
    category: "Adults",
  },
  {
    id: 2,
    name: "Polio Vaccine",
    description: "Essential for children under 5",
    progress: 40,
    category: "Children",
  },
  {
    id: 3,
    name: "Tetanus Vaccine",
    description: "Important for women during pregnancy",
    progress: 60,
    category: "Women",
  },
  {
    id: 4,
    name: "Hepatitis B Vaccine",
    description: "Protects against Hepatitis B",
    progress: 20,
    category: "Adults",
  },
];

export default function VaccinationTracker() {
  const [filter, setFilter] = useState("All");

  const filteredVaccines =
    filter === "All"
      ? vaccines
      : vaccines.filter((vaccine) => vaccine.category === filter);

  return (
    <div className="p-6">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {["All", "Adults", "Children", "Women"].map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Vaccine Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVaccines.map((vaccine) => (
          <Card key={vaccine.id} className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle>{vaccine.name}</CardTitle>
              <p className="text-sm text-gray-500">{vaccine.description}</p>
            </CardHeader>
            <CardContent>
              <Progress value={vaccine.progress} className="w-full mb-2" />
              <p className="text-sm text-gray-600">
                {vaccine.progress}% Completed
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {vaccine.category}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

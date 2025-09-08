"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Symptom Data (with conditions, tips, warnings)
const symptomsData: Record<
  string,
  { conditions: string[]; tips: string[]; warning: string }
> = {
  Fever: {
    conditions: ["Flu", "Common Cold", "Viral Infection"],
    tips: ["Drink plenty of fluids", "Rest well", "Take paracetamol if needed"],
    warning: "Seek medical help if fever lasts >3 days or above 102°F",
  },
  Cough: {
    conditions: ["Bronchitis", "Asthma", "Allergy"],
    tips: ["Stay hydrated", "Avoid smoke/dust", "Use warm fluids"],
    warning: "Consult a doctor if cough lasts >2 weeks or has blood",
  },
  Headache: {
    conditions: ["Migraine", "Tension Headache", "Dehydration"],
    tips: ["Rest in a dark room", "Stay hydrated", "Use mild pain relievers"],
    warning: "Seek urgent help if sudden severe headache occurs",
  },
  Fatigue: {
    conditions: ["Anemia", "Thyroid Issues", "Lifestyle Stress"],
    tips: ["Get enough sleep", "Eat a balanced diet", "Exercise lightly"],
    warning: "See a doctor if fatigue persists for weeks",
  },
  "Sore Throat": {
    conditions: ["Tonsillitis", "Viral Pharyngitis", "Strep Throat"],
    tips: ["Gargle with warm salt water", "Drink warm fluids", "Use throat lozenges"],
    warning: "Seek care if throat pain is severe or with high fever",
  },
  Nausea: {
    conditions: ["Food Poisoning", "Gastritis", "Motion Sickness"],
    tips: ["Eat bland food", "Drink ginger tea", "Stay hydrated"],
    warning: "Go to ER if nausea is with chest pain or dehydration",
  },
  "Chest Pain": {
    conditions: ["Heart Disease", "Muscle Strain", "Acid Reflux"],
    tips: ["Rest", "Avoid heavy meals", "Stay calm and monitor"],
    warning: "Seek emergency help immediately if severe chest pain occurs",
  },
};

export default function SymptomsChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="p-8 space-y-8">
      {/* Big Header */}
      <Card className="shadow-xl border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-700">
            Symptom Checker
          </CardTitle>
          <p className="text-gray-600">
            Select your symptoms below to get <b>Possible Conditions</b>,{" "}
            <b>Self-Care Tips</b>, and <b>Warnings</b>.  
            ⚠️ This tool is only for guidance and does not replace medical advice.
          </p>
        </CardHeader>
      </Card>

      {/* Symptom Selection */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Choose Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.keys(symptomsData).map((symptom) => (
            <div key={symptom} className="flex items-center space-x-2">
              <Checkbox
                id={symptom}
                checked={selectedSymptoms.includes(symptom)}
                onCheckedChange={() => toggleSymptom(symptom)}
              />
              <label
                htmlFor={symptom}
                className="text-sm font-medium leading-none"
              >
                {symptom}
              </label>
            </div>
          ))}

          <Button
            onClick={() => setShowResults(true)}
            className="mt-4 w-full bg-blue-600 text-white"
          >
            Run Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <Card className="shadow-lg border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">
              Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {selectedSymptoms.length === 0 ? (
              <p className="text-gray-500">⚠️ No symptoms selected.</p>
            ) : (
              selectedSymptoms.map((symptom) => {
                const data = symptomsData[symptom];
                return (
                  <div key={symptom} className="border-b pb-6">
                    <h3 className="text-lg font-bold text-blue-600 mb-2">
                      {symptom}
                    </h3>

                    {/* Possible Conditions */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-700">
                        Possible Conditions
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        {data.conditions.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Self Care Tips */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-700">
                        Self-Care Tips
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        {data.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Warning */}
                    <div>
                      <h4 className="font-semibold text-red-600">Warning</h4>
                      <p className="text-sm text-red-500">{data.warning}</p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

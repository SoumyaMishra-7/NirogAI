import React, { useState, useEffect } from "react";
import { Search, Calendar, Clock, AlertTriangle, CheckCircle, PlusCircle, Bell } from 'lucide-react';

const VACCINE_DATA = [
  {
    category: "Childhood Immunization",
    description: "Essential vaccines for infants and children to protect against serious diseases",
    vaccines: [
      {
        name: "BCG",
        fullName: "Bacille Calmette-Guérin",
        schedule: "At birth",
        sideEffects: "Mild swelling or redness at injection site, mild fever",
        importance: "High",
        preventableDiseases: ["Tuberculosis"],
        nextDose: "Single dose"
      },
      {
        name: "HepB",
        fullName: "Hepatitis B",
        schedule: "At birth, 6-18 months",
        sideEffects: "Soreness at injection site, mild fever",
        importance: "High",
        preventableDiseases: ["Hepatitis B"],
        nextDose: "3-dose series"
      },
      {
        name: "DTaP",
        fullName: "Diphtheria, Tetanus, Pertussis",
        schedule: "2, 4, 6, 15-18 months, 4-6 years",
        sideEffects: "Fever, fussiness, tiredness, loss of appetite",
        importance: "High",
        preventableDiseases: ["Diphtheria", "Tetanus", "Pertussis (Whooping Cough)"],
        nextDose: "5-dose series"
      },
      {
        name: "IPV",
        fullName: "Inactivated Poliovirus",
        schedule: "2, 4, 6-18 months, 4-6 years",
        sideEffects: "Soreness at injection site",
        importance: "High",
        preventableDiseases: ["Polio"],
        nextDose: "4-dose series"
      }
    ]
  },
  {
    category: "Adolescent Vaccines",
    description: "Recommended immunizations for preteens and teenagers",
    vaccines: [
      {
        name: "HPV",
        fullName: "Human Papillomavirus",
        schedule: "11-12 years (2 doses)",
        sideEffects: "Pain, redness, or swelling in arm",
        importance: "High",
        preventableDiseases: ["HPV-related cancers"],
        nextDose: "2-3 dose series"
      },
      {
        name: "MenACWY",
        fullName: "Meningococcal Conjugate",
        schedule: "11-12 years, 16 years (booster)",
        sideEffects: "Pain, redness at injection site, fever",
        importance: "High",
        preventableDiseases: ["Meningococcal disease"],
        nextDose: "2 doses"
      },
      {
        name: "Tdap",
        fullName: "Tetanus, Diphtheria, Pertussis",
        schedule: "11-12 years",
        sideEffects: "Pain, redness, or swelling at injection site",
        importance: "High",
        preventableDiseases: ["Tetanus", "Diphtheria", "Pertussis"],
        nextDose: "Every 10 years"
      }
    ]
  },
  {
    category: "Adult Vaccines",
    description: "Important immunizations for adults based on age, health conditions, and other factors",
    vaccines: [
      {
        name: "Influenza",
        fullName: "Seasonal Flu Vaccine",
        schedule: "Yearly",
        sideEffects: "Soreness, headache, fever, muscle aches",
        importance: "High",
        preventableDiseases: ["Influenza"],
        nextDose: "Annual"
      },
      {
        name: "Shingrix",
        fullName: "Shingles Vaccine",
        schedule: "50+ years (2 doses)",
        sideEffects: "Pain, redness, swelling at injection site",
        importance: "Medium",
        preventableDiseases: ["Shingles"],
        nextDose: "2-dose series"
      },
      {
        name: "Pneumococcal",
        fullName: "Pneumococcal Polysaccharide",
        schedule: "65+ years or high-risk adults",
        sideEffects: "Pain, redness at injection site, fever",
        importance: "High",
        preventableDiseases: ["Pneumococcal disease"],
        nextDose: "1-2 doses"
      }
    ]
  },
  {
    category: "Travel Vaccines",
    description: "Recommended immunizations for international travelers",
    vaccines: [
      {
        name: "Yellow Fever",
        fullName: "Yellow Fever Vaccine",
        schedule: "10 days before travel to endemic areas",
        sideEffects: "Headache, muscle aches, fever",
        importance: "High for travel",
        preventableDiseases: ["Yellow Fever"],
        nextDose: "Every 10 years"
      },
      {
        name: "Typhoid",
        fullName: "Typhoid Vaccine",
        schedule: "2 weeks before travel",
        sideEffects: "Fever, headache, abdominal pain",
        importance: "Medium for travel",
        preventableDiseases: ["Typhoid fever"],
        nextDose: "Every 2 years"
      },
      {
        name: "Hepatitis A",
        fullName: "Hepatitis A Vaccine",
        schedule: "2-dose series (6-12 months apart)",
        sideEffects: "Soreness at injection site, headache",
        importance: "High for travel",
        preventableDiseases: ["Hepatitis A"],
        nextDose: "2-dose series"
      }
    ]
  }
];

type VaccineRecord = {
  name: string;
  date: string;
  nextDue: string;
  status: 'upcoming' | 'overdue' | 'completed';
};

export default function VaccineInfo() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState<VaccineRecord[]>([]);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState<Omit<VaccineRecord, 'status'>>({ 
    name: '', 
    date: new Date().toISOString().split('T')[0],
    nextDue: ''
  });

  useEffect(() => {
    // Load saved records from localStorage
    const savedRecords = localStorage.getItem('vaccineRecords');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const saveRecords = (updatedRecords: VaccineRecord[]) => {
    setRecords(updatedRecords);
    localStorage.setItem('vaccineRecords', JSON.stringify(updatedRecords));
  };

  const filteredVaccines = VACCINE_DATA.flatMap(category => 
    category.vaccines.filter(vaccine => 
      (activeTab === 'all' || category.category.toLowerCase().includes(activeTab)) &&
      (vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       vaccine.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       vaccine.preventableDiseases.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())))
    )
  );

  const addRecord = () => {
    const today = new Date();
    const nextDueDate = new Date(newRecord.nextDue);
    const status: 'upcoming' | 'overdue' | 'completed' = 
      nextDueDate < today ? 'overdue' : 'upcoming';
    
    const updatedRecords = [
      ...records,
      {
        ...newRecord,
        status,
        nextDue: newRecord.nextDue || 'N/A'
      }
    ];
    
    saveRecords(updatedRecords);
    setNewRecord({ name: '', date: new Date().toISOString().split('T')[0], nextDue: '' });
    setShowAddRecord(false);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'upcoming':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Vaccine Information Center</h1>
            <p className="text-gray-600">Comprehensive guide to immunization schedules and records</p>
          </div>
          <button 
            onClick={() => setShowAddRecord(true)}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Vaccine Record
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vaccines by name or disease..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Vaccines
            </button>
            {VACCINE_DATA.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveTab(category.category.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === category.category.toLowerCase() ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.category.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Upcoming Vaccines Alert */}
          {records.filter(r => r.status === 'upcoming' || r.status === 'overdue').length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    {records.filter(r => r.status === 'overdue').length > 0 
                      ? 'You have overdue vaccines!'
                      : 'Upcoming vaccines'}
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {records
                        .filter(r => r.status === 'overdue' || r.status === 'upcoming')
                        .sort((a, b) => a.status === 'overdue' ? -1 : 1)
                        .map((record, idx) => (
                          <li key={idx}>
                            {record.name} - {record.status === 'overdue' ? 'Overdue' : `Due on ${record.nextDue}`}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vaccine Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVaccines.length > 0 ? (
            filteredVaccines.map((vaccine) => (
              <div key={vaccine.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{vaccine.name}</h3>
                      <p className="text-sm text-indigo-600">{vaccine.fullName}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {vaccine.importance} Priority
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Schedule</p>
                        <p className="text-sm text-gray-600">{vaccine.schedule}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Next Dose</p>
                        <p className="text-sm text-gray-600">{vaccine.nextDose}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Prevents</p>
                        <p className="text-sm text-gray-600">{vaccine.preventableDiseases.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-1">Common Side Effects</p>
                      <p className="text-sm text-gray-600">{vaccine.sideEffects}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <button 
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
                      onClick={() => {
                        setNewRecord({
                          name: vaccine.name,
                          date: new Date().toISOString().split('T')[0],
                          nextDue: ''
                        });
                        setShowAddRecord(true);
                      }}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add to Records
                    </button>
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No vaccines found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Vaccine Records Section */}
        {records.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Vaccine Records</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vaccine
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Administered
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Due
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {records.map((record, idx) => (
                      <tr key={idx} className={record.status === 'overdue' ? 'bg-red-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{record.nextDue}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Vaccine Record</h3>
                <button 
                  onClick={() => setShowAddRecord(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="vaccineName" className="block text-sm font-medium text-gray-700">Vaccine Name</label>
                  <input
                    type="text"
                    id="vaccineName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({...newRecord, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="dateAdministered" className="block text-sm font-medium text-gray-700">Date Administered</label>
                  <input
                    type="date"
                    id="dateAdministered"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="nextDue" className="block text-sm font-medium text-gray-700">Next Due Date (Optional)</label>
                  <input
                    type="date"
                    id="nextDue"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={newRecord.nextDue}
                    onChange={(e) => setNewRecord({...newRecord, nextDue: e.target.value})}
                  />
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddRecord(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={addRecord}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

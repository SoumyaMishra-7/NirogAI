import React, { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface Vaccine {
  id: number;
  name: string;
  description: string;
  status: 'due' | 'completed' | 'pending';
  dueDate: string;
  completedDate: string | null;
}

interface Hospital {
  id: number;
  name: string;
  address: string;
  available: boolean;
}

interface AppointmentData {
  vaccineId: number;
  date: string;
  time: string;
  hospitalId: number;
  gender: string;
}

const VaccinationTracker: React.FC = () => {
  // State management
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('female');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'upcoming'>('all');

  // API base URL
  const API_BASE_URL = 'http://localhost:3000/api';

  // Time slots
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  // Fetch vaccines from backend
  const fetchVaccines = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccines`);
      const data = await response.json();
      setVaccines(data);
    } catch (error) {
      console.error('Error fetching vaccines:', error);
      // Fallback to default data if API fails
      setVaccines([
        { 
          id: 1, 
          name: "Tetanus Booster", 
          description: "Protects against tetanus infections", 
          status: "due",
          dueDate: "Before Jun 2024",
          completedDate: null
        },
        { 
          id: 2, 
          name: "COVID-19 Vaccine", 
          description: "Protects against COVID-19", 
          status: "completed",
          dueDate: "Due: Jan 2023",
          completedDate: "Completed: Jan 15, 2023"
        },
        { 
          id: 3, 
          name: "Flu Shot", 
          description: "Annual influenza vaccine", 
          status: "completed",
          dueDate: "Due: Oct 2023",
          completedDate: "Completed: Oct 10, 2023"
        },
        { 
          id: 4, 
          name: "Hepatitis B", 
          description: "Protects against hepatitis B virus", 
          status: "pending",
          dueDate: "Due: Aug 2024",
          completedDate: null
        },
        { 
          id: 5, 
          name: "MMR Vaccine", 
          description: "Measles, mumps, and rubella vaccine", 
          status: "due",
          dueDate: "Due: Dec 2023",
          completedDate: null
        }
      ]);
    }
  };

  // Fetch hospitals from backend
  const fetchHospitals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals`);
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      // Fallback to default data if API fails
      setHospitals([
        { id: 1, name: "Manipal Hospital Vijayawada", address: "Vijayawada, Andhra Pradesh", available: true },
        { id: 2, name: "AIIMS Hospital, Mangalagiri", address: "Mangalagiri, Andhra Pradesh", available: true },
        { id: 3, name: "Amaravati Government Hospital", address: "Amaravati, Andhra Pradesh", available: false },
        { id: 4, name: "LIFECARE HOSPITALS", address: "Vijayawada, Andhra Pradesh", available: true },
        { id: 5, name: "Sudha Hospital", address: "Guntur, Andhra Pradesh", available: true }
      ]);
    }
  };

  // Show appointment form for a specific vaccine
  const showAppointmentForm = (vaccineId: number) => {
    const vaccine = vaccines.find(v => v.id === vaccineId);
    if (vaccine) {
      setSelectedVaccine(vaccine);
      setCurrentView('form');
    }
  };

  // Go back to vaccine list
  const showVaccineList = () => {
    setCurrentView('list');
    setSelectedVaccine(null);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedDate('');
    setSelectedTime('');
    setSelectedHospital(null);
    setSelectedGender('female');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedDate) {
      alert('Please select a date for your appointment.');
      return;
    }
    
    if (!selectedTime) {
      alert('Please select a time slot for your appointment.');
      return;
    }
    
    if (!selectedHospital) {
      alert('Please select a hospital for your appointment.');
      return;
    }
    
    if (!selectedGender) {
      alert('Please select your gender.');
      return;
    }
    
    // Prepare appointment data
    const appointmentData: AppointmentData = {
      vaccineId: selectedVaccine?.id || 0,
      date: selectedDate,
      time: selectedTime,
      hospitalId: selectedHospital,
      gender: selectedGender
    };
    
    try {
      // Submit appointment to backend
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Appointment for ${selectedVaccine?.name} booked successfully! You will receive a confirmation email shortly.`);
        
        // Update vaccine status to pending
        if (selectedVaccine) {
          const updatedVaccines = vaccines.map(v => 
            v.id === selectedVaccine.id ? { ...v, status: 'pending' as 'pending' } : v
          );
          setVaccines(updatedVaccines);
        }
        
        // Go back to vaccine list
        showVaccineList();
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Filter vaccines based on status
  const filteredVaccines = () => {
    if (statusFilter === 'all') return vaccines;
    if (statusFilter === 'completed') return vaccines.filter(v => v.status === 'completed');
    return vaccines.filter(v => v.status === 'due' || v.status === 'pending');
  };

  // Initialize component
  useEffect(() => {
    fetchVaccines();
    fetchHospitals();
  }, []);

  // Render vaccine status badge
  const renderStatusBadge = (status: 'due' | 'completed' | 'pending') => {
    let statusClass = '';
    let statusText = '';
    
    if (status === 'completed') {
      statusClass = 'status-completed';
      statusText = 'Completed';
    } else if (status === 'pending') {
      statusClass = 'status-pending';
      statusText = 'Scheduled';
    } else {
      statusClass = 'status-due';
      statusText = 'Due';
    }
    
    return <span className={`vaccine-status ${statusClass}`}>{statusText}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4 md:p-6">
      <main className="container mx-auto max-w-6xl">
        {/* Vaccine List View */}
        {currentView === 'list' && (
          <div className="vaccine-list-container">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Your Vaccination Schedule</h1>
                <p className="text-gray-600">View and manage your vaccination appointments</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${statusFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All Vaccines
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${statusFilter === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setStatusFilter('completed')}
                  >
                    Completed
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${statusFilter === 'upcoming' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setStatusFilter('upcoming')}
                  >
                    Upcoming
                  </button>
                </div>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {filteredVaccines().length} {statusFilter === 'all' ? 'vaccines in total' : statusFilter === 'completed' ? 'completed vaccines' : 'upcoming vaccines'}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVaccines().map(vaccine => (
                  <div key={vaccine.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg text-gray-800">{vaccine.name}</h3>
                          {renderStatusBadge(vaccine.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{vaccine.description}</p>
                        <p className={`text-sm font-medium ${vaccine.status === 'completed' ? 'text-green-600' : vaccine.status === 'pending' ? 'text-blue-600' : 'text-orange-600'}`}>
                          {vaccine.status === 'completed' ? vaccine.completedDate : vaccine.dueDate}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {vaccine.status !== 'completed' ? (
                          <button 
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            onClick={() => showAppointmentForm(vaccine.id)}
                          >
                            {vaccine.status === 'pending' ? 'Reschedule Appointment' : 'Schedule Appointment'}
                          </button>
                        ) : (
                          <button className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-medium" disabled>
                            Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Appointment Form View */}
        {currentView === 'form' && selectedVaccine && (
          <div className="appointment-form-container">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div className="text-sm font-medium text-gray-800">Vaccine Selection</div>
                </div>
                <div className="hidden md:block h-1 flex-1 bg-blue-200 mx-2"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <div className="text-sm font-medium text-gray-800">Appointment Details</div>
                </div>
                <div className="hidden md:block h-1 flex-1 bg-gray-200 mx-2"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold">3</div>
                  <div className="text-sm text-gray-600">Confirmation</div>
                </div>
              </div>
              
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Book Vaccination Appointment</h1>
                <p className="text-gray-600">Schedule your {selectedVaccine.name} vaccination</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Appointment Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Appointment Details</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Vaccine Info */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                          <span className="text-blue-600 text-xl">💉</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{selectedVaccine.name}</h4>
                          <p className="text-sm text-gray-600">Due: {selectedVaccine.dueDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={getTodayDate()}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        required
                      />
                    </div>
                    
                    {/* Time Slots */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {timeSlots.map(slot => (
                          <div 
                            key={slot}
                            className={`p-3 border rounded-lg text-center cursor-pointer transition-colors ${selectedTime === slot ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hospital Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Hospital</label>
                      <div className="space-y-3">
                        {hospitals.filter(h => h.available).map(hospital => (
                          <div 
                            key={hospital.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedHospital === hospital.id ? 'bg-blue-100 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
                            onClick={() => setSelectedHospital(hospital.id)}
                          >
                            <div className="font-medium text-gray-800">{hospital.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{hospital.address}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Gender Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <input 
                            type="radio" 
                            name="gender" 
                            id="male" 
                            value="male" 
                            className="peer hidden"
                            checked={selectedGender === 'male'}
                            onChange={() => setSelectedGender('male')}
                          />
                          <label htmlFor="male" className="block p-4 border border-gray-300 rounded-lg text-center cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-colors">
                            <span className="text-blue-500 text-lg mb-2 block">♂</span>
                            <div className="font-medium text-gray-800">Male</div>
                          </label>
                        </div>
                        <div className="relative">
                          <input 
                            type="radio" 
                            name="gender" 
                            id="female" 
                            value="female" 
                            className="peer hidden"
                            checked={selectedGender === 'female'}
                            onChange={() => setSelectedGender('female')}
                          />
                          <label htmlFor="female" className="block p-4 border border-gray-300 rounded-lg text-center cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-colors">
                            <span className="text-pink-500 text-lg mb-2 block">♀</span>
                            <div className="font-medium text-gray-800">Female</div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <button 
                        type="button" 
                        onClick={showVaccineList}
                        className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Appointment Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Appointment Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vaccine:</span>
                      <span className="font-medium text-gray-800">{selectedVaccine.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-800">{selectedDate ? formatDate(selectedDate) : 'Select a date'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-gray-800">{selectedTime || 'Select a time'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hospital:</span>
                      <span className="font-medium text-gray-800 text-right">
                        {selectedHospital 
                          ? hospitals.find(h => h.id === selectedHospital)?.name || 'Select a hospital' 
                          : 'Select a hospital'
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium text-gray-800">{selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-800">Total:</span>
                        <span className="text-blue-600">Free</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Help Card */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-orange-600 text-lg">ℹ️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Before Your Appointment</h4>
                      <p className="text-sm text-gray-600">Bring your ID and any previous vaccination records. Arrive 10 minutes early.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .vaccine-status {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-completed {
          background-color: #D1FAE5;
          color: #065F46;
        }
        .status-pending {
          background-color: #DBEAFE;
          color: #1E40AF;
        }
        .status-due {
          background-color: #FEF3C7;
          color: #92400E;
        }
      `}</style>
    </div>
  );
};

export default VaccinationTracker;
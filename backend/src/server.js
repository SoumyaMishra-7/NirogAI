const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data
let vaccines = [
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
];

let hospitals = [
    { id: 1, name: "Manipal Hospital Vijayawada", address: "Vijayawada, Andhra Pradesh", available: true },
    { id: 2, name: "AIIMS Hospital, Mangalagiri", address: "Mangalagiri, Andhra Pradesh", available: true },
    { id: 3, name: "Amaravati Government Hospital", address: "Amaravati, Andhra Pradesh", available: false },
    { id: 4, name: "LIFECARE HOSPITALS", address: "Vijayawada, Andhra Pradesh", available: true },
    { id: 5, name: "Sudha Hospital", address: "Guntur, Andhra Pradesh", available: true }
];

let appointments = [];

// Routes

// Get all vaccines
app.get('/api/vaccines', (req, res) => {
    res.json(vaccines);
});

// Get all hospitals
app.get('/api/hospitals', (req, res) => {
    res.json(hospitals);
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// Create a new appointment
app.post('/api/appointments', (req, res) => {
    const { vaccineId, date, time, hospitalId, gender } = req.body;
    
    // Validate required fields
    if (!vaccineId || !date || !time || !hospitalId || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Find vaccine and hospital
    const vaccine = vaccines.find(v => v.id === vaccineId);
    const hospital = hospitals.find(h => h.id === hospitalId);
    
    if (!vaccine) {
        return res.status(404).json({ error: 'Vaccine not found' });
    }
    
    if (!hospital || !hospital.available) {
        return res.status(400).json({ error: 'Hospital not available' });
    }
    
    // Create new appointment
    const newAppointment = {
        id: appointments.length + 1,
        vaccineId,
        vaccineName: vaccine.name,
        date,
        time,
        hospitalId,
        hospitalName: hospital.name,
        gender,
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    
    // Update vaccine status to pending
    vaccine.status = 'pending';
    
    res.status(201).json(newAppointment);
});

// Get appointment by ID
app.get('/api/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const appointment = appointments.find(a => a.id === id);
    
    if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(appointment);
});

// Update appointment
app.put('/api/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const appointmentIndex = appointments.findIndex(a => a.id === id);
    
    if (appointmentIndex === -1) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    
    const { date, time, hospitalId } = req.body;
    
    // Validate hospital if provided
    if (hospitalId) {
        const hospital = hospitals.find(h => h.id === hospitalId);
        if (!hospital || !hospital.available) {
            return res.status(400).json({ error: 'Hospital not available' });
        }
        appointments[appointmentIndex].hospitalId = hospitalId;
        appointments[appointmentIndex].hospitalName = hospital.name;
    }
    
    if (date) appointments[appointmentIndex].date = date;
    if (time) appointments[appointmentIndex].time = time;
    
    res.json(appointments[appointmentIndex]);
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const appointmentIndex = appointments.findIndex(a => a.id === id);
    
    if (appointmentIndex === -1) {
        return res.status(404).json({ error: 'Appointment not found' });
    }
    
    // Get vaccine ID to update status back to due
    const vaccineId = appointments[appointmentIndex].vaccineId;
    const vaccine = vaccines.find(v => v.id === vaccineId);
    
    if (vaccine) {
        vaccine.status = 'due';
    }
    
    appointments.splice(appointmentIndex, 1);
    
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
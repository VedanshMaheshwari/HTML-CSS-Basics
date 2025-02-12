
// Data storage
let patients = [];
let doctors = [];
let appointments = [];

// Patient Form Handling
document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const patient = {
        id: document.getElementById('patientId').value,
        name: document.getElementById('patientName').value,
        age: document.getElementById('patientAge').value,
        gender: document.getElementById('patientGender').value
    };
    patients.push(patient);
    updatePatientsTable();
    updateAppointmentOptions();
    showNotification('Patient added successfully!');
    this.reset();
});

// Doctor Form Handling
document.getElementById('doctorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const doctor = {
        id: document.getElementById('doctorId').value,
        name: document.getElementById('doctorName').value,
        specialization: document.getElementById('specialization').value
    };
    doctors.push(doctor);
    updateDoctorsTable();
    updateAppointmentOptions();
    showNotification('Doctor added successfully!');
    this.reset();
});

// Appointment Form Handling
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const appointment = {
        id: document.getElementById('appointmentId').value,
        patientId: document.getElementById('appointmentPatient').value,
        doctorId: document.getElementById('appointmentDoctor').value,
        time: document.getElementById('appointmentTime').value
    };
    appointments.push(appointment);
    updateAppointmentsTable();
    showNotification('Appointment scheduled successfully!');
    this.reset();
});

// Update Tables
function updatePatientsTable() {
    const tbody = document.querySelector('#patientsTable tbody');
    tbody.innerHTML = patients.map(patient => `
        <tr>
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>
                <button onclick="deletePatient(${patient.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function updateDoctorsTable() {
    const tbody = document.querySelector('#doctorsTable tbody');
    tbody.innerHTML = doctors.map(doctor => `
        <tr>
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>
                <button onclick="deleteDoctor(${doctor.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function updateAppointmentsTable() {
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = appointments.map(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        return `
            <tr>
                <td>${appointment.id}</td>
                <td>${patient ? patient.name : 'Unknown'}</td>
                <td>${doctor ? doctor.name : 'Unknown'}</td>
                <td>${new Date(appointment.time).toLocaleString()}</td>
                <td>
                    <button onclick="deleteAppointment(${appointment.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Update Appointment Options
function updateAppointmentOptions() {
    const patientSelect = document.getElementById('appointmentPatient');
    const doctorSelect = document.getElementById('appointmentDoctor');
    
    patientSelect.innerHTML = '<option value="">Select Patient</option>' + 
        patients.map(patient => 
            `<option value="${patient.id}">${patient.name}</option>`
        ).join('');

    doctorSelect.innerHTML = '<option value="">Select Doctor</option>' + 
        doctors.map(doctor => 
            `<option value="${doctor.id}">${doctor.name}</option>`
        ).join('');
}

// Delete Functions
function deletePatient(id) {
    patients = patients.filter(patient => patient.id != id);
    updatePatientsTable();
    updateAppointmentOptions();
    showNotification('Patient deleted successfully!');
}

function deleteDoctor(id) {
    doctors = doctors.filter(doctor => doctor.id != id);
    updateDoctorsTable();
    updateAppointmentOptions();
    showNotification('Doctor deleted successfully!');
}

function deleteAppointment(id) {
    appointments = appointments.filter(appointment => appointment.id != id);
    updateAppointmentsTable();
    showNotification('Appointment deleted successfully!');
}

// Search Functionality
document.getElementById('patientSearch').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm) || 
        patient.id.toString().includes(searchTerm)
    );
    updateTableWithSearch(filteredPatients, '#patientsTable tbody', patient => `
        <tr>
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>
                <button onclick="deletePatient(${patient.id})">Delete</button>
            </td>
        </tr>
    `);
});

document.getElementById('doctorSearch').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) || 
        doctor.id.toString().includes(searchTerm)
    );
    updateTableWithSearch(filteredDoctors, '#doctorsTable tbody', doctor => `
        <tr>
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>
                <button onclick="deleteDoctor(${doctor.id})">Delete</button>
            </td>
        </tr>
    `);
});

document.getElementById('appointmentSearch').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredAppointments = appointments.filter(appointment => 
        appointment.id.toString().includes(searchTerm)
    );
    updateTableWithSearch(filteredAppointments, '#appointmentsTable tbody', appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        return `
            <tr>
                <td>${appointment.id}</td>
                <td>${patient ? patient.name : 'Unknown'}</td>
                <td>${doctor ? doctor.name : 'Unknown'}</td>
                <td>${new Date(appointment.time).toLocaleString()}</td>
                <td>
                    <button onclick="deleteAppointment(${appointment.id})">Delete</button>
                </td>
            </tr>
        `;
    });
});

function updateTableWithSearch(data, tbodySelector, rowTemplate) {
    const tbody = document.querySelector(tbodySelector);
    tbody.innerHTML = data.map(rowTemplate).join('');
}

// Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Function to show the selected section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// Default to showing the patients section
showSection('patients');
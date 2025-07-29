import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPatients } from '../data/mockData';

const Patients: React.FC = () => {
  const [patientType, setPatientType] = useState<'student' | 'employee' | 'community'>('student');

  const students = mockPatients.filter(p => p.studentId);
  const employees = mockPatients.filter(p => p.employeeId);
  const community = mockPatients.filter(p => !p.studentId && !p.employeeId);

  const renderPatientList = () => {
    let patientsToRender;
    switch (patientType) {
      case 'student':
        patientsToRender = students;
        break;
      case 'employee':
        patientsToRender = employees;
        break;
      case 'community':
        patientsToRender = community;
        break;
      default:
        return null;
    }

    return patientsToRender.map(patient => (
      <Link to={`/patient/${patient.id}`} key={patient.id} className="block border-b py-2 hover:bg-muted">
        {patient.name}
      </Link>
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Patients</h1>
      <div className="flex space-x-4 mt-4">
        <button
          className={`px-4 py-2 rounded-md ${patientType === 'student' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          onClick={() => setPatientType('student')}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded-md ${patientType === 'employee' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          onClick={() => setPatientType('employee')}
        >
          Employees
        </button>
        <button
          className={`px-4 py-2 rounded-md ${patientType === 'community' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
          onClick={() => setPatientType('community')}
        >
          Community
        </button>
      </div>
      <div className="mt-4">
        {renderPatientList()}
      </div>
    </div>
  );
};

export default Patients;

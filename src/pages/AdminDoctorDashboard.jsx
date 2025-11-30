import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom"; // <-- single import only

// Patient Module pages
import NewPatient from "../features/patient-module/new-patient/NewPatient";


import CreateConsultation from './features/patient-module/consult/CreateConsultation';
import ConsultationAI from './features/patient-module/consult/ConsultationAI';
import UpdateConsultation from './features/patient-module/consult/UpdateConsultation';
import ViewConsultation from './features/patient-module/consult/ViewConsultation';

import AddVitals from './features/patient-module/vitals/AddVitals';
import GetVitals from './features/patient-module/vitals/GetVitals';
import UpdateVitals from './features/patient-module/vitals/UpdateVitals';

export default function AdminDoctorDashboard() {
  return (
    <div className="w-full h-full">
      <Routes>
        {/* Default redirect */}
        <Route index element={<Navigate to="patients/create" replace />} />

        {/* Patient Module Routes */}
        <Route path="patients/create" element={<CreatePatient />} />

        {/* More patient module pages will be added here */}

        {/* Catch-all */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

// ------------------------
// ROUTE WRAPPERS
// ------------------------

function ViewConsultationWrapper() {
  const { id } = useParams();
  return <ViewConsultation consultationId={Number(id)} />;
}

function UpdateConsultationWrapper() {
  const { id } = useParams();
  return <UpdateConsultation consultationId={Number(id)} />;
}

function VitalsPageWrapper() {
  const { fileNumber } = useParams();
  return <GetVitals fileNumber={fileNumber} />;
}

function CreateVitalsWrapper() {
  const { fileNumber } = useParams();
  return <AddVitals fileNumber={fileNumber} />;
}

function UpdateVitalsWrapper() {
  const { fileNumber, vitalId } = useParams();
  return <UpdateVitals fileNumber={fileNumber} vitalId={Number(vitalId)} />;
}

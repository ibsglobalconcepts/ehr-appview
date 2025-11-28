import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Patient Module pages (we will add more as you build them)
import CreatePatient from "../modules/patient/create-patient/CreatePatient";

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

import CreateConsultation from './features/patient-module/consult/CreateConsultation';
import ConsultationAI from './features/patient-module/consult/ConsultationAI';
import UpdateConsultation from './features/patient-module/consult/UpdateConsultation';
import ViewConsultation from './features/patient-module/consult/ViewConsultation';

// ------------------------
// ROUTES
// ------------------------

// Place these inside <Routes>
/*
<Route path="/patient/consult/create" element={<CreateConsultation />} />
<Route path="/patient/consult/ai" element={<ConsultationAI />} />
<Route path="/patient/consult/:id" element={<ViewConsultationWrapper />} />
<Route path="/patient/consult/:id/edit" element={<UpdateConsultationWrapper />} />
*/

// Wrappers to extract the :id param
import { useParams } from 'react-router-dom';

function ViewConsultationWrapper() {
  const { id } = useParams();
  return <ViewConsultation consultationId={Number(id)} />;
}

function UpdateConsultationWrapper() {
  const { id } = useParams();
  return <UpdateConsultation consultationId={Number(id)} />;
}


// add these imports where your routes are defined
import AddVitals from './features/patient-module/vitals/AddVitals';
import GetVitals from './features/patient-module/vitals/GetVitals';
import UpdateVitals from './features/patient-module/vitals/UpdateVitals';

// Example routes inside <Routes>
/*
<Route path="/patient/:fileNumber/vitals" element={<VitalsPageWrapper />} />
<Route path="/patient/:fileNumber/vitals/create" element={<CreateVitalsWrapper />} />
<Route path="/patient/:fileNumber/vitals/:vitalId/edit" element={<UpdateVitalsWrapper />} />
*/

// Wrappers to extract params
import { useParams } from 'react-router-dom';
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

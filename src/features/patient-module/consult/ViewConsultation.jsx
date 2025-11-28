// src/features/consultations/ViewConsultation.jsx
import React from 'react';
import { useGetConsultationQuery } from '../../services/consultationsApi';

export default function ViewConsultation({ consultationId }) {
  const { data, isLoading, error } = useGetConsultationQuery(consultationId, { skip: !consultationId });

  if (!consultationId) return <div className="p-4">No consultation selected</div>;
  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading consultation</div>;

  const { consultation, vitals = [], prescriptions = [], lab_orders = [] } = data || {};

  return (
    <div className="p-4 max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Consultation Details</h2>

      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="font-medium">Consultation</h3>
        <pre className="mt-2 text-sm whitespace-pre-wrap">{JSON.stringify(consultation, null, 2)}</pre>
      </div>

      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="font-medium">Vitals</h3>
        {vitals.length === 0 ? <div className="text-sm text-gray-500">No vitals recorded</div> : (
          <ul className="mt-2">
            {vitals.map((v) => (
              <li key={v.id} className="py-1 border-b last:border-0">
                <div className="text-sm">{JSON.stringify(v)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="font-medium">Prescriptions</h3>
        {prescriptions.length === 0 ? <div className="text-sm text-gray-500">No prescriptions</div> : (
          <ul className="mt-2">
            {prescriptions.map((p) => <li key={p.id} className="py-1 text-sm">{JSON.stringify(p)}</li>)}
          </ul>
        )}
      </div>

      <div className="mb-4 p-4 border rounded bg-white">
        <h3 className="font-medium">Lab Orders</h3>
        {lab_orders.length === 0 ? <div className="text-sm text-gray-500">No lab orders</div> : (
          <ul className="mt-2">
            {lab_orders.map((l) => <li key={l.id} className="py-1 text-sm">{JSON.stringify(l)}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

// src/features/patient-module/vitals/GetVitals.jsx
import React from 'react';
import { useListVitalsQuery } from './vitalsApi';

export default function GetVitals({ fileNumber, limit = 50, onSelectVital }) {
  const { data: vitals = [], isLoading, error } = useListVitalsQuery({ file_number: fileNumber, limit }, { skip: !fileNumber });

  if (!fileNumber) return <div className="p-4">No patient selected</div>;
  if (isLoading) return <div className="p-4">Loading vitals...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading vitals</div>;

  if (vitals.length === 0) return <div className="p-4 text-gray-500">No vitals recorded</div>;

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-lg font-semibold mb-3">Vitals</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left">
            <th className="p-2 border">Recorded At</th>
            <th className="p-2 border">Temp</th>
            <th className="p-2 border">Pulse</th>
            <th className="p-2 border">BP</th>
            <th className="p-2 border">SpO₂</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vitals.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.recorded_at}</td>
              <td className="p-2">{v.temperature ?? '-'}</td>
              <td className="p-2">{v.pulse ?? '-'}</td>
              <td className="p-2">{v.bp_systolic ?? '-'} / {v.bp_diastolic ?? '-'}</td>
              <td className="p-2">{v.spo2 ?? '-'}</td>
              <td className="p-2">
                <button onClick={() => onSelectVital && onSelectVital(v)} className="px-2 py-1 border rounded text-sm">Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

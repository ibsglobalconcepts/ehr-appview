// src/features/patient-module/vitals/AddVitals.jsx
import React, { useState } from 'react';
import { useAddVitalMutation } from './vitalsApi';

export default function AddVitals({ fileNumber }) {
  const [addVital, { isLoading }] = useAddVitalMutation();

  const [form, setForm] = useState({
    temperature: '',
    pulse: '',
    bp_systolic: '',
    bp_diastolic: '',
    rr: '',
    spo2: '',
    rbs: '',
    weight: '',
    height: '',
    recorded_by: '',        // optional per backend
    consultation_id: '',    // optional
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileNumber) return alert('Missing patient file number');

    // Build payload: convert numeric fields where possible
    const payload = {
      consultation_id: form.consultation_id ? Number(form.consultation_id) : undefined,
      recorded_by: form.recorded_by || undefined,
      temperature: form.temperature ? Number(form.temperature) : undefined,
      pulse: form.pulse ? Number(form.pulse) : undefined,
      bp_systolic: form.bp_systolic ? Number(form.bp_systolic) : undefined,
      bp_diastolic: form.bp_diastolic ? Number(form.bp_diastolic) : undefined,
      rr: form.rr ? Number(form.rr) : undefined,
      spo2: form.spo2 ? Number(form.spo2) : undefined,
      rbs: form.rbs ? Number(form.rbs) : undefined,
      weight: form.weight ? Number(form.weight) : undefined,
      height: form.height ? Number(form.height) : undefined,
    };

    try {
      const res = await addVital({ file_number: fileNumber, ...payload }).unwrap();
      alert(`Created — recorded_at: ${res.recorded_at}`);
      setForm({
        temperature: '', pulse: '', bp_systolic: '', bp_diastolic: '', rr: '',
        spo2: '', rbs: '', weight: '', height: '', recorded_by: '', consultation_id: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add vitals');
    }
  };

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Add Vitals</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="temperature" value={form.temperature} onChange={onChange} placeholder="Temperature (°C)"
            className="p-2 border rounded" />
          <input name="pulse" value={form.pulse} onChange={onChange} placeholder="Pulse (bpm)"
            className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="bp_systolic" value={form.bp_systolic} onChange={onChange} placeholder="BP Systolic"
            className="p-2 border rounded" />
          <input name="bp_diastolic" value={form.bp_diastolic} onChange={onChange} placeholder="BP Diastolic"
            className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="rr" value={form.rr} onChange={onChange} placeholder="Respiratory Rate (rr)"
            className="p-2 border rounded" />
          <input name="spo2" value={form.spo2} onChange={onChange} placeholder="SpO₂ (%)"
            className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="rbs" value={form.rbs} onChange={onChange} placeholder="RBS (mg/dL)"
            className="p-2 border rounded" />
          <input name="weight" value={form.weight} onChange={onChange} placeholder="Weight (kg)"
            className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="height" value={form.height} onChange={onChange} placeholder="Height (cm)"
            className="p-2 border rounded" />
          <input name="consultation_id" value={form.consultation_id} onChange={onChange} placeholder="Consultation ID (optional)"
            className="p-2 border rounded" />
        </div>

        <div>
          <input name="recorded_by" value={form.recorded_by} onChange={onChange} placeholder="Recorded by (optional)"
            className="p-2 border rounded w-full" />
        </div>

        <div>
          <button type="submit" disabled={isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white">
            {isLoading ? 'Saving...' : 'Add Vitals'}
          </button>
        </div>
      </form>
    </div>
  );
}

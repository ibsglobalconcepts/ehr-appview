// src/features/patient-module/vitals/UpdateVitals.jsx
import React, { useEffect, useState } from 'react';
import { useListVitalsQuery, useUpdateVitalMutation } from './vitalsApi';

export default function UpdateVitals({ fileNumber, vitalId }) {
  const { data: vitals = [], isLoading: loadingVitals } = useListVitalsQuery({ file_number: fileNumber, limit: 100 }, { skip: !fileNumber });
  const [updateVital, { isLoading: isUpdating }] = useUpdateVitalMutation();

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
  });

  useEffect(() => {
    if (!vitalId || !vitals) return;
    const item = vitals.find((v) => Number(v.id) === Number(vitalId));
    if (item) {
      setForm({
        temperature: item.temperature ?? '',
        pulse: item.pulse ?? '',
        bp_systolic: item.bp_systolic ?? '',
        bp_diastolic: item.bp_diastolic ?? '',
        rr: item.rr ?? '',
        spo2: item.spo2 ?? '',
        rbs: item.rbs ?? '',
        weight: item.weight ?? '',
        height: item.height ?? '',
      });
    }
  }, [vitals, vitalId]);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!fileNumber || !vitalId) return alert('file number or vital id missing');

    const payload = {
      file_number: fileNumber,
      vital_id: vitalId,
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
      await updateVital(payload).unwrap();
      alert('Vitals updated');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (!fileNumber) return <div className="p-4">No patient selected</div>;
  if (loadingVitals) return <div className="p-4">Loading vitals...</div>;

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Update Vitals</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="temperature" value={form.temperature} onChange={onChange} placeholder="Temperature (°C)" className="p-2 border rounded" />
          <input name="pulse" value={form.pulse} onChange={onChange} placeholder="Pulse (bpm)" className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="bp_systolic" value={form.bp_systolic} onChange={onChange} placeholder="BP Systolic" className="p-2 border rounded" />
          <input name="bp_diastolic" value={form.bp_diastolic} onChange={onChange} placeholder="BP Diastolic" className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="rr" value={form.rr} onChange={onChange} placeholder="RR" className="p-2 border rounded" />
          <input name="spo2" value={form.spo2} onChange={onChange} placeholder="SpO₂" className="p-2 border rounded" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="rbs" value={form.rbs} onChange={onChange} placeholder="RBS" className="p-2 border rounded" />
          <input name="weight" value={form.weight} onChange={onChange} placeholder="Weight" className="p-2 border rounded" />
        </div>

        <div>
          <input name="height" value={form.height} onChange={onChange} placeholder="Height" className="p-2 border rounded w-full" />
        </div>

        <div>
          <button type="submit" disabled={isUpdating} className="px-4 py-2 rounded bg-green-600 text-white">
            {isUpdating ? 'Updating...' : 'Update Vitals'}
          </button>
        </div>
      </form>
    </div>
  );
}

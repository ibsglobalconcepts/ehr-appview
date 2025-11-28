// src/features/consultations/CreateConsultation.jsx
import React, { useState } from 'react';
import { useCreateConsultationMutation } from '../../services/consultationsApi';

export default function CreateConsultation() {
  const [createConsultation, { isLoading, isSuccess, error }] = useCreateConsultationMutation();

  const [form, setForm] = useState({
    patient_file_number: '',
    clinician_id: '',
    encounter_notes: '',
    consultation_type: '',
    attachments: [], // simple list of strings (paths) as backend expects
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addAttachment = () => {
    const p = prompt('Enter attachment file path or URL');
    if (p) setForm({ ...form, attachments: [...form.attachments, p] });
  };

  const removeAttachment = (idx) => {
    setForm({ ...form, attachments: form.attachments.filter((_, i) => i !== idx) });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        patient_file_number: form.patient_file_number,
        clinician_id: form.clinician_id,
        encounter_notes: form.encounter_notes || '',
        consultation_type: form.consultation_type || '',
        attachments: form.attachments,
      };
      const res = await createConsultation(payload).unwrap();
      alert(`Created. consultation_id: ${res.consultation_id}`);
      // clear form (optional)
      setForm({
        patient_file_number: '',
        clinician_id: '',
        encounter_notes: '',
        consultation_type: '',
        attachments: [],
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create consultation');
    }
  };

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Create Consultation</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Patient File Number</label>
          <input name="patient_file_number" value={form.patient_file_number} onChange={onChange}
            required className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Clinician ID</label>
          <input name="clinician_id" value={form.clinician_id} onChange={onChange}
            required className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Encounter Notes</label>
          <textarea name="encounter_notes" value={form.encounter_notes} onChange={onChange}
            className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Consultation Type</label>
          <input name="consultation_type" value={form.consultation_type} onChange={onChange}
            className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Attachments</label>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={addAttachment} className="px-3 py-1 border rounded">Add</button>
          </div>
          <ul className="mt-2">
            {form.attachments.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-1">
                <span className="truncate">{a}</span>
                <button type="button" onClick={() => removeAttachment(i)} className="text-sm text-red-600">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button type="submit" disabled={isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white">
            {isLoading ? 'Creating...' : 'Create Consultation'}
          </button>
        </div>

        {isSuccess && <div className="text-green-600">Created successfully.</div>}
        {error && <div className="text-red-600">Error creating consultation.</div>}
      </form>
    </div>
  );
}

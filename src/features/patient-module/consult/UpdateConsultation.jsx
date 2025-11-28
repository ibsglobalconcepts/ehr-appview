// src/features/consultations/UpdateConsultation.jsx
import React, { useEffect, useState } from 'react';
import { useGetConsultationQuery, useUpdateConsultationMutation } from '../../services/consultationsApi';

export default function UpdateConsultation({ consultationId }) {
  const { data, error, isLoading } = useGetConsultationQuery(consultationId, { skip: !consultationId });
  const [updateConsultation, { isLoading: isUpdating }] = useUpdateConsultationMutation();

  const [form, setForm] = useState({
    encounter_notes: '',
    consultation_type: '',
    attachments: [],
  });

  useEffect(() => {
    if (data && data.consultation) {
      setForm({
        encounter_notes: data.consultation.encounter_notes || '',
        consultation_type: data.consultation.consultation_type || '',
        attachments: Array.isArray(data.consultation.attachments) ? data.consultation.attachments : (data.consultation.attachments ? JSON.parse(data.consultation.attachments) : []),
      });
    }
  }, [data]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addAttachment = () => {
    const p = prompt('Enter attachment file path or URL');
    if (p) setForm({ ...form, attachments: [...form.attachments, p] });
  };

  const removeAttachment = (idx) => setForm({ ...form, attachments: form.attachments.filter((_, i) => i !== idx) });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateConsultation({ consultation_id: consultationId, ...form }).unwrap();
      alert('Updated');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (!consultationId) return <div className="p-4">No consultation selected</div>;
  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading consultation</div>;

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Update Consultation</h2>
      <form onSubmit={onSubmit} className="space-y-4">
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
          <button type="submit" disabled={isUpdating} className="px-4 py-2 rounded bg-green-600 text-white">
            {isUpdating ? 'Updating...' : 'Update Consultation'}
          </button>
        </div>
      </form>
    </div>
  );
}

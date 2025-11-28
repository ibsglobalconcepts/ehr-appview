// src/features/consultations/ConsultationAI.jsx
import React, { useState } from 'react';
import { useConsultationAiMutation } from '../../services/consultationsApi';

export default function ConsultationAI() {
  const [consultationAi, { isLoading }] = useConsultationAiMutation();
  const [form, setForm] = useState({
    patient_id: '',
    symptoms: '',
    notes: '',
    vitals: '', // we will JSON.parse on submit if user enters JSON
  });
  const [result, setResult] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.symptoms) return alert('Symptoms are required');

    let vitalsParsed = undefined;
    if (form.vitals) {
      try {
        vitalsParsed = JSON.parse(form.vitals);
      } catch (err) {
        return alert('vitals must be valid JSON object or leave empty');
      }
    }

    const payload = {
      patient_id: form.patient_id ? Number(form.patient_id) : undefined,
      symptoms: form.symptoms,
      notes: form.notes || undefined,
      vitals: vitalsParsed || undefined,
    };

    try {
      const res = await consultationAi(payload).unwrap();
      setResult(res);
    } catch (err) {
      console.error(err);
      alert('AI request failed');
    }
  };

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Consultation AI</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Patient ID (optional)</label>
          <input name="patient_id" value={form.patient_id} onChange={onChange}
            className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Symptoms *</label>
          <textarea name="symptoms" value={form.symptoms} onChange={onChange} required
            className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Notes (optional)</label>
          <textarea name="notes" value={form.notes} onChange={onChange}
            className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm">Vitals (optional JSON)</label>
          <textarea name="vitals" value={form.vitals} onChange={onChange}
            placeholder='{"bp":"120/80","pulse":80}' className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <button type="submit" disabled={isLoading} className="px-4 py-2 rounded bg-indigo-600 text-white">
            {isLoading ? 'Running...' : 'Run AI'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold">AI Result</h3>
          <div className="mt-2 whitespace-pre-wrap">{result.ai_summary}</div>
          <div className="mt-3 text-sm text-gray-600">Model: {result.model_used} — created_at: {result.created_at}</div>
          <div className="mt-2 text-xs text-red-600">Disclaimer: {result.disclaimer}</div>
        </div>
      )}
    </div>
  );
}

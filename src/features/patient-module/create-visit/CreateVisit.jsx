import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateVisit() {
  const { file_number } = useParams();

  // Local state
  const [reason, setReason] = useState("");
  const [createdBy, setCreatedBy] = useState(""); // You can auto-fill this later
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      patient_file_number: file_number,
      reason,
      created_by: createdBy,
    };

    try {
      const res = await fetch(
        "https://ibsglobal-ehr-backend-production.up.railway.app/visits",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to create visit");

      setMessage("Visit created successfully!");
      setReason("");
      setCreatedBy("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Visit</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Patient File Number */}
        <div>
          <label className="block mb-1 font-medium">Patient File Number</label>
          <input
            value={file_number}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block mb-1 font-medium">Reason for Visit</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
            required
          />
        </div>

        {/* Created By */}
        <div>
          <label className="block mb-1 font-medium">Created By</label>
          <input
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Create Visit"}
        </button>

        {message && (
          <p className="mt-2 text-sm text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
}

// File: frontend/src/features/patient-module/new-patient/NewPatient.jsx
import React from "react";
import CreatePatientForm from "./components/CreatePatientForm";
import GetPatientByFileNumber from "./components/GetPatientByFileNumber";
import ListPatients from "./components/ListPatients";

// Using shadcn-style Tabs (assumes you have Tabs components set up in your project)
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function NewPatient() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Patient Module — Create Patient</h1>

      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create">Create Patient</TabsTrigger>
          <TabsTrigger value="get">Get Patient by File Number</TabsTrigger>
          <TabsTrigger value="list">List Patients</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <CreatePatientForm />
        </TabsContent>

        <TabsContent value="get">
          <GetPatientByFileNumber />
        </TabsContent>

        <TabsContent value="list">
          <ListPatients />
        </TabsContent>
      </Tabs>
    </div>
  );
}


// File: frontend/src/features/patient-module/new-patient/newPatientApi.js
import { apiSlice } from "@/app/api";

export const newPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (payload) => ({
        url: "/patients",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Patients"],
    }),

    getPatientByFileNumber: builder.query({
      query: (file_number) => `/patients/${file_number}`,
      providesTags: ["Patients"],
    }),

    listPatients: builder.query({
      query: (params) => {
        // params could be a query string or undefined
        let q = "";
        if (params) {
          const search = new URLSearchParams(params).toString();
          q = `?${search}`;
        }
        return `/patients${q}`;
      },
      providesTags: ["Patients"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePatientMutation,
  useGetPatientByFileNumberQuery,
  useListPatientsQuery,
} = newPatientApi;


// File: frontend/src/features/patient-module/new-patient/components/CreatePatientForm.jsx
import React, { useState } from "react";
import { useCreatePatientMutation } from "../newPatientApi";

export default function CreatePatientForm() {
  const [createPatient, { isLoading }] = useCreatePatientMutation();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [message, setMessage] = useState(null);

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        date_of_birth: form.date_of_birth,
        gender: form.gender,
        phone: form.phone,
        address: form.address,
      };

      const res = await createPatient(payload).unwrap();
      setMessage({ type: "success", text: "Patient created successfully." });
      setForm({ first_name: "", last_name: "", date_of_birth: "", gender: "", phone: "", address: "" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err?.data?.detail || "Failed to create patient" });
    }
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={onSubmit} className="space-y-4">
        {message && (
          <div className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input name="first_name" placeholder="First name" value={form.first_name} onChange={onChange} className="input" />
          <input name="last_name" placeholder="Last name" value={form.last_name} onChange={onChange} className="input" />
          <input name="date_of_birth" type="date" name="date_of_birth" value={form.date_of_birth} onChange={onChange} className="input col-span-1" />
          <select name="gender" value={form.gender} onChange={onChange} className="input">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} className="input col-span-2" />
          <input name="address" placeholder="Address" value={form.address} onChange={onChange} className="input col-span-2" />
        </div>

        <div>
          <button type="submit" disabled={isLoading} className="btn">
            {isLoading ? "Creating..." : "Create Patient"}
          </button>
        </div>
      </form>
    </div>
  );
}


// File: frontend/src/features/patient-module/new-patient/components/GetPatientByFileNumber.jsx
import React, { useState } from "react";
import { useGetPatientByFileNumberQuery } from "../newPatientApi";

export default function GetPatientByFileNumber() {
  const [fileNumber, setFileNumber] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { data, error, isFetching, refetch } = useGetPatientByFileNumberQuery(fileNumber, {
    skip: !enabled || !fileNumber,
  });

  function onSearch(e) {
    e.preventDefault();
    if (!fileNumber) return;
    setEnabled(true);
    refetch();
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <input value={fileNumber} onChange={(e) => setFileNumber(e.target.value)} placeholder="Enter file number" className="input" />
        <button className="btn">Search</button>
      </form>

      {isFetching && <div>Loading...</div>}

      {error && <div className="text-red-600">Error loading patient</div>}

      {data && (
        <div className="card p-4">
          <div><strong>File:</strong> {data.file_number || data.fileNumber || "-"}</div>
          <div><strong>Name:</strong> {data.first_name} {data.last_name}</div>
          <div><strong>DOB:</strong> {data.date_of_birth}</div>
          <div><strong>Phone:</strong> {data.phone}</div>
          <div><strong>Address:</strong> {data.address}</div>
        </div>
      )}
    </div>
  );
}


// File: frontend/src/features/patient-module/new-patient/components/ListPatients.jsx
import React, { useState } from "react";
import { useListPatientsQuery } from "../newPatientApi";

export default function ListPatients() {
  const [query, setQuery] = useState({});
  const { data, error, isFetching, refetch } = useListPatientsQuery(query);

  return (
    <div>
      <div className="flex gap-2 items-center mb-4">
        <input placeholder="Search by name or file number" onChange={(e) => setQuery({ q: e.target.value })} className="input" />
        <button className="btn" onClick={() => refetch()}>Search</button>
      </div>

      {isFetching && <div>Loading...</div>}
      {error && <div className="text-red-600">Failed to load patients</div>}

      <div className="grid gap-2">
        {Array.isArray(data) && data.length ? (
          data.map((p) => (
            <div key={p.id || p.file_number} className="card p-3">
              <div className="font-medium">{p.first_name} {p.last_name}</div>
              <div className="text-sm">File: {p.file_number || p.fileNumber}</div>
              <div className="text-sm">Phone: {p.phone}</div>
            </div>
          ))
        ) : (
          <div>No patients found</div>
        )}
      </div>
    </div>
  );
}

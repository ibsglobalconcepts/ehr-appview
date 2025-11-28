// src/app/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ibsglobal-ehr-backend-production.up.railway.app",
  }),
  tagTypes: [
    "Patients",
    "Consultations",
    "Vitals",
    "Diagnosis",
    "Prescriptions",
    "Lab",
    "Imaging",
    "Treatment",
    "Referrals",
    "Billing",
    "Payments",
    "Visits",
    "History",
  ],
  endpoints: () => ({}),
});

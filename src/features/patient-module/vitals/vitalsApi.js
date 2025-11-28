// src/features/patient-module/vitals/vitalsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const vitalsApi = createApi({
  reducerPath: 'vitalsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Vitals'],
  endpoints: (builder) => ({
    addVital: builder.mutation({
      query: ({ file_number, ...body }) => ({
        url: `/patients/${encodeURIComponent(file_number)}/vitals`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vitals'],
    }),
    updateVital: builder.mutation({
      query: ({ file_number, vital_id, ...body }) => ({
        url: `/patients/${encodeURIComponent(file_number)}/vitals/${vital_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Vitals'],
    }),
    listVitals: builder.query({
      query: ({ file_number, limit = 50 }) =>
        `/patients/${encodeURIComponent(file_number)}/vitals?limit=${limit}`,
      providesTags: ['Vitals'],
    }),
  }),
});

export const { useAddVitalMutation, useUpdateVitalMutation, useListVitalsQuery } = vitalsApi;

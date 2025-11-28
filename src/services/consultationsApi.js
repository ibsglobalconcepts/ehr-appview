// src/services/consultationsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const consultationsApi = createApi({
  reducerPath: 'consultationsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Consultation', 'ConsultationAI'],
  endpoints: (builder) => ({
    createConsultation: builder.mutation({
      query: (body) => ({
        url: '/consultations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Consultation'],
    }),
    consultationAi: builder.mutation({
      query: (body) => ({
        url: '/consultation/ai',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ConsultationAI'],
    }),
    updateConsultation: builder.mutation({
      query: ({ consultation_id, ...body }) => ({
        url: `/consultations/${consultation_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Consultation', id: arg.consultation_id }],
    }),
    getConsultation: builder.query({
      query: (consultation_id) => `/consultations/${consultation_id}`,
      providesTags: (result, error, id) => [{ type: 'Consultation', id }],
    }),
  }),
});

export const {
  useCreateConsultationMutation,
  useConsultationAiMutation,
  useUpdateConsultationMutation,
  useGetConsultationQuery,
} = consultationsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL =
  " https://task-manger-2.onrender.com" || import.meta.env.VITE_APP_BASE_URL;
// "http://localhost:8080/api";

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});

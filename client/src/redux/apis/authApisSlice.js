import { apiSlice } from "./apiSlice";

const AUTH_URL = "/user";
export const authApisSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    /*** */
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    /*** */

    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApisSlice;

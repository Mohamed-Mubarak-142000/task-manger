import { apiSlice } from "./apiSlice";

const USER_URL = "/user";

export const userApisSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /*** */
    getTeamList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-team`,
        method: "GET",
        credentials: "include",
      }),
    }),

    /*** */
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    /*** */

    userAction: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /*** */

    getNotification: builder.query({
      query: () => ({
        url: `${USER_URL}/get-notification`,
        method: "GET",
        credentials: "include",
      }),
    }),

    /*** */
    markNotificationIsRead: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/read-notification?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /*** */
    changePassworduser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /*** */
  }),
});
export const {
  useUpdateUserMutation,
  useGetTeamListQuery,
  useUserActionMutation,
  useDeleteUserMutation,
  useChangePassworduserMutation,
  useMarkNotificationIsReadMutation,
  useGetNotificationQuery,
} = userApisSlice;

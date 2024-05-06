import { apiSlice } from "./apiSlice";

const TASK_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashoardStatus: builder.query({
      query: () => ({
        url: `${TASK_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getAllTasks: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${TASK_URL}/get-all-task?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",

        credentials: "include",
      }),
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create-task`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/update/${data}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetDashoardStatusQuery,
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
  useUpdateTaskMutation,
} = taskApiSlice;

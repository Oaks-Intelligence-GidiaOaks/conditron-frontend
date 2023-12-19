import { VARIABLE, VARIABLE_DISABLE } from "./constants";
import apiSlice from "./api/apiSlice";

export const variablesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // save variable data
    saveVariables: builder.mutation({
      query: (data) => ({
        url: VARIABLE,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Variable"],
    }),

    getVariables: builder.query({
      query: ({ page = 1 }) => ({
        url: `${VARIABLE}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Variable"],
    }),

    getAllVariables: builder.query({
      query: () => ({
        url: "variable/data",
        method: "GET",
      }),
      providesTags: ["Variable"],
    }),

    deleteVariables: builder.mutation({
      query: ({ id }) => ({
        url: `${VARIABLE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variable"],
    }),

    updateVariables: builder.mutation({
      query: ({ id, data }) => ({
        url: `${VARIABLE}/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Variable"],
    }),

    disableVariables: builder.mutation({
      query: ({ id, data }) => ({
        url: `${VARIABLE_DISABLE}/${id}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Variable"],
    }),
  }),
});

export const {
  useSaveVariablesMutation,
  useGetVariablesQuery,
  useGetAllVariablesQuery,
  useDeleteVariablesMutation,
  useUpdateVariablesMutation,
  useDisableVariablesMutation,
} = variablesApiSlice;

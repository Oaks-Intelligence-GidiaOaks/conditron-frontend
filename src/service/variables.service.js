import { VARIABLE } from "./constants";
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
      query: () => ({
        url: VARIABLE,
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
  }),
});

export const {
  useSaveVariablesMutation,
  useGetVariablesQuery,
  useDeleteVariablesMutation,
  useUpdateVariablesMutation,
} = variablesApiSlice;

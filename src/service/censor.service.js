import { CENSOR } from "./constants";
import apiSlice from "./api/apiSlice";

export const censorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // save censor data
    saveCensors: builder.mutation({
      query: (data) => ({
        url: CENSOR,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Censor"],
    }),

    getCensors: builder.query({
      query: () => ({
        url: CENSOR,
        method: "GET",
      }),
      providesTags: ["Censor"],
    }),

    deleteCensors: builder.mutation({
      query: ({ id }) => ({
        url: `${CENSOR}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Censor"],
    }),

    updateCensors: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CENSOR}/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Censor"],
    }),
  }),
});

export const {
  useSaveCensorsMutation,
  useGetCensorsQuery,
  useDeleteCensorsMutation,
  useUpdateCensorsMutation,
} = censorsApiSlice;
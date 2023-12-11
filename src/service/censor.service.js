import { CENSOR, SENSOR_DISABLE } from "./constants";
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
      query: ({ page = 1 }) => ({
        url: `${CENSOR}?page=${page}`,
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

    disableCensors: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SENSOR_DISABLE}/${id}`,
        body: data,
        method: "POST",
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
  useDisableCensorsMutation,
} = censorsApiSlice;

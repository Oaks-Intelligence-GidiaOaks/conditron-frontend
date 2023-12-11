import { MODELS, MODELS_DISABLE } from "./constants";
import apiSlice from "./api/apiSlice";

export const modelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // save variable data
    saveModel: builder.mutation({
      query: (data) => ({
        url: MODELS,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Models"],
    }),

    getModel: builder.query({
      query: ({ page = 1 }) => ({
        url: `${MODELS}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Models"],
    }),

    deleteModel: builder.mutation({
      query: ({ id }) => ({
        url: `${MODELS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Models"],
    }),

    updateModel: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MODELS}/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Models"],
    }),

    disableModels: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MODELS_DISABLE}/${id}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Censor"],
    }),
  }),
});

export const {
  useSaveModelMutation,
  useGetModelQuery,
  useDeleteModelMutation,
  useUpdateModelMutation,
  useDisableModelsMutation,
} = modelsApiSlice;

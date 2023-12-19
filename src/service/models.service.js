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
      invalidatesTags: ["Model"],
    }),

    getModel: builder.query({
      query: ({ page = 1 }) => ({
        url: `${MODELS}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Model"],
    }),

    getAllModels: builder.query({
      query: () => ({
        url: "model/data",
        method: "GET",
      }),
      providesTags: ["Model"],
    }),

    deleteModel: builder.mutation({
      query: ({ id }) => ({
        url: `${MODELS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Model"],
    }),

    updateModel: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MODELS}/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Model"],
    }),

    disableModels: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MODELS_DISABLE}/${id}`,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Model"],
    }),
  }),
});

export const {
  useSaveModelMutation,
  useGetModelQuery,
  useGetAllModelsQuery,
  useDeleteModelMutation,
  useUpdateModelMutation,
  useDisableModelsMutation,
} = modelsApiSlice;

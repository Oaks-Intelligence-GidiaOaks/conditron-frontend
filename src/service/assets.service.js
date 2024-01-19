import { ASSET, TOP_VALUED_ASSETS } from "./constants";
import apiSlice from "./api/apiSlice";

export const censorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // save asset data
    saveAsset: builder.mutation({
      query: (data) => ({
        url: ASSET,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Asset"],
    }),

    getAsset: builder.query({
      query: ({ page = 1 }) => ({
        url: `${ASSET}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Asset"],
    }),

    getAllAssets: builder.query({
      query: () => ({
        url: "asset/data",
        method: "GET",
      }),
      providesTags: ["Asset"],
    }),

    deleteAsset: builder.mutation({
      query: ({ id }) => ({
        url: `${ASSET}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Asset"],
    }),

    updateAsset: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ASSET}/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Asset"],
    }),

    topValuedAssets: builder.query({
      query: () => ({
        url: TOP_VALUED_ASSETS,
        method: "GET",
      }),
      providesTags: ["Asset"],
    }),
  }),
});

export const {
  useSaveAssetMutation,
  useGetAssetQuery,
  useGetAllAssetsQuery,
  useDeleteAssetMutation,
  useUpdateAssetMutation,
  useTopValuedAssetsQuery,
} = censorsApiSlice;

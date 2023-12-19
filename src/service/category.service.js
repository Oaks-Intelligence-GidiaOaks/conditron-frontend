import { CATEGORY } from "./constants";
import apiSlice from "./api/apiSlice";

export const censorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // save category data
    saveCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORY,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Category"],
    }),

    getCategory: builder.query({
      query: ({ page = 1 }) => ({
        url: `${CATEGORY}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getAllCategory: builder.query({
      query: () => ({
        url: "category/data",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `${CATEGORY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY}/${id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useSaveCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = censorsApiSlice;

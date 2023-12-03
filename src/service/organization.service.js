import {
  UNVERIFIED_ORGANIZATION,
  VERIFIED_ORGANIZATION,
  VERIFY_ORGANIZATION,
} from "./constants";
import apiSlice from "./api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get unverified organization route
    getUnverifiedOrganization: builder.query({
      query: ({ page = 1 }) => ({
        url: `${UNVERIFIED_ORGANIZATION}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    getVerifiedOrganization: builder.query({
      query: ({ page = 1 }) => ({
        url: `${VERIFIED_ORGANIZATION}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    approveOrganization: builder.mutation({
      invalidatesTags: ["Organization"],
      query: ({ id }) => ({
        url: `${VERIFY_ORGANIZATION}/${id}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetUnverifiedOrganizationQuery,
  useGetVerifiedOrganizationQuery,
  useApproveOrganizationMutation,
} = userApiSlice;

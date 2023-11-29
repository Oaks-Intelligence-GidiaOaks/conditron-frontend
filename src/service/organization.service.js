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
      query: () => ({
        url: UNVERIFIED_ORGANIZATION,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),

    getVerifiedOrganization: builder.query({
      query: () => ({
        url: VERIFIED_ORGANIZATION,
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

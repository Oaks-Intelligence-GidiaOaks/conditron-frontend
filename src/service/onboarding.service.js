import { ORGANIZATION } from "./constants";
import apiSlice from "./api/apiSlice";

export const onboardingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // save onboarding details
    registerOnboarding: builder.mutation({
      query: (data) => ({
        url: ORGANIZATION,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Onboarding"],
    }),
  }),
});

export const { useRegisterOnboardingMutation } = onboardingApiSlice;

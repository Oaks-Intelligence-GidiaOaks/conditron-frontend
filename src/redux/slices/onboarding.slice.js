import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postal_code: null,
  state: null,
  country: null,
  organization_name: null,
  admin_name: null,
  admin_email: null,
  admin_phone: null,
  date_of_incorporation: null,
  address: null,
  admin_identity_document: {},
  certificate_of_incorporation: {},
  letter_of_authorization: {},
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateOnboarding(state, action) {
      const values = action.payload;
      let newState = { ...state };
      Object.assign(newState, values);
      return newState;
    },
    clearOnboarding(state) {
      let newState = { ...state };
      newState.postal_code = null;
      newState.state = null;
      newState.country = null;
      newState.organization_name = null;
      newState.admin_email = null;
      newState.admin_name = null;
      newState.admin_phone = null;
      newState.date_of_incorporation = null;
      newState.address = null;
      newState.admin_identity_document = {};
      newState.certificate_of_incorporation = {};
      newState.letter_of_authorization = {};
      return newState;
    },
  },
});

export const { updateOnboarding, clearOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;

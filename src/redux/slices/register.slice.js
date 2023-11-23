import { createSlice } from "@reduxjs/toolkit";
// import convertToDateFormat from "utils/convertToDateFormat";

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  password: null,
  confirm_password: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateFormdata(state, action) {
      const values = action.payload;
      let newState = { ...state };
      Object.assign(newState, values);
      return newState;
    },
    clearFormData(state) {
      let newState = { ...state };
      newState.first_name = null;
      newState.last_name = null;
      newState.email = null;
      newState.phone_number = null;
      newState.password = null;
      newState.confirm_password = null;
      return newState;
    },
  },
});

export const { updateFormdata, clearFormData } = registerSlice.actions;
export default registerSlice.reducer;

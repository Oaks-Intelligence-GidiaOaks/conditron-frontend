import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const userObj = action.payload;
      let newState = { ...state };
      Object.assign(newState, userObj);
      return newState;
    },
    logoutUser(state) {
      let newState = { ...state };
      newState.user = null;
      newState.token = null;
      newState.refreshToken = null;
      return newState;
    },
  },
});

// Define a selector that retrieves the user state from Redux
const selectUserState = (state) => state.user;

// Define a sub-selector that gets the id from the user state
export const selectUserId = createSelector(selectUserState, (userState) =>
  userState.user ? userState.user.id : null
);

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

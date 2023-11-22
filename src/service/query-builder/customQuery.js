import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import enviroment from "../../configs/environment.config";
import { updateUser, logoutUser } from "../../redux/slices/user.slice";
import { openModal, closeComponentModal } from "../../redux/slices/modal.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: enviroment.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = getState().user.token;
    console.log(`Token: ${token}`);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // console.log(result, "res");
  if (result.error && result.error.status === 406) {
    api.dispatch(logoutUser());
    api.dispatch(
      openModal({
        title: "Inactive for too long",
        message: "Please login again to continue",
        success: false,
      })
    );

    return;
  } else if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().user.refreshToken;
    const refreshResult = await baseQuery(
      { url: "user/refresh_token", method: "POST", body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(updateUser({ token: refreshResult.data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult.error.status) {
      api.dispatch(logoutUser());
      api.dispatch(closeComponentModal());
      api.dispatch(
        openModal({
          title: "Refresh Token Expired",
          message: "Please login again to continue",
          success: false,
        })
      );
    } else {
      api.dispatch(logoutUser);
    }
  }
  return result;
};

export default customBaseQuery;

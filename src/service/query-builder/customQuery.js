import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import enviroment from "../../configs/environment.config";
import { logoutUser } from "../../redux/slices/user.slice";
import { showAlert } from "../../static/alert";

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
    showAlert(
      "Inactive for too long",
      "Please login again to continue",
      "error"
    );

    return;
  } else if (result.error && result.error.status === 401) {
    api.dispatch(logoutUser());
    showAlert(
      "Access Token Expired",
      "Please login again to continue",
      "error"
    );

    // if (refreshResult.data) {
    //   api.dispatch(updateUser({ token: refreshResult.data.accessToken }));
    //   result = await baseQuery(args, api, extraOptions);
    // } else if (refreshResult.error.status) {
    //   api.dispatch(logoutUser());
    //   api.dispatch(closeComponentModal());
    //   api.dispatch(
    //     openModal({
    //       title: "Refresh Token Expired",
    //       message: "Please login again to continue",
    //       success: false,
    //     })
    //   );
    // } else {
    //   api.dispatch(logoutUser);
    // }
  }
  return result;
};

export default customBaseQuery;

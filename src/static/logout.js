import { logoutUser } from "../redux/slices/user.slice";
import { clearFormData } from "../redux/slices/register.slice";
import { clearOnboarding } from "../redux/slices/onboarding.slice";
import { showAlert } from "./alert";

export const handleLogout = (dispatch) => {
  dispatch(logoutUser());
  dispatch(clearFormData());
  dispatch(clearOnboarding());
  showAlert(
    "Pls come back again",
    "You've ended your current session",
    "success"
  );
};

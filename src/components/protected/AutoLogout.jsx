import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/user.slice";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const user = useSelector((state) => state.user?.user);

  const handleUserActivity = () => {
    setLastActivityTime(Date.now());
    // console.log(lastActivityTime, "last");
  };

  useEffect(() => {
    const logoutTimer =
      user &&
      setInterval(() => {
        const inactivityThreshold = 15 * 60 * 10000;
        // time when interval check happens. NB: dependency has to be triggered for useEffect
        const timePerInterval = Date.now();
        const inactiveTime = timePerInterval - lastActivityTime;

        if (inactiveTime > inactivityThreshold) {
          dispatch(logoutUser());
          showAlert(
            "You were logged out",
            "because you were inactive for too long",
            "error"
          );
          clearInterval(logoutTimer);
        }
      }, 1000);

    // window.addEventListener("mousemove", handleUserActivity);
    user && window.addEventListener("click", handleUserActivity);
    // window.addEventListener("touchstart", handleUserActivity);

    return () => {
      clearInterval(logoutTimer);
      //   window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      //   window.removeEventListener("touchstart", handleUserActivity);
    };
  }, [lastActivityTime]);

  return null; // The component doesn't render anything, it just handles the logic
};

export default AutoLogout;

import { Link } from "react-router-dom";
import * as images from "../../../../assets";
import { useSelector } from "react-redux";
import { FaRegBell } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function Notification() {
  const name = useSelector((state) => state.user?.user?.first_name);

  return (
    <>
      <img
        src={images.notification}
        alt="notification"
        className="dropdown-toggle px-lg-4 px-sm-5 btn"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />

      <ul className="dropdown-menu dropdown-center" style={{ width: "300px" }}>
        <li className="">
          <p className="text-start ms-3">
            <FaBell className="me-3 fs-5" />
            Notifications (0)
          </p>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link
            className="dropdown-item d-flex justify-content-between align-items-center"
            to="#"
          >
            <div className="rounded-circle bg-light">
              <FaRegBell className="me-2" />
            </div>
            <div className="message d-flex flex-column align-items-start">
              this is a new notification.. check it!
            </div>
          </Link>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex justify-content-between align-items-center"
            to="#"
          >
            <div className="">
              <FaRegBell className="me-2" />
            </div>
            <div className="message d-flex flex-column align-items-start">
              <span style={{ overflowWrap: "break-word" }}>
                this is a new notification.. check it!
              </span>
            </div>
          </Link>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <Link
            className="dropdown-item d-flex justify-content-between align-items-center"
            to="#"
          >
            <div className="">
              <FaRegBell className="me-2" />
            </div>
            <div className="message d-flex flex-column align-items-start">
              this is a new notification.. check it!
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Notification;

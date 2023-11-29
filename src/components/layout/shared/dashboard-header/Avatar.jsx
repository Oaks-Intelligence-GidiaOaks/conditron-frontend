import { Link } from "react-router-dom";
import * as images from "../../../../assets";
import { handleLogout } from "../../../../static/logout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Avatar() {
  const name = useSelector((state) => state.user?.user?.first_name);

  const dispatch = useDispatch();

  const logout = () => {
    handleLogout(dispatch);
  };

  return (
    <>
      <img
        src={images.avatar}
        alt="avatar"
        className="dropdown-toggle btn"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />
      <ul className="dropdown-menu" style={{ width: "12%" }}>
        <li>
          <p className="text-xs text-center">Hello {name}</p>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            Profile Page
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            Settings Page
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            Activity
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="btn" onClick={() => logout()}>
            <img src={images.logout} alt="" /> Logout
          </button>
        </li>
      </ul>
    </>
  );
}

export default Avatar;

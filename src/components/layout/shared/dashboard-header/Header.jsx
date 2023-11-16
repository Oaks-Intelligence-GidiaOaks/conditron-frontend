import * as images from "../../../../assets";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  return (
    <section className="dashboard-nav">
      <div className="container-fluid">
        <div className="d-flex ms-5 me-5 py-3 justify-content-between align-items-center">
          <div className="">
            <img src={images.dashboard_logo} alt="logo" className="img-fluid" />
          </div>
          <div className="">
            <div className="input-group search-input-group d-none d-md-flex">
              <span
                className="input-group-text serach-btn border-end-0"
                id="basic-addon1"
              >
                <img src={images.search} alt="" />
              </span>
              <input
                type="text"
                className="form-control search-input border-start-0"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <button className="btn d-block d-sm-none">
              <img src={images.search} alt="small icon" />
            </button>
          </div>
          <div className="">
            <img src={images.refresh} alt="refresh" />
            <img
              src={images.notification}
              alt="notification"
              className="px-4"
            />
            <img src={images.avatar} alt="avatar" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;

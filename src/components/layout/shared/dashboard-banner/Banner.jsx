import * as images from "../../../../assets";
import PropTypes from "prop-types";
import { useState } from "react"; // Import useState
import "./Banner.css";

function Banner({ backgroundImage, text1, text2, text3 }) {
  const [isBannerClosed, setBannerClosed] = useState(false);

  const match = text3.match(/page (\d+)/);
  const pageType = match ? match[1] : null;
  const text3ClassName = `text-3 ${
    pageType === "2" ? "green pb-3" : "red pb-3"
  }`;

  const handleBannerClose = () => {
    setBannerClosed(true);
  };

  return (
    !isBannerClosed && (
      <section>
        <div className="container-fluid">
          <div className="ms-lg-5 me-lg-5 justify-content-center">
            <div
              className=""
              style={{
                backgroundImage: `url(${
                  backgroundImage || images.dashboard_banner
                })`,
                backgroundRepeat: "no-repeat",
                width: "100%",
                backgroundSize: "cover",
                padding: "20px",
                // margin: "10px",
                color: "white",
                height: "222px",
                borderRadius: "14.01px",
              }}
            >
              <div className="banner-container d-flex justify-content-center align-items-center position-relative">
                <button
                  type="button"
                  className="btn-close btn-close-white text-white position-absolute top-0 end-0 mt-1 me-2"
                  aria-label="Close"
                  onClick={handleBannerClose}
                ></button>
                <div className="text-start">
                  <p className="text-1 pt-3">{text1}</p>
                  <h4 className="text-2">{text2}</h4>
                  <p className={text3ClassName}>
                    {pageType === "2" && (
                      <img src={images.success} alt="Green Image" />
                    )}
                    {pageType === "1" && (
                      <img src={images.suspended} alt="Red Image" />
                    )}
                    {text3.includes("page")
                      ? text3.replace(/page \d+/, "")
                      : text3}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

Banner.propTypes = {
  backgroundImage: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
};

export default Banner;

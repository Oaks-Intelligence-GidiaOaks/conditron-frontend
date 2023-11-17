import * as images from "../../../../assets";
import PropTypes from "prop-types";
import "./Banner.css";

function Banner({ backgroundImage, text1, text2, text3 }) {
  const match = text3.match(/page (\d+)/);
  const pageType = match ? match[1] : null;
  const text3ClassName = `text-3 ${
    pageType === "2" ? "green pb-3" : "red pb-3"
  }`;

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div
          className="banner-container d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${
              backgroundImage || images.dashboard_banner
            })`,
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}
        >
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
              {text3.includes("page") ? text3.replace(/page \d+/, "") : text3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  backgroundImage: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  pageType: PropTypes.string,
};

export default Banner;

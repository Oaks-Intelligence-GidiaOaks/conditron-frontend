import PropTypes from "prop-types";
import { Container, Header } from "../../../layout";
// import "./hero.css";
import Marquee from "react-fast-marquee";
import { mfive, mfour, mone, mthree, mtwo } from "../../../../assets";
import { Link, useLocation } from "react-router-dom";
import ScrollEffect from "../../../../animation/ScrollEffect";

const Hero = ({ title, text, image = "", imageComponent: Image }) => {
  const location = useLocation();
  const urlPath = location.pathname;
  return (
    <div
      className={`hero pt-[22px] ${urlPath !== "/" ? "pb-[0px]" : "pb-[80px]"}`}
    >
      <Container>
        <Header />
        <div className="w-full flex flex-wrap pb-10">
          <div className="w-full lg:w-[40%] flex flex-col justify-center items-start">
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.8}
              className="hero_text_heading"
            >
              <div className="lg:text-[50px] text-[35px] text-gradient leading-[120%] font-black mb-[16px] text-left w-full hero_text">
                {title}
              </div>
            </ScrollEffect>
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.8}
              inViewTransitionTime={0.8}
            >
              <div className="w-full mb-[16px] lg:text-[24px] text-[20px] text-hero">
                {text}
              </div>
            </ScrollEffect>

            {urlPath === "/" && (
              <ScrollEffect
                inViewProperties={{
                  y: [30, 0],
                  opacity: [0, 1],
                }}
                inViewDelay={1.2}
                inViewTransitionTime={0.7}
              >
                <div className="w-full flex justify-start items-center gap-x-6 text-center py-8">
                  <Link
                    className="tecknology-btn-1 px-2 py-1 text-sm lg:px-8 lg:py-4 lg:text-xl primary"
                    to={"/contact"}
                  >
                    Get Started
                  </Link>
                  <Link
                    className="tecknology-btn-2 px-2 py-1 text-sm lg:px-8 lg:py-4 lg:text-xl secondary"
                    to={"about"}
                  >
                    Learn More
                  </Link>
                </div>
              </ScrollEffect>
            )}
          </div>

          <ScrollEffect
            inViewProperties={{
              opacity: [0, 1],
            }}
            inViewDelay={1.6}
            inViewTransitionTime={0.8}
            className="w-full lg:w-[60%] flex justify-center items-center"
          >
            {Image || <img src={image} className=" w-[100%]" />}
          </ScrollEffect>
        </div>
        {urlPath === "/" && (
          <ScrollEffect
            inViewProperties={{
              opacity: [0, 1],
            }}
            inViewDelay={0.2}
            inViewTransitionTime={0.8}
            className="w-full lg:w-[60%] flex justify-center items-center"
          >
            <div className="lg:w-1/2 w-full flex justify-start max-w-xs">
              <Marquee className="w-[200px]" autoFill>
                <img src={mone} className="mx-[30px]" />
                <img src={mtwo} className="mx-[30px]" />
                <img src={mthree} className="mx-[30px]" />
                <img src={mfour} className="mx-[30px]" />
                <img src={mfive} className="mx-[30px]" />
              </Marquee>
            </div>
          </ScrollEffect>
        )}
      </Container>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  button: PropTypes.bool,
  image: PropTypes.element,
  imageComponent: PropTypes.node.isRequired,
};

export default Hero;

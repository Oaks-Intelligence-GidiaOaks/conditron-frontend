import "./PortfolioCarbAdjust.css";

import {
  adone,
  adtwo,
  ai,
  figma,
  heroku,
  html5,
  nextjs,
  postfresql,
  postman,
  reactjs,
  vector,
  vector_light,
  nextjs_light,
  three,
  four,
} from "../../../../assets";
import { useTheme } from "../../../../theme/useTheme";
import ScrollEffect from "../../../../animation/ScrollEffect";
import { Link } from "react-router-dom";

const PortfolioCarbAdjust = () => {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <div className={isDarkMode ? "title_port" : "title_port_light"}>
        Carbon-Adjust
      </div>
      <div className="port_item_wrap">
        <div className="port_wrap_text">
          <div
            className="tool_title"
            // data-aos="fade-right"
            // data-aos-duration="1000"
          >
            Abstract
          </div>

          <div
            className="abstract-text"
            // data-aos="fade-up" data-aos-duration="1000"
          >
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.8}
            >
              Carbon-Adjust is the first global large-scale platform offering
              home residents the opportunity to commercialise the carbon credit
              benefits that exist in the energy efficiency investments they make
              in home improvements. Carbon-Adjust recognises that individuals
              cannot own carbon credits and so provides an end-to-end solution
              that includes aggregators, home improvement agencies, and
              financial institutions. <br />
              <br /> Home owners or residents who have made investments in
              energy efficient projects or acquisitions can connect with private
              entities to help them acquire the carbon credits on these projects
              for an internal arrangement of settlement.
            </ScrollEffect>
          </div>
        </div>
        <ScrollEffect
          inViewProperties={{
            y: [30, 0],
            opacity: [0, 1],
          }}
          inViewDelay={0.2}
          inViewTransitionTime={0.8}
        >
          <div className="port_wrap_text">
            <div
              className="tool_title"
              // data-aos="fade-up"
              // data-aos-duration="1000"
            >
              Tool Stack
            </div>
            <div
              className="flex tool_img_wrap"
              // data-aos="fade-left"
              // data-aos-duration="1000"
            >
              <img src={figma} alt="fig" className="tool_img" />
              <img src={ai} alt="ai" className="tool_img" />
              <img src={heroku} alt="heroku" className="tool_img" />
              <img src={html5} alt="html" className="tool_img" />
              <img
                src={isDarkMode ? nextjs : nextjs_light}
                alt="next"
                className="tool_img next-light"
              />
              <img src={postfresql} alt="postfresql" className="tool_img" />
              <img src={postman} alt="postman" className="tool_img" />
              <img src={reactjs} alt="reactjs" className="tool_img w-[300px]" />
            </div>
          </div>
        </ScrollEffect>
        <div className="w-full flex flex-wrap feat_one">
          <div
            className="w-full lg:w-1/2 flex flex-col  items-start"
            // data-aos="fade-down"
            // data-aos-duration="1000"
          >
            <div className="vector_wrap arrow_wrap">
              <img src={isDarkMode ? vector : vector_light} alt="" />
            </div>
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.8}
            >
              <div className="lg:text-[50px] text-[35px] text-gradient leading-[120%] font-black mb-[16px] text-left w-full hero_text">
                Carbon Credits Acquisition for Home Owners
              </div>
              <div className="w-full mb-[16px] lg:text-[24px] text-[20px] abstract-text">
                Whether you are a homeowner or occupant, Carbon-Adjust is here
                to assist you in registering for Carbon Credits and gaining
                access to financial support for your retrofitting endeavors.
              </div>
              <div className="w-full flex justify-start items-center gap-x-6 text-center py-8">
                <Link
                  className="tecknology-btn-1 px-2 py-1 text-sm lg:px-8 lg:py-4 lg:text-xl btn-tech primary"
                  target={"_blank"}
                  to={"https://www.carbon-adjust.com/"}
                >
                  Explore Product
                </Link>
              </div>
            </ScrollEffect>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              src={isDarkMode ? adone : three}
              className="w-[85%] feat_img"
              // data-aos="fade-up"
              // data-aos-duration="1000"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap feat_two">
          <div className="w-full lg:w-1/2 flex items-start feat_img_wrap">
            <img
              src={isDarkMode ? adtwo : four}
              className="w-[85%] feat_img"
              // data-aos="fade-down"
              // data-aos-duration="1000"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col  items-start">
            <div className="vector_wrap arrow_wrap">
              <img src={isDarkMode ? vector : vector_light} alt="" />
            </div>
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.8}
            >
              <div className="lg:text-[50px] text-[35px] text-gradient leading-[120%] font-black mb-[16px] text-left w-full hero_text">
                Sustainable Home Retrofit Platform: Carbon-Adjust
              </div>
              <div
                className="w-full mb-[16px] lg:text-[24px] text-[20px] abstract-text"
                // data-aos="fade-up"
                // data-aos-duration="1000"
              >
                Bridging the gap between homeowners, financials institutions and
                retrofitters to enable homeowners access loans to go green and
                make money from their green investment.
              </div>
              <div className="w-full flex justify-start items-center gap-x-6 text-center py-8">
                <Link
                  className="tecknology-btn-1 px-2 py-1 text-sm lg:px-8 lg:py-4 lg:text-xl btn-tech primary"
                  target={"_blank"}
                  to={"https://www.carbon-adjust.com/"}
                  // data-aos="fade-right"
                  // data-aos-duration="1000"
                >
                  Explore Product
                </Link>
              </div>
            </ScrollEffect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCarbAdjust;

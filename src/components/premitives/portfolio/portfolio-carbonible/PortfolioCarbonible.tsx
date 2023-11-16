import React from "react";
import "./PortfolioCarbonible.css";
import {
  ai,
  buycarbo,
  figma,
  heroku,
  html5,
  nextjs,
  nibledash,
  postfresql,
  postman,
  reactjs,
  vector,
  vector_light,
  nextjs_light,
  adtwo_light,
  one,
} from "../../../../assets";
import { useTheme } from "../../../../theme/useTheme";
import ScrollEffect from "../../../../animation/ScrollEffect";
import { Link } from "react-router-dom";

// import { useEffect } from "react";

const PortfolioCarbonible = () => {
  const { isDarkMode } = useTheme();
  return (
    <div>
      <div className={isDarkMode ? "title_port" : "title_port_light"}>
        Carbonible
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
            // data-aos="fade-up"
            // data-aos-duration="1000"
          >
            <ScrollEffect
              inViewProperties={{
                y: [30, 0],
                opacity: [0, 1],
              }}
              inViewDelay={0.2}
              inViewTransitionTime={0.8}
            >
              Carbonible emerges as a critical solution to confront the urgent
              and alarming issue of carbon emissions, one of the most pressing
              threats to our planet today. In a world without a platform like
              Carbonible, businesses would find themselves unable to fully
              leverage their low-carbon technologies and sustainable practices,
              resulting in a significant loss of potential carbon credits that
              could otherwise be employed to offset emissions in other sectors.{" "}
              <br /> <br />
              The current situation is dire, with an overwhelming volume of
              carbon emissions generated daily, causing irreversible harm to our
              environment and endangering the survival of our species.
              Carbonible extends a lifeline to businesses striving to reduce
              their carbon footprint and make a positive environmental impact.{" "}
              <br />
              <br />
              Without Carbonible, the financial barriers to adopting low-carbon
              technologies would remain insurmountable, leaving the potential
              benefits of these investments untapped. Carbonible stands as an
              indispensable tool for businesses committed to taking substantial
              action against climate change, contributing to a sustainable
              future for generations to come. The consequences of inaction loom
              too large to be ignored, and Carbonible offers a beacon of hope in
              an otherwise grim landscape.
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
                Generate, Trade & Retire Carbon Credit
              </div>

              <div className="w-full mb-[16px] lg:text-[24px] text-[20px] abstract-text">
                Generate Carbon credits from your green practices that are
                accredited by Standardized bodies such as Verra and iCR. Sell
                carbon credits in a regulated marketplace where you define the
                price.
              </div>
              <div className="w-full flex justify-start items-center gap-x-6 text-center py-8">
                <Link
                  className="tecknology-btn-1 px-2 py-1 text-sm lg:px-8 lg:py-4 lg:text-xl btn-tech primary"
                  target={"_blank"}
                  to={"https://ca-crew-frontend.vercel.app/"}
                >
                  Explore Product
                </Link>
              </div>
            </ScrollEffect>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center ">
            <img
              src={isDarkMode ? nibledash : one}
              className="w-[85%] feat_img"
              // data-aos="fade-down"
              // data-aos-duration="1000"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap feat_two">
          <div className="w-full lg:w-1/2 flex items-start feat_img_wrap">
            <img
              src={isDarkMode ? buycarbo : adtwo_light}
              className="w-[85%] feat_img"
              // data-aos="fade-up"
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
                Generate, Trade & Retire Carbon Credit
              </div>
              <div
                className="w-full mb-[16px] lg:text-[24px] text-[20px] abstract-text"
                // data-aos="fade-up"
                // data-aos-duration="1000"
              >
                Generate Carbon credits from your green practices that are
                accredited by Standardized bodies such as Verra and iCR. Sell
                carbon credits in a regulated marketplace where you define the
                price.
              </div>
              <div className="w-full flex justify-start items-center gap-x-6 text-center py-8">
                <Link
                  className="tecknology-btn-1 px-2 py-1 text-sm lg:px-8 lg:py-4 lg:text-xl btn-tech primary"
                  target={"_blank"}
                  to={"https://ca-crew-frontend.vercel.app/"}
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

export default PortfolioCarbonible;

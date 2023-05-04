import { Swiper, SwiperSlide } from "swiper/react";
import { roadMapProps } from "../sliderProps";
const RoadMapSlider = () => {
  return (
    <section id="roadmap">
      <div className="container">
        <h3
          className="fn__maintitle big"
          data-text="RoadMap"
          data-align="center"
        >
          RoadMap
        </h3>
        <div className="fn_cs_roadmap">
          <div className="step_holder">
            <div className="step_in" />
          </div>
          <div className="slider_holder">
            <Swiper {...roadMapProps} className="swiper-container">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 01</span>
                    <div className="item_in">

                      <p className="desc">
                        Release of BOXED website v1, including basic information on the project and Gen0 NFT collection.
                        Launch of BOXED Telegram group for community engagement and support.
                        Launch of BOXED Twitter account for project updates and announcements.
                        Minting of Gen0 NFT collection, part 1.

                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 02</span>
                    <div className="item_in">
                      <p className="desc">
                        Release of Whitepaper
                        Minting of Gen0 NFT collection, part 2.
                        Release of BOXED dapp v1, allowing to see trade status of each NFT, as well as the yield times for each one.
                        Deployment of $BXD token, providing a utility token for BOXED ecosystem.
                        Expansion of partnerships and collaborations to increase adoption of BOXED NFTs.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 03</span>
                    <div className="item_in">

                      <p className="desc">
                        Release of BOXED dapp v2, with enhanced features and functionalities.
                        Airdrop of BOXED NFTs to early supporters and community members.
                        Updated roadmap outlining future developments and goals for the project.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="item">
                    <span className="icon" />
                    <span className="phase">Phase 04</span>
                    <div className="item_in">
                      <p className="desc">
                        TBA
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RoadMapSlider;

"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

import HeadingText from "../../product/HeadingText";
import "../../product/productDetails/imageswiper/ImagesSwiper";

const CustomSwiper = ({
  data,
  cart,
  slide,
  theme,
  height,
  modules,
  category,
  platform,
  marginTop,
  hot_deal,
  handleCart,
  navigation,
  headingText,
  cardStarSize,
  isTestimonial,
  centeredSlides,
  marginVertical,
  setUpdatedCart,
  isShopByConcern,
  cardHeadingSize,
  marginHorizontal,
  isButtonDisabled,
  noOfSlidePerView,
  productBriefHeight,
  cardDescriptionSize,
  mutate,
  componentToBeRender: Component,
}) => {
  return (
    <>
      {data?.length > 0 && (
        <div className={`max-w-7xl m-auto ${hot_deal ? "" : "mb-10"}`}>
          <div className={`${marginTop && marginTop}`}>
            <HeadingText heading={category} />
          </div>
          {headingText && (
            <h3 className="font-semibold text-lg pb-4">{headingText}</h3> // To Show Heading Text
          )}
          <div className={`${marginHorizontal && marginHorizontal}`}>
            <Swiper
              loop={slide ? false : true} // Loop or not
              navigation={navigation} // to show navigation or not
              breakpoints={noOfSlidePerView[0]} // Breakpoints based on screen orientation
              autoplay={{
                delay: slide ? 3000 : 5000, // to automatically autoplay or not
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true, // to show pagination
              }}
              modules={modules} // to import modules
              className="mySwiper2"
              style={{ "--swiper-navigation-color": "blue" }}
            >
              {data.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className={`${
                    platform || isTestimonial || isShopByConcern ? "" : "px-2"
                  }`}
                >
                  <Component
                    cart={cart}
                    product={item} // product of component
                    theme={theme} // theme
                    mutate={mutate}
                    handleCart={handleCart}
                    centeredSlides={centeredSlides}
                    isBlogPage={false} // isBlogPage or not
                    isheight={height} // height of component image
                    setUpdatedCart={setUpdatedCart}
                    hot_deal={hot_deal} // to buy now hot deals
                    cardStarSize={cardStarSize} // size of the stars
                    headingSize={cardHeadingSize} // heading size of product
                    marginVertical={marginVertical} // margin vertical
                    isButtonDisabled={isButtonDisabled}
                    productBriefHeight={productBriefHeight} // height of product brief section
                    cardDescriptionSize={cardDescriptionSize} // height of product description section
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomSwiper;

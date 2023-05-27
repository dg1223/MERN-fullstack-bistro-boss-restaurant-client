import FoodCard from "../../../components/SectionTitle/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const OrderTab = ({ items }) => {
  // Pagination
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const itemsPerSlide = 6;
  const pageCount = Math.ceil(items.length / itemsPerSlide);
  const slides = [...new Array(pageCount).keys()];
  /* const numberOfSlides = arange(
    0,
    parseInt(Math.ceil(items.length / itemsPerSlide))
  ); */
  // console.log(numberOfSlides);

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        {/* {numberOfSlides.map((slideIndex) => ( */}
        {slides.map((slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="grid md:grid-cols-3 gap-10">
              {items
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((item) => (
                  <FoodCard key={item._id} item={item}></FoodCard>
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderTab;

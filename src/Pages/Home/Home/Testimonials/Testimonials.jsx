import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section>
      <SectionTitle
        subHeader={"What Our Clients Say "}
        header={"testimonials"}
      ></SectionTitle>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper my-20"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center mx-24 my-16">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              {/* TODO: Add icon as per Figma */}
              <p>{review.details}</p>
              <p className="py-8 text-2xl text-orange-400">{review.name}</p>
              <p></p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;

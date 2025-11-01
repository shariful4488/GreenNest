import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import bgImg from "../assets/bgimg.jpg";
import bgImg2 from "../assets/image.jpg";
import bgImg3 from "../assets/bgImg3.jpg";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import { Link } from "react-router";


const Banner = () => {
  const banners = [
    {
    id: 1,
    image: bgImg,
    title: "Refresh your space with the beauty of nature",
      subtitle:
        "Start your green journey with stunning, easy-care indoor plants that brighten any corner.",
    },
    {
      id: 2,
      image:bgImg2,
       
      title: "Bring freshness to every corner",
      subtitle:
        "Decorate your home with vibrant, air-purifying plants perfect for any space.",
    },
    {
      id: 3,
      image:
        bgImg3,
        title: "Cultivate tranquility with lush greenery",
      subtitle:
        "Discover the joy of nurturing plants that make your space calm and full of life.",
    },
  ];

  return (
    <div className="mx-auto w-full relative  h-[550px] md:h-[650px]">
      <Swiper
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="h-full"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
           
              <img
                src={slide.image}
                alt="Plant Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl">
                  {slide.subtitle}
                </p>
                <Link to="/plants" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition">
                  Explore Our Plants
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

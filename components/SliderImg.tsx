"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export function SliderImg() {
  const imgList = [
    { img: "/main/slide02.png", alt: "건물2" },
    { img: "/main/slide03.png", alt: "건물3" },
    { img: "/main/slide04.png", alt: "건물4" },
  ];
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {imgList.map((item, index) => (
          <SwiperSlide key={index}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image src={item.img} alt={item.alt} fill style={{ objectFit: "cover" }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

"use client";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import CommonSwiper from "../Swiper";

const listFilms = [
  {
    id: 1,
    banner:
      "https://www.themoviedb.org/t/p/w533_and_h300_bestv2/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  },
  {
    id: 2,
    banner:
      "https://media.themoviedb.org/t/p/original/fbGCmMp0HlYnAPv28GOENPShezM.jpg",
  },
  {
    id: 3,
    banner:
      "https://media.themoviedb.org/t/p/original/293Mo4GWf7Tl0TfAr5NFghqeMy7.jpg",
  },
];
export default function TopFilm() {
  return (
    <>
      <CommonSwiper slidePerViewResponsive={1} slidesPerView={1}>
        {listFilms.map((film) => {
          return (
            <SwiperSlide key={film.id}>
              <div className="w-full aspect-[2.3629]">
                <Image
                  src={film.banner}
                  alt=""
                  layout="fill"
                  objectFit="center"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </CommonSwiper>
    </>
  );
}

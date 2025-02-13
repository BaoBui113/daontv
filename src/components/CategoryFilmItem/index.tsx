"use client";
import icon_camera from "@/assets/icons/icon-camera-movie.svg";
import icon_play from "@/assets/icons/icon-play-button.svg";
import { IMovies } from "@/types";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import CommonSwiper from "../Swiper";
export default function CategoryFilmItem({
  title,
  listFilmCategories,
  slidesPerView,
}: {
  title: string;
  listFilmCategories: IMovies[];
  slidesPerView?: number;
}) {
  return (
    <div className="cursor-pointer">
      <div className="flex justify-between mb-6 items-center">
        <div className="flex gap-[10px] items-center">
          <Image src={icon_camera} alt="camera movie" width={32} height={32} />
          <span className="text-white font-semibold text-[32px] leading-[46px]">
            {title}
          </span>
        </div>
        <button className="bg-[#00C8FA] rounded w-[67px] h-[29px]">
          +더보기
        </button>
      </div>
      <CommonSwiper gap={"16px"} slidesPerView={slidesPerView ?? 1}>
        {listFilmCategories.map((film, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-2 font-medium text-white">
                <div className="relative group overflow-hidden cursor-pointer mb-2">
                  <Image
                    width={533}
                    height={300}
                    src={film.image}
                    alt=""
                    className="w-full h-[450px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#06060699] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Play button */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="relative w-[53px] h-[53px]">
                      <Image src={icon_play} alt="icon" fill />
                    </div>
                  </div>
                </div>

                <span className="text-2xl leading-7 font-medium">
                  {film.title}
                </span>
                {/* <span className="text-xl leading-6 text-[#A5A5A5]">
                  {film.des}
                </span> */}
              </div>
            </SwiperSlide>
          );
        })}
      </CommonSwiper>
    </div>
  );
}

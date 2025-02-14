"use client";
import search_icon from "@/assets/icons/icon-search.svg";
import logo from "@/assets/images/logo.svg";
import useScrollOpacity from "@/hook/useScroolOpacity";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
export default function Header() {
  const param = useParams();
  const [value, setValue] = useState(
    Array.isArray(param.id) ? param.id[0] : param.id || ""
  );
  const opacity = useScrollOpacity();
  const router = useRouter();
  const handleSearch = (value: string) => {
    if (!value) {
      router.push("/");
      return;
    }
    router.push(`/search/${decodeURIComponent(value as string)}`);
  };
  return (
    <div
      style={{ backgroundColor: `rgba(58, 58, 58, ${opacity})` }}
      className="bg-[#3A3A3A] z-50 gap-4 md:gap-0 h-[77px] px-4 left-0 right-0 top-0  md:rounded-[100px] md:h-[53px] fixed md:top-2 md:bottom-2 md:right-4 md:left-4 md:px-6 flex items-center justify-between"
    >
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative w-[95px] h-5 md:w-[152px] md:h-[33px] flex-shrink-0 cursor-pointer"
      >
        <Image src={logo} alt="logo" fill />
      </div>
      <div className="flex gap-3 md:gap-[10px] items-center pr-4 md:pr-8">
        <div className="relative max-w-[270px] w-full h-[37px]">
          <input
            value={decodeURIComponent(value as string)}
            onChange={(e) => {
              if (e.target.value === "") {
                router.push("/");
              }
              setValue(e.target.value);
            }}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(value);
              }
            }}
            className="w-full h-[37px] rounded-[35px] bg-[#323232] pl-4 pr-10 text-white focus:outline-none"
          />
          {value && (
            <div
              onClick={() => {
                setValue("");
                router.push("/");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              X
            </div>
          )}
        </div>

        <div
          onClick={() => {
            handleSearch(value);
          }}
          className="relative w-5 h-5 cursor-pointer"
        >
          <Image src={search_icon} alt="search-icon" fill />
        </div>
      </div>
    </div>
  );
}

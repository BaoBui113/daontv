import search_icon from "@/app/assets/icons/icon-search.svg";
import logo from "@/app/assets/images/logo.svg";
import Image from "next/image";
export default function Header() {
  return (
    <div className="bg-[#3A3A3A] z-50 gap-4 md:gap-0 h-[77px] px-4 left-0 right-0 top-0  md:rounded-[100px] md:h-[53px] fixed md:top-2 md:bottom-2 md:right-6 md:left-6 md:px-6 flex items-center justify-between">
      <div className="relative w-[95px] h-5 md:w-[152px] md:h-[33px] flex-shrink-0">
        <Image src={logo} alt="logo" fill />
      </div>
      <div className="flex gap-3 md:gap-[10px] items-center pr-4 md:pr-8">
        <div className="relative max-w-[270px] w-full h-[37px]">
          <input
            type="text"
            className="w-full h-[37px] rounded-[35px] bg-[#323232] pl-4 pr-10 text-white focus:outline-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
            X
          </div>
        </div>

        <div className="relative w-5 h-5">
          <Image src={search_icon} alt="search-icon" fill />
        </div>
      </div>
    </div>
  );
}

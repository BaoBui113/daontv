"use client";
import avatar_default from "@/assets/icons/icon_avatar_default.svg";
import Image from "next/image";

export default function PostComment() {
  return (
    <div className="flex gap-[14px]">
      <div className="relative w-9 h-9 rounded-full">
        <div className="w-9 h-9 bg-[#F1B0FC] rounded-full blur-[10px] absolute top-0 left-0" />
        <Image src={avatar_default} alt="avatar_default" fill />
      </div>
      <input
        style={{
          boxShadow: "0px 3.14px 7.53px 0px #00000040",
        }}
        type="text"
        className="w-full flex-1 bg-transparent rounded-[10px] h-9 px-2 text-white outline-none"
      />
    </div>
  );
}

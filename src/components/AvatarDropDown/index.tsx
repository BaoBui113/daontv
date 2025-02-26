"use client";

import { useAuth } from "@/context/AuthContext";
import useClickOutside from "@/hook/useClickOutSide";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function AvatarDropdown({ avatar }: { avatar: StaticImport }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const { logout } = useAuth();
  const toggleDropdown = () => setIsOpen(!isOpen);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  const handleLogout = () => {
    logout();
  };
  return (
    <div ref={dropdownRef} className="relative">
      <div
        className="relative w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleDropdown}
      >
        <Image
          src={avatar || "/placeholder.svg"}
          fill
          alt="avatar"
          className="rounded-full"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Hồ sơ
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cài đặt
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

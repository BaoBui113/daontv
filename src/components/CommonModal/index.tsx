"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,

  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  className?: string;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      setIsScrollable(modalRef.current.scrollHeight > window.innerHeight);
    }

    // When the modal is open, disable scrolling
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // When the modal is closed, reset overflow
      document.body.style.overflow = "";
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 z-40 flex ${
        isScrollable ? "items-start pt-4 pb-[70px]" : "items-center"
      } justify-center bg-black/50 w-screen h-screen overflow-y-auto`}
      onClick={handleClickOutside}
    >
      <div
        style={{
          borderRadius: "500px / 30px",
          boxShadow: "0px 0px 50px #773d05",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        ref={modalRef}
        className={`overflow-auto w-[500px] relative border-solid border-[2px] border-[#fee188] px-0 py-6 shadow-lg transition-transform duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-30"
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

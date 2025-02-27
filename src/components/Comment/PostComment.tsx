"use client";
import avatar_default from "@/assets/icons/icon_avatar_default.svg";
import { useModal } from "@/context/ModalContext";
import { postCommentService } from "@/services/comments";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
export default function PostComment({
  movie_id,
  fetchListComment,
  parent_id,
}: {
  movie_id: string;
  fetchListComment: () => void;
  parent_id?: string;
}) {
  const { handleShowModalLogin } = useModal();
  const [content, setContent] = useState("");
  const token = Cookies.get("movie_token");
  const handleSubmit = async () => {
    if (!token) {
      handleShowModalLogin();
      return;
    }
    try {
      await postCommentService(movie_id, content, token, parent_id);
      setContent("");
      fetchListComment();
    } catch {
      alert("Error");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className="flex gap-[14px]">
      <div className="relative w-9 h-9 rounded-full">
        <div className="w-9 h-9 bg-[#F1B0FC] rounded-full blur-[10px] absolute top-0 left-0" />
        <Image src={avatar_default} alt="avatar_default" fill />
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          boxShadow: "0px 3.14px 7.53px 0px #00000040",
        }}
        type="text"
        className="w-full flex-1 bg-transparent rounded-[10px] h-9 px-2 text-white outline-none"
      />
    </div>
  );
}

"use client";
import { useGetList } from "@/context/GetListContext";
import { getCommentService } from "@/services/comments";
import { useCallback, useEffect } from "react";
import ListComment from "./ListComment";
import PostComment from "./PostComment";

export default function Comment({ movie }: { movie: string }) {
  const { setListComments, listComment } = useGetList();
  const fetchListComment = useCallback(async () => {
    if (!movie) return;
    try {
      const res = await getCommentService(movie);
      setListComments(res.data ?? []);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  }, [movie]);

  useEffect(() => {
    fetchListComment();
  }, [fetchListComment]);
  return (
    <div className="my-1 bg-[#313131] rounded px-4 md:px-10 py-6 ">
      <p className="text-[#B7C6FF] font-semibold text-[32px] leading-9 border-b-[1px] border-[#1B1B1B] w-full pb-[10px] mb-[30px]">
        {listComment.length}개
      </p>
      <div className="border-b-[1px] border-[#1B1B1B] w-full pb-[30px] mb-[30px]">
        <PostComment movie_id={movie} fetchListComment={fetchListComment} />
      </div>
      <ListComment movie_id={movie} fetchListComment={fetchListComment} />
    </div>
  );
}

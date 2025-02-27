"use client";
import avatar_default from "@/assets/icons/icon_avatar_default.svg";
import { useGetList } from "@/context/GetListContext";
import { deleteCommentService } from "@/services/comments";
import { IComment } from "@/types";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import DeleteComment from "./DeleteComment";
import PostComment from "./PostComment";
const ActionButtons = ({
  itemId,
  toggleReplyInput,
  content,

  toggleDelete,
}: {
  itemId: string;
  toggleReplyInput: (id: string) => void;
  toggleDelete: (id: string) => void;
  content: string;
}) => (
  <>
    <p className="mb-[14px] font-light leading-5">{content}</p>
    <div className="flex gap-6 items-center text-[#8C8C8C] font-normal leading-5 text-base">
      <button
        onClick={() => {
          toggleDelete(itemId);
        }}
      >
        Remove
      </button>
      <button onClick={() => toggleReplyInput(itemId)}>Reply</button>
    </div>
  </>
);

const CommentItems = ({
  listComment,
  isParentComment,
  movie_id,
  fetchListComment,
}: {
  isParentComment?: boolean;
  listComment: IComment[];
  movie_id: string;
  fetchListComment: () => void;
}) => {
  const [replyStates, setReplyStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [deleteStates, setDeleteStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const toggleReplyInput = (id: string) => {
    setReplyStates((prev) => {
      const newState = { [id]: !prev[id] };
      return newState;
    });
    setDeleteStates(() => {
      const newState = { [id]: false };
      return newState;
    });
  };
  const toggleDelete = (id: string) => {
    setDeleteStates((prev) => {
      const newState = { [id]: !prev[id] };
      return newState;
    });
    setReplyStates(() => {
      const newState = { [id]: false };
      return newState;
    });
  };
  const handleCommentDelete = async (id: string) => {
    const token = Cookies.get("movie_token");
    if (!token) return;
    setIsLoadingDelete(true);
    try {
      await deleteCommentService(id, token);
      fetchListComment();
    } catch {
      alert("Error");
    } finally {
      setIsLoadingDelete(false);
    }
  };
  console.log("listComment", !!listComment[0].user_info.avatar);

  return (
    <>
      {listComment.map((item, index) => {
        return (
          <div
            className={
              isParentComment && listComment.length - 1 !== index
                ? "border-b-[1px] border-[#1B1B1B] mb-[30px]"
                : ""
            }
            key={index}
          >
            <div className="mb-[30px] flex flex-col gap-4">
              <div className="flex gap-4 md:items-start items-center">
                <div className="relative w-9 h-9 rounded-full flex-shrink-0">
                  <div className="w-9 h-9 bg-[#F1B0FC] rounded-full blur-[10px] absolute top-0 left-0" />
                  <Image
                    src={
                      !!item.user_info.avatar
                        ? item.user_info.avatar
                        : avatar_default
                    }
                    alt="avatar_default"
                    fill
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-6 md:gap-7 items-center mb-[10px]">
                    <span className="text-[#FF8A00] font-semibold text-lg leading-[22px] line-clamp-1">
                      {item.user_info.nickname}
                    </span>
                    <span className="text-[#8C8C8C] font-normal leading-5 text-base line-clamp-1 overflow-hidden">
                      {moment(item.updated_at).fromNow()}
                    </span>
                  </div>
                  <div className="md:block hidden">
                    <ActionButtons
                      content={item.content}
                      itemId={item.id}
                      toggleReplyInput={toggleReplyInput}
                      toggleDelete={toggleDelete}
                    />
                  </div>
                </div>
              </div>

              <div className="md:hidden block">
                <ActionButtons
                  content={item.content}
                  itemId={item.id}
                  toggleReplyInput={toggleReplyInput}
                  toggleDelete={toggleDelete}
                />
              </div>
            </div>
            {deleteStates[item.id] && (
              <div className="mb-8">
                <DeleteComment
                  handleCancel={() => toggleDelete(item.id)}
                  commentId={item.id}
                  handleCommentDelete={() => handleCommentDelete(item.id)}
                  isLoadingDelete={isLoadingDelete}
                />
              </div>
            )}
            {replyStates[item.id] && (
              <div className="mb-8">
                <PostComment
                  movie_id={movie_id}
                  fetchListComment={fetchListComment}
                  parent_id={item.id}
                />
              </div>
            )}
            {item.replies && item.replies.length > 0 && (
              <div className="ml-8 md:ml-[50px]">
                <CommentItems
                  movie_id={movie_id}
                  listComment={item.replies}
                  isParentComment={false}
                  fetchListComment={fetchListComment}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
export default function ListComment({
  movie_id,
  fetchListComment,
}: {
  movie_id: string;
  fetchListComment: () => void;
}) {
  const { listComment } = useGetList();

  return (
    <>
      <CommentItems
        listComment={listComment}
        isParentComment
        movie_id={movie_id}
        fetchListComment={fetchListComment}
      />
    </>
  );
}

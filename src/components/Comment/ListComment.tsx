"use client";
import avatar_default from "@/assets/icons/icon_avatar_default.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import PostComment from "./PostComment";
const listComment = [
  {
    id: 1,
    avatar: avatar_default,
    name: " 관리자 Jake",
    date: "2 days ago",
    content: `법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은
          헌법재판소에 제청하여 그 심판에 의하여 재판한다.`,
    subComment: [
      {
        id: 2,
        avatar: avatar_default,
        name: " 관리자 Jake 2",
        date: "3 days ago",
        content: `법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은
          헌법재판소에 제청하여 그 심판에 의하여 재판한다.`,
      },
      {
        id: 3,
        avatar: avatar_default,
        name: " 관리자 Jake 3",
        date: "3 days ago",
        content: `법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은
          헌법재판소에 제청하여 그 심판에 의하여 재판한다.`,
      },
    ],
  },
  {
    id: 4,
    avatar: avatar_default,
    name: "톰과란제리",
    date: "3 days ago",
    content: `법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은
          헌법재판소에 제청하여 그 심판에 의하여 재판한다.`,
  },
  {
    id: 5,
    avatar: avatar_default,
    name: "톰과란제리",
    date: "3 days ago",
    content: `법률이 헌법에 위반되는 여부가 재판의 전제가 된 경우에는 법원은
          헌법재판소에 제청하여 그 심판에 의하여 재판한다.`,
  },
];
const CommentItems = ({
  item,
  isParentComment,
  isLastComment,
}: {
  isParentComment?: boolean;
  isLastComment?: boolean;
  item: {
    id: number;

    avatar: StaticImport;
    name: string;
    date: string;
    content: string;
    subComment?: {
      id: number;
      avatar: StaticImport;
      name: string;
      date: string;
      content: string;
    }[];
  };
}) => {
  const [replyStates, setReplyStates] = useState<{ [key: number]: boolean }>(
    {}
  );
  const toggleReplyInput = (id: number) => {
    // setReplyStates((prev) => {
    //   const newState = Object.keys(prev).reduce((acc, key) => {
    //     acc[Number(key)] = false;
    //     return acc;
    //   }, {} as Record<number, boolean>);

    //   return { ...newState, [id]: !prev[id] };
    // });
    setReplyStates((prev) => {
      // Tạo một object mới với tất cả các ID đều là false
      const newState = { [id]: !prev[id] }; // Chỉ chuyển đổi trạng thái của ID được nhấp vào
      return newState;
    });
  };
  console.log("replyStates", replyStates);

  return (
    <div
      className={
        isParentComment && !isLastComment
          ? "border-b-[1px] border-[#1B1B1B] mb-[30px]"
          : ""
      }
    >
      <div className="flex gap-4 mb-[30px]">
        <div className="relative w-9 h-9 rounded-full">
          <div className="w-9 h-9 bg-[#F1B0FC] rounded-full blur-[10px] absolute top-0 left-0" />
          <Image src={item.avatar} alt="avatar_default" fill />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-7 items-center mb-[10px]">
            <span className="text-[#FF8A00] font-semibold text-lg leading-[22px]">
              {item.name}
            </span>
            <span className="text-[#8C8C8C] font-normal leading-5 text-base">
              {item.date}
            </span>
          </div>
          <span className="mb-[14px] font-light leading-5">{item.content}</span>
          <div className="flex gap-6 items-center text-[#8C8C8C] font-normal leading-5 text-base">
            <button>Remove</button>
            <button onClick={() => toggleReplyInput(item.id)}>Reply</button>
          </div>
        </div>
      </div>
      {replyStates[item.id] && (
        <div className="mb-8">
          <PostComment />
        </div>
      )}
      {item.subComment && item.subComment.length > 0 && (
        <div className="ml-[50px]">
          {item.subComment.map((subItem, index) => {
            return (
              <CommentItems
                item={subItem}
                key={index}
                isParentComment={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default function ListComment() {
  return (
    <>
      {listComment.map((item, index) => {
        return (
          <CommentItems
            isLastComment={listComment.length - 1 === index}
            isParentComment
            item={item}
            key={index}
          />
        );
      })}
    </>
  );
}

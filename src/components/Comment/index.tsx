import ListComment from "./ListComment";
import PostComment from "./PostComment";

export default function Comment() {
  return (
    <div className="my-1 bg-[#313131] rounded px-10 py-6 ">
      <p className="text-[#B7C6FF] font-semibold text-[32px] leading-9 border-b-[1px] border-[#1B1B1B] w-full pb-[10px] mb-[30px]">
        2개
      </p>
      <div className="border-b-[1px] border-[#1B1B1B] w-full pb-[30px] mb-[30px]">
        <PostComment />
      </div>
      <ListComment />
    </div>
  );
}

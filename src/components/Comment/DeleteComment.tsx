export default function DeleteComment({
  handleCancel,
  commentId,
  handleCommentDelete,
  isLoadingDelete,
}: {
  handleCancel: (commentId: string) => void;
  commentId: string;
  handleCommentDelete: (commentId: string) => void;
  isLoadingDelete: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 bg-white text-black  max-w-[200px] p-2 rounded">
      <span>Do you want to delete?</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleCancel(commentId)}
          className="bg-red-600 w-[100px] rounded-md text-white"
        >
          Cancel
        </button>
        <button
          disabled={isLoadingDelete}
          onClick={() => handleCommentDelete(commentId)}
          className="bg-blue-400 w-[100px] rounded-md text-white"
        >
          <div className="flex items-center justify-center">
            {isLoadingDelete && (
              <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
            )}

            <span>Delete</span>
          </div>
        </button>
      </div>
    </div>
  );
}


import React from "react";

interface commentInterface {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  postId: string;
  user: {
    name: string;
  };
}

interface CommentProps {
  comments: commentInterface;
}

export const CommentDisplay: React.FC<CommentProps> = ({ comments }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex shadow-lg px-4 w-full lg:w-[75%] justify-start items-center">
        <span
          className="w-10 h-10 mr-4 bg-orange-300 flex justify-center items-center rounded-full text-xl font-bold"
          style={{ flexShrink: 0 }}
        >
          {comments.user.name[0].toUpperCase()}
        </span>
        <div className="flex-1">
          <div className="space-x-2">
            <span>{comments.user.name}</span>
            <span>
              {comments.createdAt
                ? new Date(comments.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : ''}
            </span>
          </div>
          <p>{comments.content}</p>
        </div>
      </div>
    </div>
  );
};

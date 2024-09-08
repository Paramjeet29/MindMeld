
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface CommentInterface {
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
  comments: CommentInterface;
  handleDelete: (commentId: string) => Promise<void>;
}

export const ProfileCommentDisplay: React.FC<CommentProps> = ({ comments, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteClick = async () => {
    setIsDeleting(true);
    try {
      await handleDelete(comments.id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-2 items-center mb-4">
      <div className="flex shadow-lg px-1 py-3 w-full rounded-lg bg-orange-200">
        <span
          className="w-10 h-10 mr-4 bg-orange-300 flex justify-center items-center rounded-full text-xl font-bold"
          style={{ flexShrink: 0 }}
        >
          {comments.user.name[0].toUpperCase()}
        </span>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className='font-semibold uppercase mr-2'>{comments.user.name}</span>
              <span className='text-sm text-gray-500'>
                {comments.createdAt
                  ? new Date(comments.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </span>
            </div>
            <button
              onClick={onDeleteClick}
              className="text-red-500 -translate-x-4 hover:text-red-700 transition-colors duration-200"
              disabled={isDeleting}
            >
              <FontAwesomeIcon 
                icon={faTrashCan} 
                className={isDeleting ? 'animate-spin' : ''} 
              />
              <span className="sr-only">Delete comment</span>
            </button>
          </div>
          <p className='text-sm text-gray-700'>{comments.content}</p>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
const timeAgo = (date: string): string => {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes === 0) {
        return 'Just now';
      }
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

interface BlogInterface {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
  };
}

interface BlogcardProps {
  blog: BlogInterface;
  fetchLikes: (blogId: string) => Promise<number>;
  blogClick: (blogId: string) => void;
}

export const Blogcard: React.FC<BlogcardProps> = ({ blog, fetchLikes, blogClick }) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const getLikes = async () => {
      const likesCount = await fetchLikes(blog.id);
      setLikes(likesCount);
      checkIfLiked(blog.id); // Check if the blog is liked by the user
    };
    getLikes();
  }, [blog.id, fetchLikes]);

  const checkIfLiked = async (blogId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`https://backend.paramjeetxapp.workers.dev/api/v1/blog/like/${blogId}`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      if (response.data.length > 0) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error(`Error checking if blog ${blogId} is liked:`, error);
    }
  };

  const handleLikeToggle = async () => {
    const token = localStorage.getItem('authToken');
    try {
      if (isLiked) {
        await axios.delete(`https://backend.paramjeetxapp.workers.dev/api/v1/blog/like/${blog.id}`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        setLikes(likes - 1);
      } else {
        await axios.post(`https://backend.paramjeetxapp.workers.dev/api/v1/blog/like`, 
        { postId: blog.id },
        {
          headers: {
            'Authorization': `${token}`
          }
        });
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(`Error toggling like for blog ${blog.id}:`, error);
    }
  };

  return (
    blog.published && (
      <div className="relative p-4 h-[250px] md:h-[200px] border-b-2 hover:-translate-y-1 shadow-lg font-mono bg-orange-200 transition-all duration-300 ease-in-out hover:bg-orange-300 hover:shadow-2xl">
        <div onClick={() => blogClick(blog.id)}>
          <div className="flex max-w-full justify-center items-center mb-2">
            <button className="space-x-1">
              <span className="flex w-8 h-8 bg-orange-400 justify-center items-center rounded-full">
                {blog.author.name[0].toUpperCase()}
              </span>
              <p className="flex w-6 justify-center items-center text-sm text-yellow-800 font-semibold">
                @{blog.author.name}
              </p>
            </button>
          </div>
          <div>
            <p className="text-xl font-bold font-serif text-yellow-950 break-words">
              {blog.title.length > 30 ? blog.title.toUpperCase().slice(0, 30) + " ....." : blog.title.toUpperCase()}
            </p>
            <p className="text-yellow-900 text-sm font-serif h-auto pb-5 break-words">
              {blog.content.length > 150 ? blog.content.slice(0, 150) + " ....." : blog.content}
            </p>
            <p className="absolute bottom-2 right-4 text-xs text-gray-500">{timeAgo(blog.createdAt)}</p>
            <p className="absolute bottom-2 left-2 text-xs text-gray-700">{`${Math.ceil(blog.content.length / 100)} minute(s) read`}</p>
          </div>
        </div>

        <button className="absolute bottom-2 left-[148px] text-xs text-gray-700">{likes}</button>
        <div className="absolute bottom-2 left-[130px]">
          <label className="container relative block cursor-pointer text-2xl user-select-none transition duration-100 ease-in-out">
            <input 
              type="checkbox" 
              className="absolute opacity-0 cursor-pointer h-0 w-0 peer" 
              checked={isLiked} 
              onChange={handleLikeToggle} 
            />
            <div className="checkmark w-4 h-4 transition duration-100 ease-in-out peer-checked:animate-like_effect peer-checked:[&_path]:fill-orange-500 peer-checked:[&_path]:stroke-0 ">
              <svg viewBox="0 0 256 256" className="w-full h-full stroke-gray-700 hover:stroke-orange-500">
                <rect fill="none" height="256" width="256"></rect>
                <path 
                  d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" 
                  strokeWidth="20px" 
                  stroke="" 
                  fill="none">
                </path>
              </svg>
            </div>
          </label>
        </div>
      </div>
    )
  );
};


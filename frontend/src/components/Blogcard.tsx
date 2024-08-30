import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
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
}

const Blogcard: React.FC<BlogcardProps> = ({ blog }) => {
  return (
    blog.published && (
      <div className="relative p-4 h-[250px] md:h-[200px] border-b-2 hover:-translate-y-1  shadow-lg font-mono bg-orange-200 transition-all duration-300 ease-in-out hover:bg-orange-300 hover:shadow-2xl">
        <div className="flex max-w-full justify-center items-center mb-2">
          <button className="space-x-1">
            <span className="flex w-8 h-8 bg-orange-400 justify-center items-center rounded-full">{blog.author.name[0].toUpperCase()}</span>
            <p className="flex w-6 justify-center items-center text-sm text-yellow-800 font-semibold">@{blog.author.name }</p>
          </button>
        </div>
        <p className="text-xl font-bold font-serif text-yellow-950 break-words">{blog.title.length > 30 ? blog.title.toUpperCase().slice(0, 30) + " ....." : blog.title.toUpperCase()}</p>
        <p className="text-yellow-900 text-sm font-serif h-auto pb-5 break-words">{blog.content.length > 150 ? blog.content.slice(0, 150) + " ....." : blog.content}</p>
        {/* <p className="absolute bottom-2 left-4 text-xs text-gray-500">{timeAgo(blog.createdAt)}</p> */}
        <p className="absolute bottom-2 left-2 text-xs text-gray-700">{`${Math.ceil(blog.content.length / 100)} minute(s) read`} </p>
        <button className="absolute bottom-2 left-32 text-xs text-gray-700">Like</button>
        <button className="absolute bottom-2 left-[165px] text-xs text-gray-700">comment</button>
        {/* <p className='absolute right-2 bottom-2 text-gray-500 text-xs'>{timeAgo(blog.createdAt)}</p> */}
      </div>
    )
  );
};

export { Blogcard };

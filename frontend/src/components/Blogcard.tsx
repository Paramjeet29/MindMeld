import React from 'react';

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
      <div   className="relative p-4 mb-2 h-auto  border-b-2 rounded shadow font-mono bg-orange-200">
        <div className='flex  max-w-full justify-center items-center mb-2 '>
          <button className='space-x-1' >
            <span className=' flex w-8 h-8 bg-orange-400 justify-center items-center rounded-full'>{blog.author.name[0].toUpperCase()}</span>
            <p className="flex w-6 justify-center items-center text-sm text-yellow-800 font-semibold">@{blog.author.name}</p>
          </button>
        </div>
        <h2 className="text-xl font-bold font-serif">{blog.title.toUpperCase()}</h2>
        <p className='text-yellow-900 font-serif pb-5'>{blog.content}</p>
        <p className="absolute bottom-2 left-4 text-xs text-gray-500 ">{timeAgo(blog.createdAt)}</p>
      </div>
          
          
    )
  );
};

export { Blogcard };

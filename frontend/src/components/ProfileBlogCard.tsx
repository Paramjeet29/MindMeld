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
  
}

interface BlogcardProps {
  blog: BlogInterface;
}

const ProfileBlogCard: React.FC<BlogcardProps> = ({blog }) => {
    console.log(blog);
  return (
    <div className='flex items-center justify-center '>
    <div className="relative w-[98%]  flex h-[150px]  md:h-[230px]  p-4 mb-2  border-b-2 hover:-translate-y-1  shadow-lg font-mono bg-orange-200 transition-all duration-300 ease-in-out hover:bg-orange-300 hover:shadow-2xl">
    <div className="flex flex-col  w-full  items-center mb-2">
        <p className="md:text-lg text-xs font-bold font-serif text-yellow-950 break-words max-w-full">
            {blog.title.length > 10 ? blog.title.toUpperCase().slice(0, 10) + " ....." : blog.title.toUpperCase()}
        </p>
        <p className="text-yellow-900 w-full text-xs md:text-sm font-serif pb-5 break-words max-w-full overflow-hidden text-ellipsis">
            {blog.content.length > 100 ? blog.content.slice(0, 100) + " ....." : blog.content}
        </p>
        <p className="absolute bottom-2 left-4 text-xs text-gray-500">{timeAgo(blog.createdAt)}</p>
    </div>
    </div>
    </div>
  );
};

export { ProfileBlogCard };

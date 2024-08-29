
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ProfileBlogCard } from "../components/ProfileBlogCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: string;
}

export const Myblog = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const publishedRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchingBlogs = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost", {
          id: user.id
        });
        console.log("response", response.data);
        if (response.data) {
          setData(response.data[0].posts || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingBlogs();
  }, [user?.id]);

  const publishedPosts = data.filter((post) => post.published);
  const draftPosts = data.filter((post) => !post.published);

  if (isLoading) {
    return <Loader />;
  }

  const handleBlogClick = (id: string) => {
    navigate(`/myblogdetails/${id}`);
  }

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 400; 
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="h-auto mt-10 selection:bg-orange-400">
      <div className="w-full flex my-6 flex-col justify-center items-center">
        {publishedPosts.length > 0 && (
          <div className="w-full px-2 md:w-[60%] mb-6  ">
            <div className="uppercase  md:text-2xl  font-bold  mb-1 text-center flex md:ml-10">
            
              <section className="relative flex justify-center items-center">
                <div
                  className="group flex justify-center transition-all rounded-full underline p-1 hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer"
                >
                  Published Posts
                  <span
                    className="absolute text-slate-700 opacity-0 w-[120px] group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-1 duration-700 text-xs md:text-sm "
                    >view all </span>
                </div>
              </section>

            
            </div>
            <div className="relative">
              <div ref={publishedRef} className="flex overflow-x-hidden scrollbar-hide scroll-smooth">
                {publishedPosts.map((post) => (
                  <div key={post.id} className="hover:cursor-pointer flex-none w-[400px] mr-0" onClick={() => handleBlogClick(post.id)}>
                    <ProfileBlogCard blog={post} />
                  </div>
                ))}
              </div>
              {publishedPosts.length > 3 && (
                <>
                  <button onClick={() => scroll('left', publishedRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 md:-translate-x-10  bg-white bg-opacity-50 p-2 rounded-full">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={() => scroll('right', publishedRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-x-10 bg-white bg-opacity-50 p-2 rounded-full">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {draftPosts.length > 0 && (
          <div className="w-full px-2 md:w-[60%] ">
            <div className="uppercase  md:text-2xl font-bold text-sm mb-1 text-center flex  md:ml-10">
              <section className="relative flex justify-center items-center">
                <div
                  className="group flex justify-center transition-all rounded-full  p-1 hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer underline "
                >
                  Draft Posts
                  <span
                    className="absolute text-slate-700 opacity-0 w-[120px] group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-2 duration-700 text-xs md:text-sm"
                    >view all </span>
                </div>
                </section>
            </div>
            <div className="relative">
              <div ref={draftRef} className="flex overflow-x-hidden scrollbar-hide scroll-smooth">
                {draftPosts.map((post) => (
                  <div key={post.id} className="hover:cursor-pointer flex-none w-[400px] mr-0" onClick={() => handleBlogClick(post.id)}>
                    <ProfileBlogCard blog={post} />
                  </div>
                ))}
              </div>
              {draftPosts.length > 3 && (
                <>
                  <button onClick={() => scroll('left', draftRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 md:-translate-x-10  bg-white bg-opacity-50 p-2 rounded-full">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={() => scroll('right', draftRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-x-10  bg-white bg-opacity-50 p-2 rounded-full">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {publishedPosts.length === 0 && draftPosts.length === 0 && (
          <p className="text-center text-gray-500">You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};


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
  const [showChevronPublished, setShowChevronPublished] = useState(false);
  const [showChevronDraft, setShowChevronDraft] = useState(false);

  useEffect(() => {
    const fetchingBlogs = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost", {
          id: user.id
        });
        if (response.data) {
          const sortedBlogs = response.data[0].posts.sort(
            (a: BlogData, b: BlogData) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setData(sortedBlogs || []);
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

  useEffect(() => {
    const checkScrollOverflow = () => {
      if (publishedRef.current) {
        setShowChevronPublished(
          publishedRef.current.scrollWidth > publishedRef.current.clientWidth
        );
      }
      if (draftRef.current) {
        setShowChevronDraft(
          draftRef.current.scrollWidth > draftRef.current.clientWidth
        );
      }
    };

    checkScrollOverflow();
    window.addEventListener("resize", checkScrollOverflow);

    return () => window.removeEventListener("resize", checkScrollOverflow);
  }, [publishedPosts, draftPosts]);

  if (isLoading) {
    return <Loader />;
  }

  const handleBlogClick = (id: string) => {
    navigate(`/myblogdetails/${id}`);
  };

  const scroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePublishAll = () => {
    navigate("/mypublishedblogs");
  };

  const handleDraftAll = () => {
    navigate("/mydraftblogs");
  };

  const fetchLikesForBlog = async (blogId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://backend.paramjeetxapp.workers.dev/api/v1/blog/like/${blogId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return response.data.length;
    } catch (error) {
      console.error(`Error fetching likes for blog ${blogId}:`, error);
      return 0;
    }
  };

  const renderBlogSection = (
    title: string,
    posts: BlogData[],
    ref: React.RefObject<HTMLDivElement>,
    handleViewAll: () => void,
    showChevron: boolean
  ) => (
    <div className="w-full px-2 mb-4 relative">
      <div className="uppercase text-xl md:text-2xl font-bold mb-1 text-center flex justify-start">
        <section onClick={handleViewAll} className="relative flex justify-center items-center">
          <div className="group flex justify-center font-mono transition-all rounded-full underline p-1 hover:-translate-y-1 hover:text-orange-800 cursor-pointer ml-8">
            {title}
            <span className="absolute text-slate-700 opacity-0 w-[120px] group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-1 duration-700 text-xs md:text-sm">
              view all
            </span>
          </div>
        </section>
      </div>
      <div className="relative">
        <div
          ref={ref}
          className="flex overflow-x-auto scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-orange-300 scrollbar-thumb-rounded-3xl scrollbar-track-orange-200"
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="hover:cursor-pointer flex-none md:h-[230px] h-[250px] mx-2"
            >
              <ProfileBlogCard blog={post} blogClick={handleBlogClick} fetchLikes={fetchLikesForBlog} />
            </div>
          ))}
        </div>
        {showChevron && posts.length > 1 && (
          <>
            <button
              onClick={() => scroll("left", ref)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full min-[0px]:block max-[965px]:hidden"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right", ref)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-auto mt-4 selection:bg-orange-400">
      <div className="w-full flex flex-col justify-center items-center">
        {publishedPosts.length > 0 &&
          renderBlogSection("Published Posts", publishedPosts, publishedRef, handlePublishAll, showChevronPublished)}
        {draftPosts.length > 0 &&
          renderBlogSection("Draft Posts", draftPosts, draftRef, handleDraftAll, showChevronDraft)}
        {publishedPosts.length === 0 && draftPosts.length === 0 && (
          <p className="text-center text-gray-500">You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

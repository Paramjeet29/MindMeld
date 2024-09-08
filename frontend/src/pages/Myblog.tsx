// import { useContext, useEffect, useState, useRef } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { ProfileBlogCard } from "../components/ProfileBlogCard";
// import Loader from "../components/Loader";
// import { useNavigate } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface BlogData {
//   id: string;
//   title: string;
//   content: string;
//   published: boolean;
//   createdAt: string;
//   authorId: string;
// }

// export const Myblog = () => {
//   const { user } = useContext(AuthContext);
//   const [data, setData] = useState<BlogData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const publishedRef = useRef<HTMLDivElement>(null);
//   const draftRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchingBlogs = async () => {
//       if (!user?.id) return;
//       try {
//         setIsLoading(true);
//         const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost", {
//           id: user.id
//         });
//         if (response.data) {
//           const sortedBlogs = response.data[0].posts.sort(
//             (a: BlogData, b: BlogData) =>
//               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//           );
//           setData(sortedBlogs || []);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchingBlogs();
//   }, [user?.id]);

//   const publishedPosts = data.filter((post) => post.published);
//   const draftPosts = data.filter((post) => !post.published);

//   if (isLoading) {
//     return <Loader />;
//   }

//   const handleBlogClick = (id: string) => {
//     navigate(`/myblogdetails/${id}`);
//   }

//   const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
//     if (ref.current) {
//       const scrollAmount = ref.current.clientWidth * 1; 
//       ref.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const handlePublishAll = () => {
//     navigate("/mypublishedblogs");
//   }

//   const handleDraftAll = () => {
//     navigate("/mydraftblogs");
//   }

//   const renderBlogSection = (title: string, posts: BlogData[], ref: React.RefObject<HTMLDivElement>, handleViewAll: () => void) => (
//     <div className="w-full px-2 mb-4 relative">
//       <div className="uppercase text-xl md:text-2xl font-bold mb-1 text-center flex justify-center">
//         <section onClick={handleViewAll} className="relative flex justify-center items-center">
//           <div className="group flex justify-center font-mono transition-all rounded-full underline p-1 hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer">
//             {title}
//             <span className="absolute text-slate-700 opacity-0 w-[120px] group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-1 duration-700 text-xs md:text-sm">
//               view all
//             </span>
//           </div>
//         </section>
//       </div>
//       <div className="relative">
//         <div 
//           ref={ref} 
//           className={`
//             flex
//             ${posts.length > 1 ? 'justify-start overflow-x-auto' : 'justify-center'}
//             ${posts.length > 2 ? 'md:justify-start md:overflow-x-auto' : 'md:justify-center'}
//             ${posts.length > 4 ? 'lg:justify-start lg:overflow-x-auto' : 'lg:justify-start'}
//             scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-orange-300 scrollbar-thumb-rounded-3xl scrollbar-track-orange-200 
//           `}
//         >
//           {posts.map((post) => (
//             <div key={post.id} className={` hover:cursor-pointer flex-none md:w-[330px] sm:w-[290px] md:h-[220px] sm:h-[250px]`} onClick={() => handleBlogClick(post.id)}>
//               <ProfileBlogCard blog={post} />
//             </div>
//           ))}
//         </div>
//         {posts.length > 1 && (
//           <>
//             <button onClick={() => scroll('left', ref)} className={`
//                 absolute left-0 top-1/2 transform -translate-y-1/2 
//                 bg-white bg-opacity-50 p-2 rounded-full
//                 ${posts.length <= 4 ? 'lg:hidden' : ''}
//               `}>
//               <ChevronLeft size={24} />
//             </button>
//             <button onClick={() => scroll('right', ref)} className={`
//               absolute right-0 top-1/2 transform -translate-y-1/2 
//               bg-white bg-opacity-50 p-2 rounded-full
//               ${posts.length <= 4 ? 'lg:hidden' : ''}
//             `}>
//               <ChevronRight size={24} />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="h-auto mt-4 selection:bg-orange-400">
//       <div className="w-full flex flex-col justify-center items-center">
//         {publishedPosts.length > 0 && renderBlogSection("Published Posts", publishedPosts, publishedRef, handlePublishAll)}
//         {draftPosts.length > 0 && renderBlogSection("Draft Posts", draftPosts, draftRef, handleDraftAll)}
//         {publishedPosts.length === 0 && draftPosts.length === 0 && (
//           <p className="text-center text-gray-500">You haven't created any posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };
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

  if (isLoading) {
    return <Loader />;
  }

  const handleBlogClick = (id: string) => {
    navigate(`/myblogdetails/${id}`);
  }

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 1; 
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePublishAll = () => {
    navigate("/mypublishedblogs");
  }

  const handleDraftAll = () => {
    navigate("/mydraftblogs");
  }
  const fetchLikesForBlog = async (blogId: string) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://backend.paramjeetxapp.workers.dev/api/v1/blog/like/${blogId}`, {
            headers: {
                'Authorization': `${token}`
            }
        });
        return response.data.length;
    } catch (error) {
        console.error(`Error fetching likes for blog ${blogId}:`, error);
        return 0;
    }
  };
  const renderBlogSection = (title: string, posts: BlogData[], ref: React.RefObject<HTMLDivElement>, handleViewAll: () => void) => (
    <div className="w-full px-2 mb-4 relative">
      <div className="uppercase text-xl md:text-2xl font-bold mb-1 text-center flex justify-center">
        <section onClick={handleViewAll} className="relative flex justify-center items-center">
          <div className="group flex justify-center font-mono transition-all rounded-full underline p-1 hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer">
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
          className={`
            flex
            ${posts.length > 1 ? 'justify-start overflow-x-auto' : 'justify-center'}
            ${posts.length > 2 ? 'md:justify-start md:overflow-x-auto' : 'md:justify-center'}
            ${posts.length > 4 ? 'lg:justify-start lg:overflow-x-auto' : 'lg:justify-center'}
            scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-orange-300 scrollbar-thumb-rounded-3xl scrollbar-track-orange-200 
          `}
        >
          {posts.map((post) => (
            <div key={post.id} className={`hover:cursor-pointer flex-none  md:h-[230px] h-[250px] mx-1
              ${posts.length==1?'md:w-[30%] w-[90%]':''}
              ${posts.length==2?'md:w-[30%] w-[90%]':''}
              ${posts.length==3?'md:w-[30%] w-[90%]':''}
            `}>
              <ProfileBlogCard blog={post} blogClick={handleBlogClick}   fetchLikes={fetchLikesForBlog} />
            </div>
          ))}
        </div>
        {posts.length > 1 && (
          <>
            <button onClick={() => scroll('left', ref)} className={`
                absolute left-0 top-1/2 transform -translate-y-1/2 
                bg-white bg-opacity-50 p-2 rounded-full
                ${posts.length < 3 ? 'md:hidden' : ''}
              `}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right', ref)} className={`
              absolute right-0 top-1/2 transform -translate-y-1/2 
              bg-white bg-opacity-50 p-2 rounded-full
              ${posts.length < 3 ? 'md:hidden' : ''}
            `}>
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
        {publishedPosts.length > 0 && renderBlogSection("Published Posts", publishedPosts, publishedRef, handlePublishAll)}
        {draftPosts.length > 0 && renderBlogSection("Draft Posts", draftPosts, draftRef, handleDraftAll)}
        {publishedPosts.length === 0 && draftPosts.length === 0 && (
          <p className="text-center text-gray-500">You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
};
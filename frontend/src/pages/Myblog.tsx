// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";
// import { ProfileBlogCard } from "../components/ProfileBlogCard";
// import Loader from "../components/Loader";
// import { useNavigate } from "react-router-dom";

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
//   const navigate=useNavigate();

//   useEffect(() => {
//     const fetchingBlogs = async () => {
//       if (!user?.id) return;
//       try {
//         setIsLoading(true);
//         const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost", {
//           id: user.id
//         });
//         console.log("response", response.data);
//         if (response.data) {
//           setData(response.data[0].posts || []);
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

//   const handleBlogClick = (id:string) =>{
//     navigate(`/myblogdetails/${id}`);
//   }

//   return (
//     <div className="h-auto mt-10 selection:bg-orange-400">
//       <div className="w-full flex my-6 flex-col justify-center items-center">
//         {publishedPosts.length > 0 && (
//           <div className="w-full px-2 md:w-3/4 mb-6 ">
//             <div className="uppercase font-mono md:text-3xl  hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer font-bold underline mb-4 text-center flex ml-10 ">
//               Published 
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {publishedPosts.map((post) => (
//                 <div onClick={()=>handleBlogClick(post.id)} key={post.id}>
//                   <ProfileBlogCard blog={post} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {draftPosts.length > 0 && (
//           <div className="w-full px-2 md:w-3/4">
//             <div className="uppercase font-mono md:text-3xl font-bold text-sm hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer underline mb-4 text-center flex ml-10">
//               Draft
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {draftPosts.map((post) => (
//                 <div key={post.id} onClick={()=>handleBlogClick(post.id)} >
//                   <ProfileBlogCard blog={post} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
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
      const scrollAmount = 300; // Adjust this value to change scroll distance
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
          <div className="w-full px-2 md:w-3/4 mb-6  ">
            <div className="uppercase font-mono md:text-3xl hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer font-bold underline mb-4 text-center flex md:ml-10">
            
              <section className="relative flex justify-center items-center">
                <div
                  className="group flex justify-center transition-all rounded-full  p-1"
                >
                  Publish
                  <span
                    className="absolute text-slate-700 opacity-0 w-[120px] group-hover:opacity-100 group-hover:-translate-y-5 duration-700 text-sm"
                    >view all posts</span>
                </div>
              </section>

            
            </div>
            <div className="relative">
              <div ref={publishedRef} className="flex overflow-x-hidden scrollbar-hide scroll-smooth">
                {publishedPosts.map((post) => (
                  <div key={post.id} className="hover:cursor-pointer flex-none w-64 mr-4" onClick={() => handleBlogClick(post.id)}>
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
          <div className="w-full px-2 md:w-3/4 ">
            <div className="uppercase font-mono md:text-3xl font-bold text-sm hover:-translate-y-1 hover:text-orange-800 hover:cursor-pointer underline mb-4 text-center flex  md:ml-10">
              Draft
            </div>
            <div className="relative">
              <div ref={draftRef} className="flex overflow-x-hidden scrollbar-hide scroll-smooth">
                {draftPosts.map((post) => (
                  <div key={post.id} className="hover:cursor-pointer flex-none w-64 mr-4" onClick={() => handleBlogClick(post.id)}>
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

// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Blogcard } from "../components/Blogcard";
// import Loader from "../components/Loader";
// import Pagination from "../components/Pagination";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// interface blogInterface {
//     id: string;
//     title: string;
//     content: string;
//     published: boolean;
//     createdAt: string;
//     authorId: string;
//     author: {
//         name: string;
//     };
// }

// export const Blogs = () => {
//     // const {user}=useContext(AuthContext)
//     const [blogs, setBlogs] = useState<blogInterface[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage, SetPostsPerPage] = useState(10);
//     const navigate=useNavigate();
//     useEffect(() => {
//         const fetchDetails = async () => {
//             const token = localStorage.getItem('authToken');
//             try {
//                 const response = await axios.get("https://backend.paramjeetxapp.workers.dev/api/v1/blog/bulk", {
//                     headers: {
//                         'Authorization': `${token}`
//                     }
//                 });
//                 const sortedBlogs = response.data.sort(
//                     (a: blogInterface, b: blogInterface) =>
//                         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//                 );
//                 setBlogs(sortedBlogs);
//             } catch (error) {
//                 if(blogs.length === 0)
//                     setError("No blog exists")
//                 else
//                     setError("Failed to load blogs.");
//                 console.error("Error fetching blog details:", error);
                
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDetails();
//     }, []);

//     if (loading) {
//         return( 
//         <Loader/>
//         )
//     }

//     const indexOfLastBlog = currentPage * postsPerPage;
//     const indexOfFirstBlog = indexOfLastBlog - postsPerPage;
//     const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
//     const handlePagination = (pageNumber:number) => {
//       setCurrentPage(pageNumber);
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
    
//     const handleBlogClick = async(id:string) =>{
//         navigate(`/blog/${id}`);
//     }

//     return (
//         <div className="relative flex flex-col mb-[50px] flex-wrap mt-7 items-center justify-center bg-color-200 selection:bg-orange-400 ">
//             <div className="mx-4 flex-row w-[90%] md:w-[80%] lg:w-[50%]">
//                 {error ? (  
//                     <p className="text-red-500">{error}</p>
//                 ) : blogs.length === 0 ? (
//                     <p>No blogs to show</p>
//                 ) : (
//                     currentBlogs.map((blog) => (
//                         <div className=" cursor-pointer"  key={blog.id}>
//                             <div onClick={()=>handleBlogClick(blog.id)}>
//                             {/* <div> */}
//                             <Blogcard  blog={blog} />
//                             </div>
//                         </div> 
//                     ))
//                 )}
//             </div>
            
//             <div className=" translate-y-10 absolute inset-x-0 bottom-0 flex justify-center items-center ">
//                 <div >
//                     <Pagination length={blogs.length} postsPerPage={postsPerPage} handlePagination={handlePagination} currentPage={currentPage} />
//                 </div>
//             </div>
//         </div>
        
//     );
// };
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Blogcard } from "../components/Blogcard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


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

export const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get("https://backend.paramjeetxapp.workers.dev/api/v1/blog/bulk", {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                const sortedBlogs = response.data.sort(
                    (a: BlogInterface, b: BlogInterface) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setBlogs(sortedBlogs);
                setCurrentPage(1);
            } catch (error) {
                setError(blogs.length === 0 ? "No blog exists" : "Failed to load blogs.");
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    if (loading) {
        return <Loader />;
    }

    const indexOfLastBlog = currentPage * postsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - postsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBlogClick = (id: string) => {
        navigate(`/blog/${id}`);
        
    };
    

    return (
        <div className="flex flex-col min-h-screen bg-color-200 selection:bg-orange-400">
            <div className="flex-grow container mx-auto px-4 pt-5">
                <div className="max-w-3xl mx-auto">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : blogs.length === 0 ? (
                        <p>No blogs to show</p>
                    ) : (
                        currentBlogs.map((blog) => (
                            <div className="cursor-pointer mb-1" key={blog.id} onClick={() => handleBlogClick(blog.id)}>
                                <Blogcard blog={blog} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {blogs.length > postsPerPage && (
                <div className=" flex justify-center items-center bottom-0 w-full shadow-md py-1">
                    <div className="max-w-3xl mx-auto">
                        <Pagination
                            length={blogs.length}
                            postsPerPage={postsPerPage}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
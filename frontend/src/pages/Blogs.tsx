
import { useEffect, useState } from "react";
import axios from "axios";
import { Blogcard } from "../components/Blogcard";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Pagination from "../components/Pagination";
interface blogInterface {
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
    const [blogs, setBlogs] = useState<blogInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPge, SetPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get("https://backend.paramjeetxapp.workers.dev/api/v1/blog/bulk", {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                console.log(response.data)
                const sortedBlogs = response.data.sort(
                    (a: blogInterface, b: blogInterface) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setBlogs(sortedBlogs);
            } catch (error) {
                if(blogs.length === 0)
                    setError("No blog exists")
                else
                    setError("Failed to load blogs.");
                console.error("Error fetching blog details:", error);
                
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    if (loading) {
        return( <div className="w-full mt-7 flex justify-center items-center">
        <SkeletonTheme baseColor="#FED7AA" height={150} width={700} highlightColor="#ffffff">
            <p >
            <Skeleton count={20} />
            </p>
        </SkeletonTheme>
        </div>)
    }

    const indexOfLastBlog = currentPage * postsPerPge;
    const indexOfFirstBlog = indexOfLastBlog - postsPerPge;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const handlePagination = (pageNumber:number) => {
      setCurrentPage(pageNumber);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    return (
        <div className="relative flex flex-col mb-[50px] flex-wrap mt-7 items-center justify-center bg-color-200 selection:bg-orange-400 ">
            <div className="mx-4 flex-row w-[90%] md:w-[80%] lg:w-[50%]">
                {error ? (  
                    <p className="text-red-500">{error}</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs to show</p>
                ) : (
                    currentBlogs.map((blog,index) => (
                        <div className=" "  key={index}>
                            <Blogcard  blog={blog} />
                        </div>
                    ))
                )}
            </div>
            
            <div className=" translate-y-10 absolute inset-x-0 bottom-0 flex justify-center items-center ">
                <div >
                    <Pagination length={blogs.length} postsPerPage={postsPerPge} handlePagination={handlePagination} currentPage={currentPage} />
                </div>
            </div>
        </div>
        
    );
};

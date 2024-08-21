
import { useEffect, useState } from "react";
import axios from "axios";
import { Blogcard } from "../components/Blogcard";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
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
                console.log("blogs "+blogs);
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

    return (
        <div className="flex max-w-full mb-7 flex-wrap mt-7 items-left justify-center bg-color-200 selection:bg-orange-400">
            <div className="mx-4 flex-row w-[90%] md:w-[80%] lg:w-[50%]">
                {error ? (  
                    <p className="text-red-500">{error}</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs to show</p>
                ) : (
                    blogs.map((blog) => (
                        <div className="h-auto"  key={blog.id}>
                            <Blogcard  blog={blog} />
                        </div>
                    ))
                )}
            </div>
        </div>
        
    );
};

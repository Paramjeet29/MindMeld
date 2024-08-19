
import { useEffect, useState } from "react";
import axios from "axios";
import { Blogcard } from "../components/Blogcard";
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
                setBlogs(response.data);
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
        return <div>
            Loading.....
        </div>;
    }

    return (
        <div className="flex mt-7 items-left justify-center bg-color-200 ">
            <div className="mx-4 flex-col w-[40%]">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs to show</p>
                ) : (
                    blogs.map((blog) => (
                        <div  key={blog.id}>
                            <Blogcard  blog={blog} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

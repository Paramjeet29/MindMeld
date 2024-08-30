
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Blogcard } from "../components/Blogcard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

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

export const Blogs: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
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
            } catch (error) {
                setError(blogs.length === 0 ? "No blog exists" : "Failed to load blogs.");
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBlogClick = (id: string) => {
        navigate(`/blog/${id}`);
    };

    if (loading) {
        return <Loader />;
    }

    const indexOfLastBlog = currentPage * postsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - postsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <div className="flex flex-col min-h-screen bg-orange-100 ">
            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : blogs.length === 0 ? (
                        <p className="text-center text-gray-600">No blogs to show</p>
                    ) : (
                        currentBlogs.map((blog) => (
                            <div className="cursor-pointer mb-6" key={blog.id} onClick={() => handleBlogClick(blog.id)}>
                                <Blogcard blog={blog} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {blogs.length > postsPerPage && (
                <div className="bg-orange-100  py-4">
                    <div className="max-w-lg mx-auto">
                        <Pagination
                            postsPerPage={postsPerPage}
                            length={blogs.length}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;
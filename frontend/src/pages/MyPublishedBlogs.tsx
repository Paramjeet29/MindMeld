import { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { ProfileBlogCard } from "../components/ProfileBlogCard";
interface BlogData {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    authorId: string;
  }
  
export const MyPublishedBlogs =()=> {
    const { user } = useContext(AuthContext);
  const [data, setData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchingBlogs = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const response = await axios.post("api/v1/user/userpost", {
          id: user.id
        });
        console.log("response", response.data);
        if (response.data) {
            const sortedBlogs = response.data[0].posts.sort(
                (a: BlogData, b: BlogData) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          setData(sortedBlogs || []);
        }
      } catch (err:any) {
        console.log(err);
        setError(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchingBlogs();
  }, [user?.id]);
  const publishedPosts = data.filter((post) => post.published);
  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleBlogClick = (id: string) => {
    navigate(`/myblogdetails/${id}`);
};

if (isLoading) {
    return <Loader />;
}
const fetchLikesForBlog = async (blogId: string) => {
  try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`api/v1/blog/like/${blogId}`, {
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

const indexOfLastBlog = currentPage * postsPerPage;
const indexOfFirstBlog = indexOfLastBlog - postsPerPage;
const currentBlogs = publishedPosts.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="flex flex-col min-h-screen bg-orange-100 ">
            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : data.length === 0 ? (
                        <p className="text-center text-gray-600">No blogs to show</p>
                    ) : (
                        currentBlogs.map((blog) => (
                            <div className="cursor-pointer  mb-2 h-[250px] md:h-[230px]" key={blog.id} >
                                <ProfileBlogCard blog={blog} blogClick={handleBlogClick}   fetchLikes={fetchLikesForBlog} />
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            {data.length > postsPerPage && (
                <div className="bg-orange-100  py-4">
                    <div className="max-w-lg mx-auto">
                        <Pagination
                            postsPerPage={postsPerPage}
                            length={data.length}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            )}
        </div>
  )
}

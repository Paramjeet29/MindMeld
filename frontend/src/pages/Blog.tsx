import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import Loader from "../components/Loader";

export const Blog = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    authorId: '',
    content: '',
    createdAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingBlog = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`https://backend.paramjeetxapp.workers.dev/api/v1/blog/${id}`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        if (response.status === 200) {
          setBlogDetails(response.data.blog);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchingBlog();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleReadMoreClick = () => {
    setShowFullContent(true);
  };
  const handleReadLessClick = () => {
    setShowFullContent(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-3 px-4 lg:px-0">
      <div className="w-full px-0 lg:w-[50%] mb-2">
        <button
          type="button"
          className="bg-orange-200 text-center w-32 rounded-2xl h-8 relative font-sans text-black text-sm md:text-lg font-semibold group"
          onClick={handleBackClick}
        >
          <div className="bg-orange-400 rounded-xl h-6 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[120px] z-10 duration-500">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="lg:w-[50%] lg:px-0 w-full flex flex-col items-start">
          <h1 className="text-2xl font-bold w-full break-words">{blogDetails.title}</h1>
          <div className="text-gray-500">
            <h2>
              {blogDetails.createdAt
                ? new Date(blogDetails.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : ''}
            </h2>
          </div>
          <p className="mt-4 w-full break-words whitespace-pre-wrap">{showFullContent ? blogDetails.content : 
              blogDetails.content.length > 1300 
                ? blogDetails.content.slice(0, 1300) + "..." 
                : blogDetails.content}</p>
          {!showFullContent ? (blogDetails.content.length > 1300 && (
            <button 
              className="text-orange-500 hover:text-orange-900 mt-1 underline" 
              onClick={handleReadMoreClick}
            >
              Read More
            </button>
          )):
          <button 
              className="text-orange-500 hover:text-orange-900 mt-1 underline" 
              onClick={handleReadLessClick}
            >
              Read Less
            </button>
          }
        </div>
      </div>
    </div>
  );
};
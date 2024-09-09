import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import Loader from "../components/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentDisplay } from "../components/CommentDisplay";

export const Blog = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    authorId: '',
    content: '',
    createdAt: '',
    author: {
      name: ''
    }
  });

  interface commentInterface {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    postId: string;
    user: {
      name: string;
    }
  }

  const [commentDetails, setCommentDetails] = useState<commentInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`api/v1/blog/${id}`, {
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

    const fetchComments = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get(`/api/v1/blog/comments/${id}`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        if (response.status === 200) {
          setCommentDetails(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogDetails();
    fetchComments();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleReadMoreClick = () => {
    setShowFullContent(true);
  };

  const handleReadLessClick = () => {
    setShowFullContent(false);
  };

  const handleComment = async () => {
    const comment = commentRef.current?.value;
    const token = localStorage.getItem('authToken');
    const toastId = toast.loading("Submitting your comment...");
    try {
      const response = await axios.post(`api/v1/blog/comments`, {
        postId: id,
        content: comment
      }, {
        headers: {
          'Authorization': `${token}`
        }
      });

      if (response.status === 200) {
        if (commentRef.current) commentRef.current.value = "";
        toast.update(toastId, {
          render: "Comment submitted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        const fetchComments = async () => {
          try {
            const response = await axios.get(`api/v1/blog/comments/${id}`, {
              headers: {
                'Authorization': `${token}`
              }
            });
            if (response.status === 200) {
              setCommentDetails(response.data);
            }
          } catch (err) {
            console.log(err);
          }
        };

        fetchComments();
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to submit comment",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-3 px-4 lg:px-0 pb-8 selection:bg-orange-300">
      <div className="flex w-full px-0 lg:w-[75%] mb-0">
        <div>
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
        <div className="items-end -translate-x-10 w-full flex font-serif flex-col">
          <span className="flex items-center justify-center text-gray-700">Author </span>
          <span className="-translate-y-2 -translate-x-0 text-xl flex items-center justify-center">{blogDetails.author.name}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="lg:w-[75%] lg:px-0 w-full flex flex-col items-start">
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
          <p className="mt-0 w-full break-words whitespace-pre-wrap">
            {showFullContent ? blogDetails.content :
              blogDetails.content.length > 1300
                ? blogDetails.content.slice(0, 1300) + "..."
                : blogDetails.content}
          </p>
          {!showFullContent ? (blogDetails.content.length > 1300 && (
            <button
              className="text-orange-500 hover:text-orange-900 mt-1 underline"
              onClick={handleReadMoreClick}
            >
              Read More
            </button>
          )) :
            <button
              className="text-orange-500 hover:text-orange-900 mt-1 underline"
              onClick={handleReadLessClick}
            >
              Read Less
            </button>
          }
        </div>
      </div>

      <div className="flex justify-center flex-row items-center w-full mt-8">
        <div className="w-full lg:w-[73%] justify-center flex flex-col items-center shadow-lg">
          <label className="w-full justify-start items-start flex font-semibold">Add comment</label>
          <input
            required
            className="focus:outline-none focus:ring-orange-900 focus:border-orange-900 border border-yellow-900 w-full focus:ring-1 font-mono py-1 pl-2 pr-10 bg-orange-100 text-yellow-900 placeholder-gray-600 font-semibold"
            ref={commentRef}
            type="text"
            placeholder="Enter comment"
          />
        </div>
        <button
          onClick={handleComment}
          className="bg-orange-500 translate-y-3 text-white px-2 py-[5.4px] -translate-x-10 transition duration-200 ease-in-out hover:bg-orange-700 active:bg-orange-900 focus:outline-none justify-center items-center"
        >
          Send
        </button>
      </div>

      <div className="flex flex-col items-center w-full mt-4">
      {commentDetails.length === 0 ? (
          <p className="text-center text-gray-500">No comments found</p>
        ) : (
          commentDetails.map((comments) => (
          <div className="flex justify-center items-center w-full mt-2 -translate-x-5 md:mx-0 px-6 text-xs md:text-base" key={comments.id}>
            <CommentDisplay comments={comments} />
          </div>
        )))}
      </div>
    </div>
  );
};

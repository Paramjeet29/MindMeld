
import  { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { ProfileCommentDisplay } from '../components/ProfileCommentDisplay';
export const MyblogDetails = () => {
  const { id } = useParams();
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
  const titleRef=useRef<HTMLTextAreaElement>(null);
  const contentRef=useRef<HTMLTextAreaElement>(null);
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    authorId: '',
    content: '',
    createdAt: '',
    published: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchingBlog = async () => {
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
    fetchingBlog();
  }, [id]);

  const handleBackClick = () => navigate(-1);

  const handleEdit = async(id:string) =>{
    const title=titleRef.current?.value;
    const content=contentRef.current?.value;
    if (!title || !content || !/\S/.test(title) || !/\S/.test(content)) {
      toast.error("Title and description cannot be blank or just whitespace");
    
    }
    if(title===blogDetails.title && content===blogDetails.content){
      toast.error("Title and description cannot be same as previous");
    return;
    }
      
    
    setLoading(true);
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(`api/v1/blog/edit/${id}`, {
        title:title,
        content:content
      }, {
        headers: { 'Authorization': `${token}` }
      });
      if (response.status === 200) {
        toast.success("Your blog has been successfully updated!")
        navigate('/myblog')
      
      }
    } catch (err) {
      console.log(err);
      toast.error("Please try again!");
    } finally {
      setLoading(false);
    }
  }
  
  const handlePublish = async(id:string) => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.put(`api/v1/blog/publish/${id}`, {}, {
        headers: { 'Authorization': `${token}` }
      });
      if (response.status === 200) {
        toast.success("Your blog has been successfully published!")
        navigate('/myblog')
      }
    } catch (err) {
      console.log(err);
      toast.error("Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async(id:string) => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.delete(`api/v1/blog/${id}`, {
        headers: { 'Authorization': `${token}` }
      });
      if (response.status === 200) {
        toast.success("Successfully Deleted post!");
        navigate('/myblog');
      }
    } catch (err) {
      console.log(err);
      toast.error("Please try again!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const handleCommentDelete = async (commentId: string) => {
    const token = localStorage.getItem('authToken');
    const toastId = toast.loading("Deleting comment...");
    try {
      const response = await axios.delete(`api/v1/blog/comments/${commentId}`, {
        headers: { 'Authorization': `${token}` }
      });
      if (response.status === 200) {
        toast.update(toastId, {
          render: "Comment deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        // Update the commentDetails state to remove the deleted comment
        setCommentDetails(prevComments => prevComments.filter(comment => comment.id !== commentId));
      }
    } catch (err) {
      console.log(err);
      toast.update(toastId, {
        render: "Failed to delete comment",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col w-full mt-3 px-1 md:px-12 overflow-x-hidden selection:bg-orange-400">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
        <button
          onClick={handleBackClick}
          className="bg-orange-200 text-center w-36 rounded-2xl h-8 mb-2 sm:mb-0 relative font-sans text-black text-xl font-semibold group overflow-hidden"
        >
          <div className="bg-orange-400 rounded-xl h-6 w-[20%] flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[136px] z-10 duration-500">
            <svg width="25" height="25" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
              <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>

        <div className="flex space-x-2">
        {blogDetails.published?
        <button
        onClick={()=>id && handleEdit(id)}
        className="flex justify-center items-center gap-2 w-24 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#2e7427] via-[#116001] to-[#005b15] hover:shadow-xl hover:scale-105 duration-300 hover:from-[#256926] hover:to-[#094f0c] group"
      >
        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-7 duration-700 text-sm text-orange-950">Edit</span>
        <svg viewBox="0 0 15 15" className="w-5 fill-white">
        <svg
            className="w-6 h-6"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.862 2.987l4.15 4.15-12.126 12.125L4.734 15.11l12.128-12.123zm-4.718 4.718l-8.222 8.222L2.5 21.5l5.573-1.422 8.22-8.222-4.15-4.15z"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          Button
        </svg>
      </button>
      :
      <button
      onClick={()=>id && handlePublish(id)}
        className="flex justify-center items-center gap-2 w-24 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#4eb045] via-[#147401] to-[#024f14] hover:shadow-xl hover:scale-105 duration-300 hover:from-[#147401] hover:to-[#4eb045] group"
      >
        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-7 duration-500 font-light text-sm text-green-800">Publish</span>
        <FontAwesomeIcon icon={faUpload} style={{color: "#ffffff"}} />
      </button>}

      <button
        onClick={()=>id && handleDelete(id)}
          className="flex justify-center items-center gap-2 w-24 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185] group"
        >
          <span className="absolute font-light opacity-0 group-hover:opacity-100 group-hover:translate-y-7 duration-500 text-sm text-red-800">Delete</span>
          <svg viewBox="0 0 15 15" className="w-5 fill-white">
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            Button
          </svg>
        </button>
        </div>
      </div>

      <div className="w-full">
        <div className="text-gray-500 mb-2 text-sm md:text-xl">
          <h2>
            <span className=''>Last Edited on </span>
            {blogDetails.createdAt
              ? new Date(blogDetails.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : ''}
          </h2>
        </div>
        <textarea 
        ref={titleRef}
          className="text-sm font-medium w-full h-auto  bg-orange-100 break-words border-2 border-orange-900 focus:ring-orange-400 focus:border-orange-400 rounded-md p-2 mb-4"
          defaultValue={blogDetails.title}
          
        ></textarea>
        <textarea 
        ref={contentRef}
          className="text-sm scrollbar-track-rounded-full scrollbar scrollbar-thumb-orange-300 scrollbar-thumb-rounded-3xl scrollbar-track-orange-200  w-full h-[330px] break-words whitespace-pre-wrap focus:ring-orange-400 focus:border-orange-400 bg-orange-100 border-2 border-orange-900 rounded-md p-2"
          defaultValue={blogDetails.content}
          
        />
      </div>
      <div className="flex flex-col items-center w-full mb-16 mt-2 pb-8 shadow-xl">
      <h1 className='w-full text-lg md:text-xl font-bold mt-4 md:mx-0 px-6'>Comments</h1>
        {commentDetails.length === 0 ? (
          <p className="text-center text-gray-500">No comments found</p>
        ) : (
          commentDetails.map((comments) => (
            <div className="flex justify-center items-center w-full mt-4 md:mx-0 text-xs md:text-base" key={comments.id}>
              <ProfileCommentDisplay 
                comments={comments} 
                handleDelete={handleCommentDelete} 
              />
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default MyblogDetails;
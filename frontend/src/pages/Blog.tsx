import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Loader from "../components/Loader";

export const Blog = () => {

  const {id}=useParams();
  console.log(id);
  const [blogDetails,setBlogDetails]=useState({
    title: '',
    authorId: '',
    content: '',
    createdAt: ''
  });
  const[loading,setLoading]=useState(false);

  useEffect(()=>{
    const fetchingBlog = async() =>{
      setLoading(true);
      const token = localStorage.getItem('authToken');
      try{
        const response= await axios.get(`https://backend.paramjeetxapp.workers.dev/api/v1/blog/${id}`,{
          headers: {
              'Authorization': `${token}`
          }
      });
        console.log(response.data);
        if(response.status===200){
          setBlogDetails(response.data.blog)
          console.log("details "+blogDetails.authorId)

        }
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false)
      }
    }
    fetchingBlog();
  },[])
  if (loading) {
    return(
      <Loader/>
    )
}

  return (
    
    <div className="flex justify-center items-center mt-7">
      <div className="flex w-full  items-center justify-center">
        <div className="md:w-1/2 md:px-0 w-full px-4 flex flex-col items-start">
          <h1 className="text-2xl font-bold">{blogDetails.title}</h1>
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
          <h2 className="mt-4">{blogDetails.content}</h2>
        </div>
      </div>
    </div>
  )
}

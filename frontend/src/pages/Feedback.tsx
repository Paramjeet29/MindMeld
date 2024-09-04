import { useContext, useRef, useState } from "react"
import { Button } from "../components/Button"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Feedback = () =>{
  const {user}=useContext(AuthContext);
  const nameRef=useRef<HTMLInputElement>(null)
  const emailRef=useRef<HTMLInputElement>(null)
  const feedbackRef=useRef<HTMLTextAreaElement>(null)
  const ratingRef=useRef<HTMLInputElement>(null);
  const[loading,setLoading]=useState(false);
  const [rating, setRating] = useState(3);
  
  const handleSubmit = async() =>{
    const name = nameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const feedback = feedbackRef.current?.value?.trim();
    const ratingNumber = rating;
    
    if (!name || !email || !feedback) {
      toast.error("Please add all the details");
      return;
    }
    setLoading(true);
    try{
      const response=await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/feedback",{
        name:name,
        email:email,
        feedback:feedback,
        rating:ratingNumber
      })
      
      console.log(response);
      if(response.status===200){
        toast.success("Feedback added successfully!");
      }
    }
    catch(err){
      console.log(err);
      toast.error("Can't add feedback, please try again"); 
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col space-y-4 justify-center items-center mt-10 selection:bg-orange-300">
      <div className='w-full px-12 md:px-0 md:w-[45%] flex flex-col  '  >
        <label className="block font-semibold text-lg ">Enter your Name</label>
        <input required className="focus:outline-none  border border-yellow-900 w-full h-10 focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900  " ref={nameRef} type='text' placeholder="Your name" defaultValue={user?.name}></input>
      </div>
      <div className='w-full px-12 md:px-0 md:w-[45%] flex flex-col  '  >
        <label className="block font-semibold text-lg">Enter your Email</label>
        <input required className="focus:outline-none  border border-yellow-900 w-full h-10 focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900  " ref={emailRef} type='email' placeholder="Your email" defaultValue={user?.email}></input>
      </div>

      <div className='flex w-full px-12 md:px-0 md:w-[45%]  flex-col  '  >
        <label className="block font-semibold  justify-center items-center text-lg">Enter your Feedback</label>
        <textarea  className="scrollbar-track-rounded-full scrollbar scrollbar-thumb-orange-300 scrollbar-thumb-rounded-3xl scrollbar-track-orange-200 h-28 md:h-32   focus:outline-none  border border-yellow-900 w-full focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" ref={feedbackRef} placeholder="Feedback" ></textarea>
      </div>
      <div className="flex flex-row-reverse">
      {[5, 4, 3, 2, 1].map((star) => (
        <label
          key={star}
          className={`cursor-pointer text-3xl ${
            rating >= star
              ? 'text-[#ffa723] hover:text-[#e58e09]'
              : 'text-[#666] hover:text-[#ff9e0b]'
          }`}
        >
          <input
            type="radio"
            name="rating"
            value={star}
            checked={rating === star}
            onChange={() => setRating(star)}
            className="sr-only"
            ref={ratingRef}
          />
          ★
        </label>
      ))}
    </div>
      <div className="w-2/3 md:w-1/3 flex justify-center items-center">
        <Button onSubmit={handleSubmit} loading={loading} />
      </div>
      {/* <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="text-sm font-medium"  // Tailwind classes
            toastClassName="bg-orange-300 text-gray-900 rounded-lg shadow-lg p-4"  // Custom toast styling
            bodyClassName="flex items-center justify-center space-x-2"
            closeButton={false}  // Use default close button or customize it
          /> */}
    </div>
  )
}

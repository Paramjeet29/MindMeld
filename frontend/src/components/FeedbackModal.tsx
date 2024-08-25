import React, { useContext, useRef, useState } from "react";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FeedbackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(3);

  const handleSubmit = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const feedback = feedbackRef.current?.value;
    const ratingNumber = rating;
    setLoading(true);
    try {
      const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/feedback", {
        name: name,
        email: email,
        feedback: feedback,
        rating: ratingNumber
      });
      
      console.log(response);
      if (response.status === 200) {
        toast.success("Feedback added successfully!", {
          toastId: `login-success-${Date.now()}`
        });
        onClose(); // Close the modal after successful submission
      }
    } catch (err) {
      console.log(err);
      toast.error("Can't add feedback, please try again", {
        toastId: `login-success-${Date.now()}`
      }); 
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Feedback</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-lg">Enter your Name</label>
            <input required className="focus:outline-none border border-yellow-900 w-full h-10 focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" ref={nameRef} type='text' placeholder={user?.name} />
          </div>
          <div>
            <label className="block font-semibold text-lg">Enter your Email</label>
            <input required className="focus:outline-none border border-yellow-900 w-full h-10 focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" ref={emailRef} type='email' placeholder={user?.email} />
          </div>
          <div>
            <label className="block font-semibold text-lg">Enter your Feedback</label>
            <textarea className="focus:outline-none border border-yellow-900 w-full focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" ref={feedbackRef} placeholder="Feedback" />
          </div>
          <div className="flex flex-row-reverse justify-center">
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
                />
                ★
              </label>
            ))}
          </div>
          <div className="flex justify-center">
            <Button onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="text-sm font-medium"
        toastClassName="bg-orange-300 text-gray-900 rounded-lg shadow-lg p-4"
        bodyClassName="flex items-center justify-center space-x-2"
        closeButton={false}
      />
    </div>
  );
};

import React, {  useRef, useState, useEffect } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FeedbackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(3);
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const name = nameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const feedback = feedbackRef.current?.value?.trim();
    const ratingNumber = rating;
    
    if (!name || !email || !feedback) {
      toast.error("Please add all the details");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("api/v1/feedback", {
        name: name,
        email: email,
        feedback: feedback,
        rating: ratingNumber
      });
      
      console.log(response);
      if (response.status === 200) {
        toast.success("Feedback added successfully!");
        onClose(); 
      }
    } catch (err) {
      console.log(err);
      toast.error("Can't add feedback, please try again"); 
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300); 
  };

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 md:bg-opacity-90 flex justify-center items-center z-50 ease-in-out duration-100 ${
        isOpen ? 'animate-modal-enter' : 'animate-modal-exit'
      }`}
    >
      <div className="bg-orange-200 rounded-lg p-8 md:max-w-md md:w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Feedback</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-lg">Enter your Name</label>
            <input required className="focus:outline-none border border-yellow-900 w-full h-10 focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" ref={nameRef} type='text' placeholder="Name" />
          </div>
          <div>
            <label className="block font-semibold text-lg">Enter your Email</label>
            <input required className="focus:outline-none border border-yellow-900 w-full h-10 focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" ref={emailRef} type='email' placeholder="Email" />
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
      
    </div>
  );
};

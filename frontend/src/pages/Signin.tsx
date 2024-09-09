import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useRef, useContext, useState} from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Typewriter } from 'react-simple-typewriter'; // Importing the Typewriter component from the package
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FeedbackModal } from "../components/FeedbackModal";

export const Signin = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {  setUser } = useContext(AuthContext); 
  const [loading,setLoading]=useState<Boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    setLoading(true);
  
    try {
      const response = await axios.post("api/v1/user/signin", {
        email,
        password,
      });
  
      if (response.status === 200) { 
        toast.success("Login successful! Welcome back.");
        navigate('/blogs')
        const authToken = response.headers['authorization'];
        if (authToken) {
          localStorage.setItem('authToken', authToken);
        }
  
        setUser({
          name: response.data.name,
          email: response.data.email,
          id: response.data.id,
        });      
      }  
    } catch(err) {
      console.error("Error with axios", err);
      toast.error("Sign In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="flex flex-col-reverse sm:flex-row justify-center items-center h-full w-full min-h-screen  selection:bg-orange-300 ">
      <div className="flex flex-col justify-center items-center h-auto w-full sm:w-1/2 max-w-md p-6 space-y-4 border shadow-lg border-orange-200 rounded-lg">
      {/* <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}

        <Heading content="Login to your account" />
        <Subheading content="Don't have an account?" handleClick={handleClick} label="Sign up" />
        <InputBox  className="w-full sm:w-3/4 " ref={emailRef} label="Email" placeholder="Enter your email" type="email" />
        <InputBox  className="w-full sm:w-3/4" ref={passwordRef} label="Password" placeholder="Enter your password" type="password" />
        <Button onSubmit={handleSubmit} loading={loading} />
        
       
      </div>
      <div className="w-full sm:w-1/2 flex justify-center items-center h-full bg-orange-100">
        <div className="flex items-center justify-center text-yellow-800 p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
            <Typewriter
              words={['Welcome to MindMeld!', 'Explore the posts', 'Join the conversation']}
              loop={0} 
              cursor
              cursorStyle='|'
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

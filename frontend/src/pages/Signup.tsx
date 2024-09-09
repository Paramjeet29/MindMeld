import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
export const Signup= () =>{
  const usernameRef=useRef<HTMLInputElement>(null);
  const emailRef=useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);
  const navigate=useNavigate();
  const {setUser}=useContext(AuthContext)
  const[loading,setLoading]=useState<Boolean>(false);
  const handleClick=()=>{
    navigate("/signin");
  }
  const handleSubmit=async()=>{
    const username=usernameRef.current?.value;
    const email=emailRef.current?.value;
    const password=passwordRef.current?.value;
    console.log(username,email,password)
    setLoading(true)
    try{
      const response=await axios.post("api/v1/user/signup",{
        name:username,
        email:email,
        password:password
      })
      console.log("response data"+response.data)
      if (response.status === 200) { 
        toast.success("Successfully signed up!");
        const authToken = response.headers['authorization'];
        if (authToken) {
          localStorage.setItem('authToken', authToken);
        }
  
      setUser({
        name:response.data.name,
        email:response.data.email,
        id:response.data.id
      })
      setTimeout(() => {
        navigate('/blogs');
      }, 1000);
    }
    }
    catch(err){
      console.log(err);
      toast.error("Signup failed. Please try again.");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-center items-center h-full w-full min-h-screen selection:bg-orange-300 ">
    <div className="flex flex-col justify-center items-center h-auto w-full sm:w-1/2 max-w-md p-6 space-y-4 border shadow-lg border-orange-200 rounded-lg">
      <Heading content="Create an account" />
      <Subheading content="Already have an account"  handleClick={handleClick} label="Sign in" />
      <InputBox className={"w-3/4"} ref={usernameRef} label="Username" placeholder="Enter your name" type="text"/>
      <InputBox className={"w-3/4"} ref={emailRef} label="Email" placeholder="Enter your email" type="email"/>
      <InputBox className={"w-3/4"} ref={passwordRef} label="Password" placeholder="Enter your password" type="password"/>
      <Button onSubmit={handleSubmit} loading={loading} />
    </div>
    <div className="w-full sm:w-1/2 flex justify-center items-center h-full bg-orange-100">
        <div className="flex items-center justify-center text-yellow-800 p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
            <Typewriter
              words={['Welcome to MindMeld!', 'Explore the posts', 'Join the conversation']}
              loop={0} // Infinite loop
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
  )
}

import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useRef,useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const Signin=()=> {
  const usernameRef=useRef<HTMLInputElement>(null);
  const emailRef=useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);
  const navigate=useNavigate();
  const {user,setUser}=useContext(AuthContext); 

  const handleClick=()=>{
    navigate("/signup");
  }
  const handleSubmit=async()=>{
    const username=usernameRef.current?.value;
    const email=emailRef.current?.value;
    const password=passwordRef.current?.value;
    console.log(username,email,password)
    try{
      
      const response=await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/signin",{
        name:username,
        email:email,
        password:password
      })
      const authToken = response.headers['authorization'];
      console.log("authtoken"+authToken)
      if(authToken){
        localStorage.setItem('authToken',authToken);
      }

      setUser({
        name:response.data.name,
        email:response.data.email,
        id:response.data.id
      })
      console.log(user)
      navigate('/blogs');
    }
    catch(err){
      console.log("error with axios"+err);
    }
  }
  return (

    <div className="flex justify-center items-center h-screen w-1/2">
      <div className="flex justify-center items-center flex-col h-auto w-full max-w-md p-6 space-y-4 bg-gray-200 border shadow-lg border-gray-300 rounded-lg ">
        <Heading content="Login to your account" />
        <Subheading content="Don't have an account" handleClick={handleClick} label="Sign Up" />
        <InputBox ref={usernameRef} label="Username" placeholder="Enter your name" type="text"/>
        <InputBox ref={emailRef} label="Email" placeholder="Enter your email" type="email"/>
        <InputBox ref={passwordRef} label="Password" placeholder="Enter your password" type="password"/>
        <Button onSubmit={handleSubmit} />
      </div>
  </div>

  )
}

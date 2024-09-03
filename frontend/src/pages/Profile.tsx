import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export const Profile = () => {
  const { user } = useContext(AuthContext);
  
  const usernameRef=useRef<HTMLInputElement>(null);
  const emailRef=useRef<HTMLInputElement>(null);
  const oldpasswordRef=useRef<HTMLInputElement>(null);
  const newpasswordRef=useRef<HTMLInputElement>(null);

  const[loading,setLoading]=useState(false);


  const handleSubmit = async() =>{
        if (!user?.id)
           return;
        
        const name=usernameRef.current?.value;
        const email=emailRef.current?.value;
        const oldpassword=oldpasswordRef.current?.value;
        const newpassword=newpasswordRef.current?.value;
        try{
          setLoading(true);
          const response=await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/edit",{ 
                  id: user.id,
                  name,
                  email,
                  oldpassword,
                  newpassword
                });
            console.log("response", response.data);
            if(response.status===200){
              // toast.success("Successfully updated!",{
              //   toastId: `login-success-${Date.now()}`
              // });
            }
            
        }
        catch(err){
          console.log(err);
          // toast.error("Please try again!",{
          //   toastId: `login-success-${Date.now()}`
          // });
          
        }
        finally{
          setLoading(false);
        }
  }

  


  return (
    <div className="h-auto w-full mt-10 selection:bg-orange-400  flex justify-center items-center">
      

        <div className="w-full px-4 md:px-0 md:w-1/2 space-y-3 ">
        <InputBox ref={usernameRef}  label="NAME  " type="text" placeholder="Enter your name" defaultValue={user?.name} className=" "/>
        <InputBox ref={emailRef} label="EMAIL" type="email" placeholder="Enter the email" defaultValue={user?.email} className=""/>
        <InputBox ref={oldpasswordRef} label=" OLD PASSWORD" type="text" placeholder="Enter your old password"  className=""/>
        <InputBox ref={newpasswordRef} label=" NEW PASSWORD" type="text" placeholder="Enter your new password "  className=""/>
        <div className=" mt-4 w-full flex justify-center items-center">
        <Button onSubmit={handleSubmit} loading={loading} />
        </div>
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
  );
};
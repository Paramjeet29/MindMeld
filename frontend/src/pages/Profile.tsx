import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
export const Profile = () => {
    const {user,setUser}=useContext(AuthContext)
    
    const [data,setData]=useState([])

    useEffect(()=>{
      const fetchingBlogs = async() =>{
        try{
          const response= await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost",{
            id:user?.id
          });
          console.log(response)
        if(response){
          setData(response.data[0])
          console.log(data)
        }
        }
        catch(err){
          console.log(err);
        }
      }
      fetchingBlogs();
    },[])

  return (
    <div className="flex items-center justify-center mt-10 selection:bg-orange-400">
      <div className="w-1/2 font-sans font-semibold text-2xl bg-orange-300 p-4 rounded-lg">
        <div className="flex flex-col space-y-3 ">
          <h1>Name: <span className="ml-4">{user?.name}</span></h1>
          <h2>Email: <span>{user?.email}</span></h2>
          <h2>Password:<span></span></h2>
          <h2>Total post published:<span>{user?.id}</span></h2>
        </div>
        <div>
          <h2>Total post published:<span>{}</span></h2>
        </div>
    </div>
    </div>
  )
}

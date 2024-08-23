import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { ProfileBlogCard } from "../components/ProfileBlogCard"
import { ProfileBlogCardDraft } from "../components/ProfileBlogCardDraft"

interface userdata{
  email:string,
  name: string,
  password:string
}

export const Profile = () => {
    const {user,setUser}=useContext(AuthContext);
    const[userdetails,setUserDetails]=useState<userdata>({
      email:"",
      name:"",
      password:""
    });
    
    const [data,setData]=useState([{
      id: "",
    title: "",
    content: "",
    published: true,
    createdAt: "",
    authorId: ""
    }])

    useEffect(()=>{
      const fetchingBlogs = async() =>{
        try{
          const response= await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost",{
            id:user?.id
          });
          console.log("response")
          console.log(response.data[0])
        if(response){
          setData(response.data[0].posts)
          setUserDetails({
            "email":response.data[0].email,
            "name":response.data[0].name,
            "password":response.data[0].password
          }
          )
          // console.log(data)
        }
        }
        catch(err){
          console.log(err);
        }
      }
      fetchingBlogs();
    },[])

  return (
    <div className=" h-auto mt-10 selection:bg-orange-400">
      <div className="w-full flex justify-center items-center">
      <div className="w-1/2 flex justify-center items-center font-sans font-semibold text-sm md:text-2xl bg-orange-300 p-4 rounded-lg">
        <div className="flex flex-col space-y-3  ">
          <h1>Name: <span className="ml-4">{user?.name}</span></h1>
          <h2>Email: <span className=" text-yellow-900">{user?.email}</span></h2>
          <h2>Password:<span className=" text-yellow-900">{userdetails.password}</span></h2>
          <h2>Total post published:<span className=" text-yellow-900">{data.length}</span></h2>
        </div>
    </div>
      </div>
    <div className="w-full flex mt-6 flex-col md:flex-row ">
      <div className="w-1/2 flex flex-col justify-top items-center">
        <h2 className="uppercase font-serif font-bold text-xl underline mb-4">published</h2>
        {
          data.map((datas,id)=>(
            <div className="w-3/4 " key={id}><ProfileBlogCard blog={datas} /></div>
          ))
        }
      </div>
      
      <div className="w-1/2 flex  flex-col justify-top items-center">
        <h2 className="uppercase font-serif font-bold text-xl underline mb-4">Draft</h2>
        {
          data.map((datas,id)=>(
            <div className="w-3/4 " key={id}><ProfileBlogCardDraft blog={datas} /></div>
          ))
        }
      </div>
    </div>
    </div>
  )
}

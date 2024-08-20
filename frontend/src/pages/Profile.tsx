import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export const Profile = () => {
    const {user,setUser}=useContext(AuthContext)
    const[obj,setObj]=useState({
      name:user?.name,
      email:user?.email,
      password:""
    })
    
  return (
    <div>
       <div className="flex flex-col justify-center items-center w-full">
       <div className="items-left w-[50%]">
        <h1>{obj.name}</h1>
        <h2>{obj.email}</h2>
       </div>
       </div>
    </div>
  )
}

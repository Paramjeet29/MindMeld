import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const Profile = () => {
    const {user,setUser}=useContext(AuthContext)
  return (
    <div>
        {user?.name}
        {user?.email}
    </div>
  )
}

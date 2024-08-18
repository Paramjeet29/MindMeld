import { useContext } from "react"
import { AuthContext} from "../context/AuthContext"

export const Appbar=()=> {
    const {user}=useContext(AuthContext)
  return (
    <div className="flex w-full h-12 px-4 py-2">
        <div className="w-[90%] justify-center items-center font-bold text-xl">Medium</div>
        <div className="w-[20%] rounded-full flex">
            <span className="px-2  justify-center items-center text-lg font-semibold">{user?.name.toUpperCase()}</span>
            <button className="justify-center items-center w-[30px] rounded-full bg-gray-500 text-lg " > <span className="">{user?.name[0].toUpperCase()}</span></button>

        </div>
    </div>
  )
}

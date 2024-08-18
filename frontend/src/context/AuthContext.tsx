import { createContext,ReactNode ,useState} from "react"
import React from "react"
interface userDetails{
    name: string,
    email:string,
    id:string
}
export interface UserContent{
    user:userDetails|null
    setUser:React.Dispatch<React.SetStateAction<userDetails|null>>
    // setUser:(c:string)=>void
}

export const AuthContext=createContext<UserContent>({
    user:null,
    setUser:()=>{},
})      
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<userDetails | null>(null);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
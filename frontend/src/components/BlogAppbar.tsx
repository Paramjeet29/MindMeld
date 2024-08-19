import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const BlogAppbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/createblog');
  };

  const handleClickBar = () =>{
    navigate('/blogs')
  }

  return (
    <div className="flex justify-center h-16  ">
      <div className="flex items-center border-b-2 w-[40%] ">
        <div className="font-bold text-xl w-full"><button onClick={handleClickBar}>MindMeld</button></div>
        <div className="flex items-center space-x-4 ml-auto">
        

          <button className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-gray-500 text-lg">
            <span>{user?.name[0].toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

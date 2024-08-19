import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const { user } = useContext(AuthContext);
  const [iconColor, setIconColor] = useState("#7a7c7f");
  const navigate = useNavigate();

  const handleIconMouseEnter = () => {
    setIconColor("#000000"); // Change to the desired color on hover
  };

  const handleIconMouseLeave = () => {
    setIconColor("#7a7c7f"); // Revert to the original color
  };
  
  const handleClick = () => {
    navigate('/createblog');
  };

  const handleClickBar = () =>{
    navigate('/blogs')
  }

  return (
    <div className="flex justify-center h-16  ">
      <div className="flex items-center border-b-2 w-[50%] ">
        <div className="font-bold text-xl w-full"><button onClick={handleClickBar}>MindMeld</button></div>
        <div className="flex items-center space-x-4 ml-auto">
          <button 
            onMouseEnter={handleIconMouseEnter} 
            onMouseLeave={handleIconMouseLeave}
            onClick={handleClick}
            className="hover:text-black flex items-center text-[#7a7c7f]"
          >
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: iconColor }} className="mx-1" />
            Write
          </button>
          <button className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-lg">
            <span>{user?.name[0].toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

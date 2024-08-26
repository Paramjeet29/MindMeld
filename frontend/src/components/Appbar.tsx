import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faComments } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownDivider } from "flowbite-react";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { Feedback } from "../pages/Feedback";
export const Appbar = () => {
  const { user } = useContext(AuthContext);
  const [iconColor, setIconColor] = useState("#1a0600");
  const [iconColorFeedback, setIconColorFeedback] = useState("#1a0600");
  
  const navigate = useNavigate();

  const handleIconMouseEnter = () => {
    setIconColor("#78350f"); // Change to the desired color on hover
  };

  const handleIconMouseLeave = () => {
    setIconColor("#1a0600"); // Revert to the original color
  };

  const handleIconMouseEnterFeedback = () => {
    setIconColorFeedback("#78350f"); // Change to the desired color on hover
  };

  const handleIconMouseLeaveFeedback = () => {
    setIconColorFeedback("#1a0600"); // Revert to the original color
  };
  
  const handleClick = () => {
    navigate('/createblog');
  };
  const handleClickFeedback = () => {
    navigate('/feedback');
  };

  const handleClickBar = () =>{
    navigate('/blogs')
  }

  const handleSignOut =() =>{
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
    navigate('/',{ replace: true })
  }
  const handleProfile =() =>{
    navigate('/profile')
  }

  const handleFeedback = () =>{
    navigate('/feedback')
  }
  return (
    <div className="flex justify-center items-center h-16 selection:bg-orange-300  lg:w-full sm:w-screen px-10 md:px-0">
      <div className="flex items-center justify-center border-b-2 border-yellow-900 pb-2 w-full md:mx-[10%] lg:w-[50%] ">
        <div className="font-bold md:text-xl sm:text-sm w-full font-serif "><button className="hover:text-yellow-900" onClick={handleClickBar}>MindMeld</button></div>
        <div className="flex items-center justify-end w-full space-x-4 ml-auto font-semibold">
          <div className="">
            <button
             onMouseEnter={handleIconMouseEnterFeedback} 
             onMouseLeave={handleIconMouseLeaveFeedback}
             onClick={handleClickFeedback}
             className="hover:text-yellow-900 font-serif font-semibold flex items-center text-[#1a0600]">
            <FontAwesomeIcon icon={faComments} style={{ color: iconColorFeedback }} />
            <span className="hidden sm:block">Write a feedback</span>
            </button>
          </div>
          <div>
          <button 
            onMouseEnter={handleIconMouseEnter} 
            onMouseLeave={handleIconMouseLeave}
            onClick={handleClick}
            className="hover:text-yellow-900 font-serif space-x-1 font-semibold flex items-center text-[#1a0600]"
          >
            <FontAwesomeIcon icon={faPenToSquare} style={{ color: iconColor }} className="" />
           <span className="hidden sm:block">Create</span> 
          </button>
          </div>
          
          <div className="rounded-full bg-orange-300 flex items-center justify-center w-12 h-12  ">
          <Dropdown label="" dismissOnClick={true} className="outline-none w-[150px] border-none bg-orange-300 z-10 font-semibold" renderTrigger={() => <span className="hover:cursor-pointer w-full h-full flex items-center font-sans justify-center text-xl hover: ">
            {user?.name[0].toUpperCase()}
          </span>}>
          <div className="p-2 ">
          <Dropdown.Header>
              <span className="block text-sm uppercase ">{user?.name}</span>
              <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header >
            <Dropdown.Item className="hover:bg-orange-300 hover:ring-1 p-2 hover:ring-orange-800  ease-in-out hover:shadow-2xl" onClick={handleProfile} icon={HiViewGrid}>Profile</Dropdown.Item>
            
            <Dropdown.Divider />
            <Dropdown.Item className="hover:bg-orange-300 hover:ring-1 p-2 hover:ring-orange-800 hover:shadow-2xl" onClick={handleSignOut} icon={HiLogout}>Sign out</Dropdown.Item>

            <DropdownDivider/>
            <Dropdown.Item className="hover:bg-orange-300 hover:ring-1 p-2 hover:ring-orange-800  ease-in-out hover:shadow-2xl" onClick={handleFeedback} icon={HiPencilAlt}>Feedback</Dropdown.Item>
        
          </div>
          </Dropdown>
          </div>

        </div>
      </div>
    </div>
  );
};

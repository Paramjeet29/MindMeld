
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownDivider } from "flowbite-react";
import { HiLogout, HiViewGrid, HiPencilAlt } from "react-icons/hi";

export const CreateBlogNavbar = () => {
  const { user } = useContext(AuthContext);
  const [iconColorFeedback, setIconColorFeedback] = useState("#1a0600");
  
  const navigate = useNavigate();

  const handleIconMouseEnterFeedback = () => setIconColorFeedback("#78350f");
  const handleIconMouseLeaveFeedback = () => setIconColorFeedback("#1a0600");
  
  const handleClick = () => navigate('/generate');
  const handleBlog = () => navigate('/myblog');
  const handleClickBar = () => navigate('/blogs');
  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };
  const handleProfile = () => navigate('/profile');
  const handleFeedback = () => navigate('/feedback');

  return (
    <div className="flex justify-center items-center h-16 selection:bg-orange-300 w-full ">
      <div className="flex items-center justify-between border-b-2 border-yellow-900 px-4 pb-2 w-full ">
        <div className="font-bold text-lg sm:text-xl font-serif">
          <button className="hover:text-yellow-900" onClick={handleClickBar}>MindMeld</button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 font-semibold pr-4">
          <button
            onMouseEnter={handleIconMouseEnterFeedback}
            onMouseLeave={handleIconMouseLeaveFeedback}
            onClick={handleBlog}
            className="hover:text-yellow-900 font-serif font-semibold flex items-center text-[#1a0600] whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faComments} style={{ color: iconColorFeedback }} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">My Blogs</span>
          </button>
          <button 
            onClick={handleClick}
            className="hover:text-yellow-900 font-serif font-semibold flex items-center text-[#1a0600] whitespace-nowrap"
          >
            <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z" fill="url(#prefix__paint0_radial_980_20147)"/>
              <defs>
                <radialGradient id="prefix__paint0_radial_980_20147" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)">
                  <stop offset=".067" stopColor="#9168C0"/>
                  <stop offset=".343" stopColor="#5684D1"/>
                  <stop offset=".672" stopColor="#1BA1E3"/>
                </radialGradient>
              </defs>
            </svg>
            <span className="hidden sm:inline">Generate AI</span>
          </button>
          <div className="relative">
            <Dropdown 
              label="" 
              dismissOnClick={true} 
              className="outline-none w-[160px] border-2 border-orange-700 bg-orange-200 z-10 font-semibold" 
              renderTrigger={() => (
                <span className="hover:cursor-pointer w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl bg-orange-300 rounded-full">
                  {user?.name[0].toUpperCase()}
                </span>
              )}
            >
              <Dropdown.Header>
                <span className="block text-sm uppercase">{user?.name}</span>
                <span className="block truncate text-sm font-medium">{user?.email}</span>
              </Dropdown.Header>
              <Dropdown.Item className="hover:bg-orange-300 hover:ring-1 p-2 mr-1 hover:ring-orange-800 ease-in-out hover:shadow-2xl" onClick={handleProfile} icon={HiViewGrid}>Profile</Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item className="hover:bg-orange-300 hover:ring-1 p-2 hover:ring-orange-800 ease-in-out hover:shadow-2xl" onClick={handleFeedback} icon={HiPencilAlt}>Feedback</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="hover:bg-orange-300 hover:ring-1 p-2 hover:ring-orange-800 hover:shadow-2xl" onClick={handleSignOut} icon={HiLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

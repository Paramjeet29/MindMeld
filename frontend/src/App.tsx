import { BrowserRouter,Routes,Route } from "react-router-dom"
import{ Signin} from './pages/Signin'
import {Signup} from './pages/Signup'
import {Blog} from './pages/Blog'
import { Blogs } from "./pages/Blogs"
import { AuthProvider } from "./context/AuthContext"
import { Appbar } from "./components/Appbar"
import {CreateBlogNavbar} from "./components/CreateBlogNavbar"
import { CreateBlog } from "./pages/CreateBlog"
import { Profile } from "./pages/Profile"
import { Feedback } from "./pages/Feedback"
import {Myblog} from "./pages/Myblog"
import { MyblogDetails } from "./pages/MyblogDetails"
import {MyPublishedBlogs} from "./pages/MyPublishedBlogs"
import {MyDraftBlogs} from "./pages/MyDraftBlogs"
import { ToastContainer } from 'react-toastify';
import { GenerateAiBlog } from "./pages/GenerateAiBlog"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<><Appbar/> <Blog/></>} />
        <Route path="/blogs" element={<> <Appbar/><Blogs /></>} />
        <Route path="/createblog" element={<> <CreateBlogNavbar/><CreateBlog /></>}/>
        <Route path="/profile" element={<> <Appbar/><Profile /></>}/>
        <Route path="/feedback" element={<><Appbar/><Feedback/></>}/>
        <Route path="/myblog" element={<><Appbar/><Myblog/></>}/>
        <Route path="/myblogdetails/:id" element={<><Appbar/><MyblogDetails/></>}/>
        <Route path="/mypublishedblogs" element={<><Appbar/><MyPublishedBlogs/></>}/>
        <Route path="/mydraftblogs" element={<><Appbar/><MyDraftBlogs/></>}/>
        <Route path="/generate" element={<><Appbar/><GenerateAiBlog/></>}/>
      </Routes>
      <ToastContainer
        position="bottom-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="text-sm font-medium z-50"  // Tailwind classes
        toastClassName="rounded-lg shadow-lg "  // Custom toast styling
        bodyClassName="flex items-center justify-center space-x-2 "
        closeButton={false} 
      />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

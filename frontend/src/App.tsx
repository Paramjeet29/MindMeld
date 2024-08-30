import { BrowserRouter,Routes,Route } from "react-router-dom"
import{ Signin} from './pages/Signin'
import {Signup} from './pages/Signup'
import {Blog} from './pages/Blog'
import { Blogs } from "./pages/Blogs"
import { AuthProvider } from "./context/AuthContext"
import { Appbar } from "./components/Appbar"
import { CreateBlog } from "./pages/CreateBlog"
import { Profile } from "./pages/Profile"
import { Feedback } from "./pages/Feedback"
import {Myblog} from "./pages/Myblog"
import { MyblogDetails } from "./pages/MyblogDetails"
import { ToastContainer } from 'react-toastify';
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
        <Route path="/createblog" element={<> <Appbar/><CreateBlog /></>}/>
        <Route path="/profile" element={<> <Appbar/><Profile /></>}/>
        <Route path="/feedback" element={<><Appbar/><Feedback/></>}/>
        <Route path="/myblog" element={<><Appbar/><Myblog/></>}/>
        <Route path="/myblogdetails/:id" element={<><Appbar/><MyblogDetails/></>}/>
      </Routes>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="text-sm font-medium z-50"  // Tailwind classes
        toastClassName="bg-orange-300 text-gray-900 rounded-lg shadow-lg p-4"  // Custom toast styling
        bodyClassName="flex items-center justify-center space-x-2"
        closeButton={false}  // Use default close button or customize it
      />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

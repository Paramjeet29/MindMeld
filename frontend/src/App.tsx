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
import {MyblogDetails} from "./pages/MyblogDetails"

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
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

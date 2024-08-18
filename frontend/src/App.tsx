import { BrowserRouter,Routes,Route } from "react-router-dom"
import{ Signin} from './pages/Signin'
import {Signup} from './pages/Signup'
import {Blog} from './pages/Blog'
import { Blogs } from "./pages/Blogs"
import { AuthProvider } from "./context/AuthContext"
import { Appbar } from "./components/Appbar"
function App() {
  return (
    <AuthProvider>
      <Appbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App

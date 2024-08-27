import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ProfileBlogCard } from "../components/ProfileBlogCard";
import styles from '../components/Loader.css';
import Loader from "../components/Loader";


interface UserData {
  email: string;
  name: string;
  password: string;
}

interface BlogData {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: string;
}

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState<UserData>({
    email: "",
    name: "",
    password: "",
  });

  const [data, setData] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchingBlogs = async () => {
      if (!user?.id)
         return;

      try {
        setIsLoading(true);
        const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/user/userpost",{ 
            id: user.id
          }
        );

        console.log("response", response.data);

        if (response.data) {
          setData(response.data[0].posts || []);
          setUserDetails({
            email: response.data[0].email || "",
            name: response.data[0].name || "",
            password: response.data[0].password || "",
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingBlogs();
  }, [user?.id]);

  const publishedPosts = data.filter((post) => post.published).slice(0, 3);
  const draftPosts = data.filter((post) => !post.published).slice(0, 3);

  if (isLoading) {
    return(
     <Loader/>
    )
  }

  return (
    <div className="h-auto mt-10 selection:bg-orange-400">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 font-sans font-semibold text-sm md:text-2xl bg-orange-200  p-6">
          <div className="grid grid-cols-2 gap-y-8 gap-x-2 justify-items-stretch">
            <h2 className="col-span-2 md:col-span-1">Name: <span className="text-yellow-900">{user?.name}</span></h2>
            <h2  className="col-span-2 md:col-span-1 md:justify-self-end">Email: <span className="text-yellow-900">{user?.email}</span></h2>
            <h2  className="col-span-2 md:col-span-1">Password: <span className="text-yellow-900">{userDetails.password}</span></h2>
            
            <h2  className="col-span-2 md:col-span-1 md:justify-self-end">Total posts published: <span className="text-yellow-900">{data.length}</span></h2>
          </div>
        </div>
      </div>
      <div className="w-full flex my-6 flex-col justify-center items-center">
        <div className="w-full md:w-3/4 mb-6">
          <div className="uppercase font-serif font-bold underline mb-4 text-center">
            Published Posts
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {publishedPosts.map((post) => (
              <div key={post.id}>
                <ProfileBlogCard blog={post} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="uppercase font-serif font-bold text-sm  underline mb-4 text-center">
            Draft Posts
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {draftPosts.map((post) => (
              <div key={post.id}>
                <ProfileBlogCard blog={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
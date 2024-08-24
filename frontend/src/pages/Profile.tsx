import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ProfileBlogCard } from "../components/ProfileBlogCard";

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

  const publishedPosts = data.filter((post) => post.published);
  const draftPosts = data.filter((post) => !post.published);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-auto mt-10 selection:bg-orange-400">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 font-sans font-semibold text-sm md:text-2xl bg-orange-200 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 justify-items-stretch">
            <h2 className="col-span-1">Name: <span className="text-yellow-900">{user?.name}</span></h2>
            <h2  className="col-span-1 justify-self-end">Email: <span className="text-yellow-900">{user?.email}</span></h2>
            <h2  className="col-span-1 ">Password: <span className="text-yellow-900">{userDetails.password}</span></h2>
            
            <h2  className="col-span-1 justify-self-end">Total posts published: <span className="text-yellow-900">{publishedPosts.length}</span></h2>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-6 flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-top items-center">
          <h2 className="uppercase font-serif font-bold text-sm md:text-xl underline mb-4">Published</h2>
          {publishedPosts.map((post) => (
            <div className="w-3/4" key={post.id}><ProfileBlogCard blog={post} /></div>
          ))}
        </div>
        <div className="w-[90%] md:w-1/2 flex flex-col justify-top items-center">
          <h2 className="uppercase font-serif font-bold text-xl underline mb-4">Draft</h2>
          {draftPosts.map((post) => (
            <div className="w-3/4" key={post.id}><ProfileBlogCard blog={post} /></div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { useEffect,useState } from "react";
import axios from "axios";
import { Blogcard } from "../components/Blogcard";

interface blogInterface{
    id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
  };
}

export const Blogs = () => {
    const [blogs, setBlogs] = useState<blogInterface[]>([]);
    useEffect(() => {
        const fetchDetails = async () => {
            const token=localStorage.getItem('authToken');
            console.log(token );
            try {
                const response = await axios.get("https://backend.paramjeetxapp.workers.dev/api/v1/blog/bulk",{
                    headers:{
                        'Authorization': `${token}`
                    }
                });
                console.log(response.data); 
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };

        fetchDetails();
    }, []); 
    return (
        <div className="flex items-left justify-center">
            <div className=" mx-4  flex-col  w-[40%]">
            {blogs.map((blog,index)=>(
                <div key={index}>
                    <Blogcard blog={blog} />
                </div>
            ))}
        </div>
        </div>
    );
};

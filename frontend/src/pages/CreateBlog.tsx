import { useRef, useState } from "react"
import { TextArea } from "../components/TextArea"
import axios from "axios"
export const CreateBlog = () => {
    const titleRef=useRef<HTMLTextAreaElement>(null)
    const descRef=useRef<HTMLTextAreaElement>(null)
    const[loading,setLoading]=useState<Boolean>(false)

    const handleClick = async(e: React.FormEvent) =>{
        e.preventDefault();
        const title=titleRef.current?.value;
        const desc=descRef.current?.value;
        const token =localStorage.getItem('authToken')
        setLoading(true);
        try{
            const response=await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/blog",{
                title:title,
                content:desc,
                published:true
            },{
                headers:{
                    'Authorization': `${token}`
                }
            })
            if(response.status===200){
                alert("published");  
                if (titleRef.current) titleRef.current.value = '';
                if (descRef.current) descRef.current.value = '';
                
            }
        }
        catch(err){
            console.log("Error while creating post is: "+err)
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className="selection:bg-orange-300 max-h-screen">
        <form className="mt-12 flex  items-center max-h-screen flex-col space-y-4  ">
            <TextArea className={"flex font-mono w-1/2 rounded-lg space-x-16 justify-center border border-yellow-800  "} ref={titleRef} label="Title" placeholder="Enter the title" />
            <TextArea className={"flex font-mono w-1/2 h-40 rounded-lg justify-center  space-x-2 border border-yellow-800"} ref={descRef} label="Description" placeholder="Enter the description"  />
            <div className="">
            <button type="button" onClick={handleClick}
                className="relative flex items-center px-20 py-2 overflow-hidden font-medium mt-8 transition-all bg-orange-200 rounded-md group"
                >
                <span
                    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-orange-300 rounded group-hover:-mr-4 group-hover:-mt-4"
                >
                    <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-orange-100"
                    ></span>
                </span>
                <span
                    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-orange-300 rounded group-hover:-ml-4 group-hover:-mb-4"
                >
                    <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-orange-100"
                    ></span>
                </span>
                <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-orange-300 rounded-md group-hover:translate-x-0"
                ></span>
                <span
                    className="relative w-full text-left text-lg text-black transition-colors duration-200 ease-in-out font-semibold "
                    >{
                        loading?(
                            <div className="w-full py-2 gap-x-2 flex justify-center items-center">
                              <div
                                className="w-3 bg-stone-950 animate-pulse h-3 rounded-full animate-bounce"
                              ></div>
                              <div
                                className="w-3 animate-pulse h-3 bg-stone-900 rounded-full animate-bounce"
                              ></div>
                              <div
                                className="w-3 h-3 animate-pulse bg-stone-800 rounded-full animate-bounce"
                              ></div>
                            </div>
                    
                           ):"Publish" }
                    </span>
            </button>
            </div>
        </form>
    </div>
  )
}

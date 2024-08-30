import { useRef, useState } from "react"
import { TextArea } from "../components/TextArea"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CreateBlog = () => {
    const titleRef=useRef<HTMLTextAreaElement>(null)
    const descRef=useRef<HTMLTextAreaElement>(null)
    const[loadingPublish,setLoadingPublish]=useState<Boolean>(false)
    const[loadingDraft,setLoadingDraft]=useState<Boolean>(false)

    const handleClick = async(e: React.FormEvent,publish:boolean) =>{
        e.preventDefault();
        const title = titleRef.current?.value;
        const desc = descRef.current?.value;

        // Validate that the title and description are not just whitespace
        if (!title || !desc || !/\S/.test(title) || !/\S/.test(desc)) {
            toast.error("Title and description cannot be blank or just whitespace", {
                toastId: `validation-error-${Date.now()}`,
            });
            return;
        }
        const token =localStorage.getItem('authToken')
        // setLoading(true);
        publish?setLoadingPublish(true):setLoadingDraft(true);
        try{
            if(title==" "){}
            const response=await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/blog",{
                title:title,
                content:desc,
                published:publish
            },{
                headers:{
                    'Authorization': `${token}`
                }
            })
            if(response.status===200){
                toast.success(
                    publish ? "Successfully published blog!" : "Saved as draft!",
                    {
                      toastId: `blog-success-${Date.now()}`,
                    }
                  );
                if (titleRef.current) titleRef.current.value = '';
                if (descRef.current) descRef.current.value = '';
                
            }
        }
        catch(err){
            console.log("Error while creating post is: "+err)
        }
        finally{
            publish?setLoadingPublish(false):setLoadingDraft(false);
        }
    }
   

  return (
    <div className="selection:bg-orange-300 max-h-screen max-w-full">
        <form className="mt-12 flex  items-center max-h-screen flex-col space-y-4  ">
            <TextArea className={"flex font-mono w-[80%] md:w-3/4 lg:w-1/2 space-x-16 justify-center border border-yellow-800  "} ref={titleRef} label="Title" placeholder="Enter the title" />
            <TextArea className={"flex font-mono w-[80%] md:w-3/4 lg:w-1/2 h-32 md:h-[250px]  justify-center  space-x-2 border border-yellow-800"} ref={descRef} label="Description" placeholder="Enter the description"  />
            <div className="flex flex-col md:flex-row space-x-2 md:space-x-8 justify-center items-center">
            <button type="button" onClick={(e)=>handleClick(e,true)}
                className="relative flex items-center px-14 py-2 overflow-hidden font-medium mt-8 transition-all bg-orange-200  group"
                >
                <span
                    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-orange-300  group-hover:-mr-4 group-hover:-mt-4"
                >
                    <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-orange-100"
                    ></span>
                </span>
                <span
                    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-orange-300  group-hover:-ml-4 group-hover:-mb-4"
                >
                    <span
                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-orange-100"
                    ></span>
                </span>
                <span
                    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-orange-300  group-hover:translate-x-0"
                ></span>
                <span
                    className="relative w-full text-left text-lg text-black transition-colors duration-200 ease-in-out font-semibold "
                    >{
                        (loadingPublish)?(
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
            <button type="button" onClick={(e)=>handleClick(e,false)}
                className="relative flex items-center px-10 py-2 overflow-hidden font-medium mt-8 transition-all bg-orange-200 rounded-md group"
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
                        (loadingDraft)?(
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
                    
                           ):"Keep as draft" }
                    </span>
            </button>
           
            <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="text-xs md:text-sm font-medium  w-[70%] md:w-auto translate-y-12 md:translate-y-0" 
            toastClassName="bg-orange-300 flex justify-center  items-center text-gray-900 rounded-lg shadow-lg p-0 md:p-4"  
            bodyClassName="flex items-center justify-center space-x-2"
            closeButton={false}  
          />
            
            </div>
        </form>
    </div>
  )
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from "react"
import axios from "axios"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const GenerateAiBlog = () => {
    const promptRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const [loadingPublish, setLoadingPublish] = useState<boolean>(false)
    const [loadingDraft, setLoadingDraft] = useState<boolean>(false)
    const [postDisplay, setPostDisplay] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [generatedPostId, setGeneratedPostId] = useState<string | null>(null);
    const navigate=useNavigate();

    const handlePrompt = async (e: React.MouseEvent, publish: boolean) => {
        e.preventDefault();
        const prompt = promptRef.current?.value;
        if (!prompt) {
            toast.error("Please enter a prompt");
            return;
        }

        const token = localStorage.getItem('authToken')
        setLoadingPublish(true);
        try {
            const response = await axios.post("https://backend.paramjeetxapp.workers.dev/api/v1/blog/generate", {
                prompt: prompt
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            if (response.status === 200) {
                const { title, content, postId } = response.data;
                setTitle(title);
                setDesc(content);
                setGeneratedPostId(postId);
                if (titleRef.current) titleRef.current.value = title;
                if (descRef.current) descRef.current.value = content;
                setPostDisplay(true);
                toast.success("Content generated successfully! ");
                navigate(`/myblogdetails/${response.data.postId}`)
            }
        } catch (err) {
            console.error("Error while generating post:", err);
            toast.error("Failed to generate content. Please try again.");
        } finally {
            setLoadingPublish(false);
        }
    }
    return (
        <div className='w-full flex justify-center flex-col mt-[180px] items-center  selection:bg-orange-400'>
            <div className='shadow-lg  h-32 flex w-full  px-12 md:px-10 md:w-[47%] flex-col relative'>
                <label className="block font-semibold justify-center items-center text-lg">Enter the Prompt</label>
                <input className="focus:outline-none border border-yellow-900 w-full focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900" placeholder="Prompt" ref={promptRef}></input>
                <button 
                    onClick={(e) => handlePrompt(e, true)} 
                    className='absolute right-10 top-[28.5px] bg-orange-400 w-8 flex items-center justify-center h-[33px] hover:text-xl'
                    disabled={loadingPublish}
                >
                    {loadingPublish ? (
                        <div className="w-3 h-3 border-t-2 border-white rounded-full animate-spin"></div>
                    ) : (
                        <FontAwesomeIcon className='' icon={faArrowRight} />
                    )}
                </button>
                <span className='absolute text-sm bottom-3 left-10 text-gray-600 pr-4'>Hint: How to win at life by taking naps and eating snacks like a pro.</span>
            </div>

            
            {/* <ToastContainer /> */}
        </div>
    )
}
import { FC } from "react"
interface buttonProp{
  onSubmit:()=>void,
  loading:Boolean
}
export const  Button:FC<buttonProp> = ({onSubmit,loading}) =>{

  return (
    <div className="w-1/2">
        <button onClick={onSubmit}
        className="relative w-full py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-orange-300 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-orange-300 before:to-orange-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
      >
       { loading?(
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

       ):"Submit" }
      </button>
    </div>
  )
}

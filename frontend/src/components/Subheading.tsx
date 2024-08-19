import { FC } from "react"

interface messageProp{
    content:string,
    label:string,
    handleClick:()=>void
}

export const Subheading:FC<messageProp> = ({content,label,handleClick}) => {
    return (
      <div className="flex justify-center items-center space-x-2 text-sm font-mono">
        <h2 className="text-yellow-900 font-bold">
            {content}
        </h2>
        <button className="underline cursor-pointer text-sm hover:-translate-y-1 text-yellow-900  hover:text-black" onClick={handleClick}>{label}</button>
      </div>
    )
  }
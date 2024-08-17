import { FC } from "react"

interface messageProp{
    content:string,
    label:string,
    handleClick:()=>void
}

export const Subheading:FC<messageProp> = ({content,label,handleClick}) => {
    return (
      <div className="flex space-x-2 text-sm">
        <h2 className="">
            {content}
        </h2>
        <button className="underline cursor-pointer" onClick={handleClick}>{label}</button>
      </div>
    )
  }
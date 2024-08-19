
import { FC } from "react"
interface messageProp{
    content:string
}
export const Heading:FC<messageProp> = ({content} ) => {
  return (
    <>
        <h1 className="text-4xl font-bold" >{content}</h1>
    </>
  )
}

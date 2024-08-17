import { FC } from "react"
interface buttonProp{
  onSubmit:()=>void
}
export const  Button:FC<buttonProp> = ({onSubmit}) =>{
  return (
    <div className="w-1/2">
      {/* <button onClick={onSubmit}>on submit</button> */}
      <button onClick={onSubmit}
  className="relative w-full py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-gray-500 before:to-black before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Submit
</button>

    </div>
  )
}

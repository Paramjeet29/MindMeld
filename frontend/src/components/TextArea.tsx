import { forwardRef } from "react"
interface inputProps{
  label: string,
  placeholder:string,
  className:string
}
export const TextArea = forwardRef<HTMLTextAreaElement,inputProps>(
  ({placeholder,className},ref) => {
  return (
    <div className={className}  >
      {/* <label className="block font-semibold  justify-center items-center">{label}</label> */}
      <textarea  className=" bg-orange-100 placeholder:text-yellow-800 justify-center items-center placeholder:py-1 py-1 w-full md:text-2xl sm:lg rounded-lg  px-2 outline-none text-yellow-900" ref={ref} placeholder={placeholder} ></textarea>
    </div>
  )
}
)

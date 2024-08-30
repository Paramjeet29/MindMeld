import { forwardRef } from "react"
interface inputProps{
  label: string,
  placeholder:string,
  className:string
  defaultValue?:string
}
export const TextArea = forwardRef<HTMLTextAreaElement,inputProps>(
  ({placeholder,className,defaultValue},ref) => {
  return (
    <div className={className}  >
      {/* <label className="block font-semibold  justify-center items-center">{label}</label> */}
      <textarea  className=" bg-orange-100 placeholder:text-yellow-800 justify-center items-center placeholder:py-1 py-1 w-full md:text-2xl sm:lg  px-2 outline-none text-yellow-900" ref={ref} placeholder={placeholder} defaultValue={defaultValue}></textarea>
    </div>
  )
}
)

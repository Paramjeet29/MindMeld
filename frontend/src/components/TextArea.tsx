import { forwardRef } from "react"
interface inputProps{
  label?: string,
  placeholder:string,
  className:string
  defaultValue?:string
}
export const TextArea = forwardRef<HTMLTextAreaElement,inputProps>(
  ({placeholder,className,defaultValue},ref) => {
  return (
    <div className={className}  >
      {/* <label className="block font-semibold  justify-center items-center">{label}</label> */}
      <textarea  className=" focus:ring-orange-800 focus:border-orange-800 bg-orange-100 placeholder:text-yellow-800 justify-center items-center placeholder:py-1 py-1 w-full md:text-lg sm  px-2 outline-none text-yellow-900 overflow scrollbar-track-rounded-full scrollbar scrollbar-thumb-orange-300 scrollbar-thumb-rounded-3xl scrollbar-track-orange-200" ref={ref} placeholder={placeholder} defaultValue={defaultValue}></textarea>
    </div>
  )
}
)

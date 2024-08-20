import { forwardRef } from "react"
interface inputProps{
  label: string,
  type:string,
  placeholder:string,
  className:string,
}
export const InputBox = forwardRef<HTMLInputElement,inputProps>(
  ({label,placeholder,type,className},ref) => {
  return (
    <div className={className}  >
      <label className="block font-semibold ">{label}</label>
      <input required className="focus:outline-none  border border-yellow-900 w-full focus:ring-1 focus:ring-orange-900 font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-yellow-900  " ref={ref} type={type} placeholder={placeholder} ></input>
    </div>
  )
}
)

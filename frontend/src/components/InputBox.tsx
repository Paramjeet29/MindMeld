import { forwardRef } from "react"
interface inputProps{
  label: string,
  type:string,
  placeholder:string,
}
export const InputBox = forwardRef<HTMLInputElement,inputProps>(
  ({label,placeholder,type},ref) => {
  return (
    <div className="w-3/4 " >
      <label className="block font-semibold ">{label}</label>
      <input className="border border-gray-600 w-full rounded-lg py-1 px-2   " ref={ref} type={type} placeholder={placeholder} ></input>
    </div>
  )
}
)

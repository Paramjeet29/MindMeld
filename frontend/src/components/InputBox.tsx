import { forwardRef } from "react"
interface inputProps{
  label: string,
  type:string,
  placeholder:string|undefined,
  className:string,
  defaultValue?: string,
}
export const InputBox = forwardRef<HTMLInputElement,inputProps>(
  ({label,placeholder,type,className,defaultValue},ref) => {
  return (
    <div className={className}  >
      <label className="block font-semibold ">{label}</label>
      <input  required className="focus:outline-none focus:ring-orange-900 focus:border-orange-900 border border-yellow-900 w-full focus:ring-1  font-mono py-1 px-2 bg-orange-100 text-yellow-900 placeholder-gray-600 font-semibold " defaultValue={defaultValue} ref={ref} type={type} placeholder={placeholder} ></input>
    </div>
  )
}
)

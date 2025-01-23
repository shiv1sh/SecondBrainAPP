import { ReactElement } from "react"

interface ButtonProps { 
    variant : "primary" | "secondary",
    text : string,
    startIcon? : ReactElement,
    onClick ?: ()=> void
}
const variantClass = {
    "primary":"bg-purple-600 text-white hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75",
    "secondary":"bg-purple-200 text-purple-400 hover:text-violet-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
}
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center gap-2 cursor-pointer "
export const Button = ({variant,text,startIcon,onClick}: ButtonProps)=>{
    return(
        <button onClick={onClick}className={variantClass[variant]+" "+defaultStyles}>
            {startIcon}
            {text}
        </button>
    )
}
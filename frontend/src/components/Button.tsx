import { ReactElement } from "react"

interface ButtonProps { 
    variant : "primary" | "secondary",
    text : string,
    startIcon : ReactElement
}
const variantClass = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-400"
}
const defaultStyles = "px-4 py-2 rounded-md font-light"
export const Button = ({variant,text,startIcon}: ButtonProps)=>{
    return(
        <button className={variantClass[variant]+" "+defaultStyles}>
            {startIcon}
            {text}
        </button>
    )
}
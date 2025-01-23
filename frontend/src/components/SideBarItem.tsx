import { ReactElement } from "react"

export const SideBarItem = ({title,icon}:{
    title:string,
    icon:ReactElement
})=>{
    return(
        <div className="flex items-center p-3 cursor-pointer hover:bg-gray-200 rounded transistion=all duration-150">
            <div>{icon}</div>
            <div className="p-2 font-medium">{title}</div>
        </div>
    )
}
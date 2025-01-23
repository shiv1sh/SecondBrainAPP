import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SideBarItem } from "./SideBarItem"
import brain from '../assets/brain.jpg.avif';

export const SideBar = ()=>{
    return(
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-3 pt-2">
            <div className="font-bold text-4xl pt-4 flex gap-5 items-center pb-8">
                <img src={brain} className="w-14 rounded-full"></img>
                Brainly
            </div>
            <SideBarItem title={"Twitter"} icon={<TwitterIcon/>}/>
            <SideBarItem title={"Youtube"} icon={<YoutubeIcon/>}/>
        </div>
    )
}
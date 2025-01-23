import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const CreateContentModel = ({ open, onClose }) => {
    const tags = ["Youtube", "Twitter", "PersonalDoc"]
    const [selectedTag, setSelectedTag] = useState("");
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    async function onSubmit () {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        const response = await axios.post(BACKEND_URL+"/api/v1/createContent",{
            title:title,
            link:link,
            type:selectedTag
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        // console.log(response);
    }
    return (

        <div>
            {open && <div className={"w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-90 flex justify-center"}>
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end cursor-pointer!" onClick={onClose}>
                            <CrossIcon/>
                        </div>
                    <div>
                        <Input placeHolder={"Title"} reference={titleRef}/>
                        <Input placeHolder={"Link"} reference={linkRef}/>
                    </div>
                    <div className="pt-2 pl-2 pb-3"><Dropdown array = {tags} setSelectedTag = {setSelectedTag}/></div>
                    {selectedTag}
                    <div className="flex justify-center">
                    <Button variant="primary" text="Submit" onClick={onSubmit}/>
                    </div>
                    </span>
                </div>
            </div>
            }
        </div>
    );
};

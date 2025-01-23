import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
import axios from "axios";

export const useContent = ()=>{
    const [contents,setContents] = useState([]);
    function refresh() {
        axios.get(BACKEND_URL+"/api/v1/getContent",{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((response) => {
            const newContent = response.data.content || [];
            if (JSON.stringify(newContent) !== JSON.stringify(contents)) {
              setContents(newContent);
            }
          });
    }
    useEffect(()=>{
        refresh();
        let interval = setInterval(()=>{
            refresh();
        },10*1000)

        return ()=>{
            clearInterval(interval)
        }
    })
    return contents;
}
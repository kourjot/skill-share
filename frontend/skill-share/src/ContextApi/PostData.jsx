import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";

export const PostDataContext=createContext()
export const PostDataContextProvider=({children})=>{

    const [postdata,setPostdata]=useState([])
    const token = localStorage.getItem("token");
    async function getPostData(){
        try{
            const responce=await axios.get("https://skill-share-c93a.onrender.com/getMyPosts",{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token
                },
            })
            const data=responce.data
            setPostdata(responce.data.photos)
            console.log(data.photos)
        }
        catch(error){
            console.log(error.message)
        }

    }
    useEffect(()=>{
        getPostData()
    },[])
    return(
        <PostDataContext.Provider value={[postdata,setPostdata]}>
            {children}
        </PostDataContext.Provider>
    )
}


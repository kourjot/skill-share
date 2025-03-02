import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// const location = useLocation();
export const PostDataContext=createContext()
export const PostDataContextProvider=({children})=>{
    const location = useLocation();
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
        }
        catch(error){
            alert(error.message)
        }

    }
    //getPostData()
    useEffect(()=>{
         getPostData()
    },[location.pathname])
    return(
        <PostDataContext.Provider value={[postdata,setPostdata]}>
            {children}
        </PostDataContext.Provider>
    )
}


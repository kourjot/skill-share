import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";

export const PostDataContext=createContext()

export const PostDataContextProvider=({children})=>{

    const [postdata,setPostdata]=useState([])
    async function getPostData(){
        try{
            const responce=await axios.get("https://skill-share-c93a.onrender.com/getMyPosts")
            const data=responce.data
            setPostdata(responce.data)
            console.log(data)
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
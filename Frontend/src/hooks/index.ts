import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog{
    createdAt: string;
    map(arg0: (blog: { author: { name: string | null; }; id: string; title: string; content: string; }) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    "title": string,
    "content": string,
    "id": string,
    "author": {
        about: string;
        "name": string
    }
}
export const useUserBlogs = () =>{
 
    const [ blogs, setBlogs ] = useState< Blog[] >();
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        axios
          .post(
            `${BACKEND_URL}/api/v1/blog/dashboard`,
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            if(response.data.message){
                setBlogs([]);
                setLoading(false);
                return
            }
            setBlogs(response.data.blogs);
            setLoading(false);
          });
      }, []);
    
    return {
        blogs, loading
    }
}
export const useBlogs = () =>{
    
    const [ blogs, setBlogs ] = useState< Blog[] >();
    const [loading, setLoading ] = useState(true);

    useEffect( (page = 1) => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk/page=${page}`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
            .then( response => {
                if(response.data.message){
                    setBlogs([])
                    setLoading(false)
                    return
                }
                setBlogs(response.data.posts);
                setLoading(false);
            })
    }, [])
    
    return {
        blogs, loading
    }
}

export const useBlog = ({ id }: { id: string }) => {

    const [blog, setBlog ] = useState< Blog >()
    const [loading, setLoading ] = useState(true) 
    
        
        useEffect( ()=> {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                    Authorization:"Bearer "+ localStorage.getItem("token")
                }
            }).then( response => { 
                
                if(response.data.message ){
                    window.location.href='/'
                }
                setTimeout( ()=>{setBlog(response.data.blog);setLoading(false)}, 1000 )
                })
        }, [id])
        

    return {blog, loading}
}

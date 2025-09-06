import {createContext, useState , useEffect} from "react";
import {useAuth} from "@clerk/clerk-react";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";


const AuthContext = createContext({});

export default function AuthProvider({children}){
    const {getToken} = useAuth();


    useEffect(()=>{

        // setUp axios intercepter
        const interceptor = axiosInstance.interceptors.request.use(
            async(config)=>{
                try {
                    const token = await getToken();
                    if(token) config.headers.Authorization = `Bearer ${token}`;
                } catch (error) {
                    if(error.message?.includes("auth")||error.message?.includes("token")){
                        toast.error("Authtication issue.Please refresh the page." );
                    }
                    console.log("Error geting token:",error)
                }
                return config
            },
            (error)=>{
                console.log("Axios request error:",error);
                return Promise.reject(error);
            }
        );
        // cleanup function to remove the interceptors , this is important for avoid memory leaks.
        return ()=>axiosInstance.interceptors.request.eject(interceptor)
    },[getToken])


    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
    
}

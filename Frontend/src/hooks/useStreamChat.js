import { useState,useEffect, Component } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import {useQuery} from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// this hook is used to connect the current user to the Stream Chat API
// so that users can see each other's messages, send messages to each other, get realtime updates, etc.
// it also handles  the disconnection when the user leaves the page

export const useStreamChat = ()=>{
    const {user} = useUser();
    const [chatClient,setChatClient] = useState(null);


    // fetch strema token using react-query

    const {data:tokenData , isLoading:tokenLoading, error:tokenError} = useQuery({
        queryKey:["streamToken"],
        queryFn:getStreamToken,
        enabled:!!user?.id //this will take the object and convert it to a boolean
    })

    useEffect(()=>{
        const initChat = async()=>{
            if(!tokenData?.token||!user) return 
            try {
                const client = StreamChat.getInstance(STREAM_API_KEY);
                await client.connectUser({
                    id:user.id,
                    name:user.fullName,
                    image:user.imageUrl
                })
                setChatClient(client)
            } catch (error) {
                console.log("Error connecting to stream",error);
                Sentry.captureException(error,{
                    tags:{component:"useStremaChat"},
                    extra:{
                        context:"strem_chat_connection",
                        userId:user?.id,
                        streamApiKey:STREAM_API_KEY ? "present":"missing"
                    },
                })
                
            }
        }

        initChat();

        // CleanUp
        return ()=>{
            if(chatClient) chatClient.disconnectUser()
        }
    },[tokenData,user,chatClient]);


    return {chatClient,isLoading:tokenLoading,error:tokenError}

}
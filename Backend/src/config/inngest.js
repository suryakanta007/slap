import {Inngest} from "inngest";
import connectDB from "../DB/index.js";
import { User } from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";


export const inngest = new Inngest({id:"slack-clone"});



const  syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event}) =>{
        await connectDB();

        const {id,email_addresses,first_name,last_name,image_url} = event.data;

        const newUser = {
            clerkId:id,
            email:email_addresses[0]?.email_address,
            name:`${first_name||""} ${last_name||""}`,
            image:image_url
        }
        console.log("Working on user",newUser);

        const temp = await User.create(newUser);
        console.log(temp)
        
        await upsertStreamUser({
          id:newUser.clerkId,
          name:newUser.name,
          image:newUser.image
        })
    }
)

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
      await connectDB();
      const { id } = event.data;
      await User.deleteOne({ clerkId: id });
  
      await deleteStreamUser(id.toString());
    }
  );

export const functions = [syncUser , deleteUserFromDB]
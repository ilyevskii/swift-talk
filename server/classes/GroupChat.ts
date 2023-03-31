import { DB } from './Database'
import { ObjectId } from "mongodb";
import { Message } from './Message';
import {FileMessage} from "./FileMessage";
import {Chat} from "./Chat";
import {User} from "./User";


export class GroupChat extends Chat {

    async initialize(users: Array<ObjectId>, admins?: Array<ObjectId>, name?: string) {
        this.id = await this.db.insertOne(
            {
                users: users,
                admins: admins,
                messages: [],
                name: name,
                photo: ''
            }
        )
    }

   async set_photo(src: string) {
       await this.db.updateOneField({_id: this.id}, 'photo', src)
   }

   async add_user(user_id: ObjectId) {
       const data = await this.db.findOne({_id: this.id});
       let users = Array(data.users).push(user_id)
       await this.db.updateOneField({_id: this.id}, 'users', users)
   }

}
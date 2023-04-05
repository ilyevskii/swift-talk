import { Chat } from './Chat';
import { ObjectId } from "mongodb";
import { user_chats } from "../Database";

export class GroupChat extends Chat {

    constructor() {
        super();
    }

    async initialize(users: ObjectId[], name: string) {
        this.id = await this.db.insertOne(
            {
                type: 'group',
                name: name,
                photo: ''
            }
        )

        for (let i = 0; i < users.length; i++) {
            await user_chats.insertOne({user_id: new ObjectId(users[i].toString()), chat_id: this.id});
        }

        return this.id;
    }

    async set_name(name: string) {
        await this.db.updateOneField({_id: this.id}, "name", name)
    }

    async set_photo(photo_src: string) {
        await this.db.updateOneField({_id: this.id}, "photo", photo_src)
    }

}
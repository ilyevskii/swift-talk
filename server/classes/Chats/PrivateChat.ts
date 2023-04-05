import { Chat } from './Chat';
import { ObjectId } from "mongodb";
import { user_chats } from "../Database";

export class PrivateChat extends Chat {

    constructor() {
        super();
    }

    async initialize(first_user_id: string, second_user_id: string) {
        this.id = await this.db.insertOne(
            {
                type: 'private'
            }
        )

        await user_chats.insertOne({user_id: new ObjectId(first_user_id.toString()), chat_id: this.id});
        await user_chats.insertOne({user_id: new ObjectId(second_user_id.toString()), chat_id: this.id});

        return this.id;
    }

}

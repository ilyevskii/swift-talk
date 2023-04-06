import { Chat } from './Chat';
import { ObjectId } from "mongodb";
import { user_chats } from "../Database";

export class SavedMessages extends Chat {

    constructor() {
        super();
    }

    async initialize(user_id: string | ObjectId) {
        this.id = await this.db.insertOne(
            {
                type: 'saved_messages',
                name: 'Saved Messages',
                last_message: ""
            }
        )

        await user_chats.insertOne({user_id: new ObjectId(user_id.toString()), chat_id: this.id});

        return this.id;
    }

}

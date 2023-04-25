import { Chat } from './Chat';
import { ObjectId } from "mongodb";
import { user_chats } from "../Database";
import {User} from "../User";

export class PrivateChat extends Chat {

    constructor() {
        super();
    }

    async initialize(first_user_id: string, second_user_id: string) {

        this.id = await this.db.insertOne(
            {
                type: 'private',
                name: {
                    [first_user_id]: await User.getUsername(second_user_id),
                    [second_user_id]: await User.getUsername(first_user_id)
                },
                last_message: {}
            }
        )

        await user_chats.insertOne({user_id: new ObjectId(first_user_id.toString()), chat_id: this.id});
        await user_chats.insertOne({user_id: new ObjectId(second_user_id.toString()), chat_id: this.id});

        return this.id;
    }

}

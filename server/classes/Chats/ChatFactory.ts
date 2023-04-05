import { PrivateChat } from "./PrivateChat";
import { GroupChat } from "./GroupChat";
import { SavedMessages } from "./SavedMessages";
import {ObjectId} from "mongodb";

interface IChatFactory {
    createPrivateChat(first_user_id: string, second_user_id: string): Promise<PrivateChat>;
    createGroupChat(users: ObjectId[], name: string): Promise<GroupChat>;
    createSavedMessages(name: ObjectId): Promise<SavedMessages>;
}

class ChatFactory implements IChatFactory {

    async createPrivateChat(first_user_id: string, second_user_id: string): Promise<PrivateChat> {
        const chat = new PrivateChat();
        await chat.initialize(first_user_id, second_user_id);
        return chat;
    }

    async createGroupChat(users: ObjectId[], name: string = 'New group chat'): Promise<GroupChat> {
        const chat = new GroupChat();
        await chat.initialize(users, name);
        return chat;
    }

    async createSavedMessages(user_id: ObjectId): Promise<SavedMessages> {
        const chat = new SavedMessages();
        await chat.initialize(user_id.toString());
        return chat;
    }
}

export const ChatCreator = new ChatFactory();
import { DB } from './Database'
import { ObjectId } from "mongodb";
import { User } from './User';
import {Chat} from "./Chat";

export class Message {

    static readonly messagesDb: DB = new DB('messages');
    protected db!: DB;
    protected id: ObjectId;

    constructor(message_id?: ObjectId) {
        this.db = Message.messagesDb;

        if (typeof(message_id) === "string") {
            this.id = new ObjectId(message_id);
        }
        else{
            this.id = message_id;
        }
    }

    async initialize(text: string, sender: ObjectId, chat: ObjectId) {

        this.id = await this.db.insertOne(
            {
            text: text,
            sender_id: sender,
            sender_username: (await User.findOneUser({_id: sender})).username,
            chat_id: chat,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
        )
    }

    get_id() {
        return this.id;
    }

    async get_text() {
        const data = await this.db.findOne({_id: this.id});
        return data.text;

    }

    async set_text(text: string) {
        await this.db.updateOneField({_id: this.id}, 'text', text)
    }

    async get_sender_id() {
        const data = await this.db.findOne({_id: this.id});
        return data.sender_id;
    }

    async get_chat_id() {
        const data = await this.db.findOne({_id: this.id});
        return data.chat_id;
    }

    static async findMessage(query: object) {
        return await this.messagesDb.findOne(query);
    }

    static async findMessageByIdAndUpdate(id: string, query: object) {
        return await Message.messagesDb.findAndUpdateById(new(ObjectId), query);
    }


    static async deleteMessage(message) {
        await User.deleteMessage(message.sender_id, message._id);
        await Chat.deleteMessage(message.chat_id, message._id);
        await this.messagesDb.deleteOne({_id: new ObjectId(message._id)});
    }

}
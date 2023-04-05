import {chat_messages, DB} from './Database'
import { ObjectId } from "mongodb";
import { User } from './User';

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

    async initialize(text: string, sender_id: string | ObjectId, chat_id: string | ObjectId, attachments: string = '') {

        chat_id = new ObjectId(chat_id.toString());
        sender_id = new ObjectId(sender_id.toString());

        this.id = await this.db.insertOne(
            {
            text: text,
            sender_id: sender_id,
            sender_username: (await User.findOneUser({_id: sender_id})).username,
            chat_id: chat_id,
            time: new Date(Date.now()).getHours().toString().padStart(2, "0")
                + ":"
                + new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
            attachments: attachments
            }
        )

        await chat_messages.insertOne({chat_id: chat_id, message_id: this.id})
    }

    get_id() {
        return this.id;
    }

    async get_text() {
        return (await this.db.findOne({_id: this.id})).text;
    }

    async set_text(text: string) {
        await this.db.updateOneField({_id: this.id}, 'text', text)
    }

    async get_sender_id() {
        return (await this.db.findOne({_id: this.id})).sender_id;
    }

    async get_chat_id() {
        return (await this.db.findOne({_id: this.id})).chat_id;
    }

    static async findMessage(query: object) {
        return await this.messagesDb.findOne(query);
    }

    static async findMessageById(message_id: string | ObjectId) {
        return await this.messagesDb.findOne({_id: new ObjectId(message_id.toString())});
    }


    static async setNewMessageText(message_id: string | ObjectId, text: string) {
        await Message.messagesDb.updateOneField({_id: new ObjectId(message_id.toString())}, 'text', text)
    }

    static async deleteMessageById(message_id: string | ObjectId) {
        await chat_messages.deleteOne({message_id: new ObjectId(message_id.toString())});
        await Message.messagesDb.deleteOne({_id: new ObjectId(message_id.toString())});
    }

}
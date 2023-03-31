import { DB } from './Database'
import { ObjectId } from "mongodb";
import { Message } from './Message';
import {FileMessage} from "./FileMessage";
import {User} from "./User";

export class Chat {

    static readonly chatsDb: DB = new DB('chats');
    protected db!: DB;
    protected id: ObjectId;

    constructor(chat_id?: ObjectId) {
        this.db = Chat.chatsDb;

        if (chat_id) {
            if (typeof(chat_id) === "string") {
                this.id = new ObjectId(chat_id);
            }
            else{
                this.id = chat_id;
            }

        }
    }

    async initialize(users: ObjectId[]) {
        this.id = await this.db.insertOne(
            {
                users: users,
                messages: []
            }
        )

        for (let i = 0; i < users.length; i++) {
            if (typeof users[i] === "string") {
                await User.addNewChat(new ObjectId(users[i]), this.id)
            }
            else {
                await User.addNewChat(users[i], this.id)
            }

        }
    }

    get_id() {
        return this.id;
    }

    async get_users() {
        const data = await this.db.findOne({_id: this.id});
        return data.users;

    }

    async get_messages() {
        const data = await this.db.findOne({_id: this.id});
        return data.messages;

    }

    async send_message(sender_id: ObjectId, text: string, type?: string) {

        let message = new Message()

        if (type) {
            let message = new FileMessage()
            const src = ''
            await message.initialize(text, sender_id, this.id, type, src)
        } else {
            await message.initialize(text, sender_id, this.id)
        }


        await this.db.updateMany({_id: this.id}, {"$push": {"messages": message.get_id()}});

        const users = await this.get_users()
        for (let i = 0; i < users.length; i++) {
            if (typeof users[i] === "string") {
                await User.addNewMessage(new ObjectId(users[i]), this.id)
            }
            else {
                await User.addNewMessage(users[i], this.id)
            }
        }

        return message.get_id();

    }

    async delete_message(message_id: ObjectId) {
        const data = await this.db.findOne({_id: this.id});
        let messages = Array(data.messages).filter((message) => message !== message_id)
        await this.db.updateOneField({_id: this.id}, 'messages', messages)

        let message = new Message(message_id)
        let sender = new User(await message.get_sender_id())
        await sender.delete_message(message_id)

        await this.db.deleteOne({_id: this.id})
    }


    static async findOneChat(query: object) {
        return await Chat.chatsDb.findOne(query);
    }

    static async findAllChats(query: object) {
        return await Chat.chatsDb.findAll(query);
    }

    static async getAllMessagesIds(chat_id: string) {
        return (await Chat.chatsDb.findOne({_id: new ObjectId(chat_id)})).messages;

    }

    static async getAllMessageObjects(chat_id: string) {
        return await Chat.chatsDb.aggregate([
            { $match: { _id: new ObjectId(chat_id) } },
            { $lookup: {
                    from: "messages",
                    localField: "messages",
                    foreignField: "_id",
                    as: "messages"
                } }
        ])

    }

    static async deleteMessage(chat_id: string, message_id: string) {
        await this.chatsDb.updateMany({_id: new ObjectId(chat_id)},
                                        {"$pull": {"messages": new ObjectId(message_id)}});
    }

}
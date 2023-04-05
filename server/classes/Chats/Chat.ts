import {ObjectId} from "mongodb";
import {Message} from "../Message";
import {chat_messages, DB, user_chats} from "../Database";


export abstract class Chat{

    protected id: ObjectId;
    protected db: DB;
    protected static chatsDb: DB = new DB('chats');

    protected constructor() {this.db = Chat.chatsDb;}

    async send_message(sender_id: string | ObjectId, text: string, attachments?: string) {
        let message = new Message()
        let message_id;

        if (attachments) {
            message_id = await message.initialize(text, new ObjectId(sender_id.toString()), this.id, attachments)
        } else {
            message_id = await message.initialize(text, new ObjectId(sender_id.toString()), this.id)
        }

        await chat_messages.insertOne({chat_id: this.id, user_id: message_id})

        return message_id;
    }

    get_id() {
        return this.id;
    }

    async delete_message(message_id: string | ObjectId) {
        await chat_messages.deleteOne({chat_id: this.id, message_id: new ObjectId(message_id.toString())})
    }

    async get_messages() {
        return await chat_messages.findAll({chat_id: this.id})

    }

    static async findOneChatById(chat_id: string | ObjectId) {
        return await Chat.chatsDb.findOne({_id: new ObjectId(chat_id.toString())});
    }

    static async deleteChat(chat_id: string | ObjectId) {
        chat_id = new ObjectId(chat_id.toString());
        await Chat.chatsDb.deleteOne({_id: chat_id});
        await chat_messages.deleteMany({chat_id: chat_id});
        await user_chats.deleteMany({chat_id: chat_id});
    }

    static async getAllChatMessagesObjects(chat_id: string | ObjectId) {

        return await chat_messages.aggregate([

            {
                $lookup: {
                    from: "messages",
                    localField: "message_id",
                    foreignField: "_id",
                    as: "message"
                }
            },
            {$match: {chat_id: new ObjectId(chat_id.toString())}},
            {$unwind: "$message"},
            {
                $group: {
                    _id: "$chat_id",
                    messages: {
                        $push: "$message"
                    }
                }
            },
            {$project: {_id: 0, messages: 1}}
        ])
    }

    static async getAllChatUsersIds(chat_id: string | ObjectId) {
        const users = await user_chats.findAll({'chat_id': new ObjectId(chat_id.toString())});
        return (users).map(obj => obj.user_id);
    }
}
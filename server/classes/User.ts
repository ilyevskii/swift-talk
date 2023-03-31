import { DB } from './Database';
import { Profile } from "./Profile";
import { ObjectId} from "mongodb";
import {Message} from "./Message";
const config = require('config');

export class User {

    static readonly usersDb: DB = new DB('users');
    readonly db!: DB;
    private id!: ObjectId;

    constructor(user_id?: ObjectId) {

        this.db = User.usersDb;
        if (typeof(user_id) === "string") {
            this.id = new ObjectId(user_id);
        }
        else{
            this.id = user_id;
        }
    }

    async initialize(username: string, phone_number: string, password: string) {

        const users_profile = new Profile()
        await users_profile.initialize()
        this.id = await this.db.insertOne(
            {
                username: username,
                phone_number: phone_number,
                password: password,
                profile: users_profile.get_id(),
                chats: [],
                messages: [],
                contacts: []
            }
        )
    }


    get_id() {
        return this.id;
    }

    async get_profile_id() {
        const data = await this.db.findOne({_id: this.id});
        return data.profile;

    }
    async get_username() {
        const data = await this.db.findOne({_id: this.id});
        return data.username;

    }

    async get_password() {
        const data = await this.db.findOne({_id: this.id});
        return data.password;

    }

    async set_username(username: string) {
        await this.db.updateOneField({_id: this.id}, 'username', username)
    }

    async get_phone_number() {
        const data = await this.db.findOne({_id: this.id});
        return data.phone_number;
    }

    async set_phone_number(phone_number: string) {
        await this.db.updateOneField({_id: this.id}, 'phone_number', phone_number)
    }

    async add_chat(chat_id: ObjectId) {
        let chats = (await this.db.findOne({_id: this.id})).chats;
        chats.push(chat_id);
        await this.db.updateOneField({_id: this.id}, 'chats', chats)
    }

    async delete_chat(chat_id: ObjectId) {
        const data = await this.db.findOne({_id: this.id});
        let chats = Array(data.chats).filter((chat) => chat !== chat_id)
        await this.db.updateOneField({_id: this.id}, 'chats', chats)
    }

    async add_message(message_id: ObjectId) {
        let messages = (await this.db.findOne({_id: this.id})).messages;
        messages.push(message_id);
        await this.db.updateOneField({_id: this.id}, 'messages', messages)
    }

    async delete_message(message_id: ObjectId) {
        const data = await this.db.findOne({_id: this.id});
        let messages = Array(data.chats).filter((message) => message !== message_id)
        await this.db.updateOneField({_id: this.id}, 'messages', messages)
    }

    async get_messages() {
        const data = await this.db.findOne({_id: this.id});
        return data.messages;

    }

    async get_chats() {
        const data = await this.db.findOne({_id: this.id});
        return data.chats;
    }

    static async findOneUser(query: object) {
        return await User.usersDb.findOne(query);
    }

    static async findAllUsers(query: object) {
        return await User.usersDb.findAll(query);
    }

    static async deleteUserById(id: string) {
        return await User.usersDb.findAndDeleteById(new ObjectId(id));
    }

    static async findUserByIdAndUpdate(id: string, query: object) {
        return await User.usersDb.findAndUpdateById(new(ObjectId), query);
    }

    static async addNewChat(user_id: ObjectId, chat_id: ObjectId) {
        await this.usersDb.updateMany({_id: user_id}, {"$push": {"chats": chat_id}});
    }

    static async addNewMessage(user_id: ObjectId, message_id: ObjectId) {
        await this.usersDb.updateMany({_id: user_id}, {"$push": {"messages": message_id}});
    }

    static async deleteMessage(user_id: string, message_id: string) {
        await this.usersDb.updateMany({_id: new ObjectId(user_id)},
                                    {"$pull": {"messages": new ObjectId(message_id)}});
    }
}
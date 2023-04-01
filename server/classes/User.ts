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

    async get_phone_number() {
        const data = await this.db.findOne({_id: this.id});
        return data.phone_number;
    }

    async get_messages() {
        const data = await this.db.findOne({_id: this.id});
        return data.messages;

    }

    async get_chats() {
        const data = await this.db.findOne({_id: this.id});
        return data.chats;
    }

    async get_contacts() {
        const data = await this.db.findOne({_id: this.id});
        return data.contacts;
    }


    async set_username(username: string) {
        await this.db.updateOneField({_id: this.id}, 'username', username)
    }

    async set_phone_number(phone_number: string) {
        await this.db.updateOneField({_id: this.id}, 'phone_number', phone_number)
    }


    async add_contact(contact_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$push": {"contacts": contact_id}});
    }

    async add_chat(chat_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$push": {"chats": chat_id}});
    }

    async add_message(message_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$push": {"messages": message_id}});
    }


    async delete_contact(contact_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$pull": {"contacts": contact_id}});
    }

    async delete_chat(chat_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$pull": {"chats": chat_id}});
    }

    async delete_message(message_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$pull": {"messages": message_id}});
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

    static async findUserByIdAndUpdate(id: string, newObject: object) {
        return await User.usersDb.findAndUpdateById(new ObjectId(id), newObject);
    }

    static async addNewChat(user_id: ObjectId, chat_id: ObjectId) {
        await this.usersDb.updateMany({_id: user_id}, {"$push": {"chats": chat_id}});
    }

    static async addNewContact(user_id: ObjectId, contact_id: ObjectId) {
        await this.usersDb.updateMany({_id: user_id}, {"$push": {"contacts": contact_id}});
    }

    static async addNewMessage(user_id: ObjectId, message_id: ObjectId) {
        await this.usersDb.updateMany({_id: user_id}, {"$push": {"messages": message_id}});
    }

    static async deleteMessage(user_id: string, message_id: string) {
        await this.usersDb.updateMany({_id: new ObjectId(user_id)},
                                    {"$pull": {"messages": new ObjectId(message_id)}});
    }
}
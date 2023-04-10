import {DB, user_chats, user_contacts} from './Database';
import {Profile} from "./Profile";
import {ObjectId} from "mongodb";
import {ChatFactory, ChatTypes} from "./Chats/ChatFactory";
import {SavedMessages} from "./Chats/SavedMessages";
import {PrivateChat} from "./Chats/PrivateChat";

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
        const profile_id = await users_profile.initialize()

        this.id = await this.db.insertOne(
            {
                username: username,
                phone_number: phone_number,
                password: password,
                profile_id: profile_id
            }
        )
        const saved_messages = ChatFactory.createChat(ChatTypes.MSG) as SavedMessages;
        await saved_messages.initialize(this.id);
    }

    get_id() {
        return this.id;
    }

    async get_profile_id() {
        return (await this.db.findOne({_id: this.id})).profile_id;
    }

    async get_username() {
        return (await this.db.findOne({_id: this.id})).username;
    }

    async get_password() {
        return (await this.db.findOne({_id: this.id})).password;

    }

    async get_phone_number() {
        return (await this.db.findOne({_id: this.id})).phone_number;
    }


    async get_contacts() {
        return (await this.db.findOne({_id: this.id})).contacts;
    }


    async set_username(username: string) {
        await this.db.updateOneField({_id: this.id}, 'username', username)
    }

    async set_phone_number(phone_number: string) {
        await this.db.updateOneField({_id: this.id}, 'phone_number', phone_number)
    }


    async add_contact(contact_id: ObjectId | string) {
        await user_contacts.insertOne({user_id: this.id, contact_id: new ObjectId(contact_id.toString())})
    }

    async delete_contact(contact_id: ObjectId) {
        await this.db.updateMany({_id: this.id}, {"$pull": {"contacts": contact_id}});
    }

    static async findOneUser(query: object) {
        return await User.usersDb.findOne(query);
    }

    static async findOneUserById(user_id: string) {
        return await User.usersDb.findOne({_id: new ObjectId(user_id)});
    }

    static async getUsername(user_id: string) {
        return (await User.usersDb.findOne({_id: new ObjectId(user_id.toString())})).username;
    }

    static async deleteUserById(id: string) {
        return await User.usersDb.findAndDeleteById(new ObjectId(id));
    }

    static async findUserByIdAndUpdate(id: string, newObject: object) {
        return await User.usersDb.findAndUpdateById(new ObjectId(id), newObject);
    }

    static async addNewChat(user_id: ObjectId, chat_id: ObjectId) {
        await user_chats.insertOne({user_id: user_id, chat_id: chat_id})
    }

    static async addNewContact(user_id: ObjectId | string, contact_id: ObjectId | string) {
        const chat = ChatFactory.createChat(ChatTypes.PRIVATE) as PrivateChat;
        await chat.initialize(user_id.toString(), contact_id.toString());
        await user_contacts.insertOne(
            {
                user_id: new ObjectId(user_id.toString()),
                contact_id: new ObjectId(contact_id.toString()),
                chat_id: chat.get_id()
            }
        )
    }

    static async getAllUserChatsIds(user_id: string | ObjectId) {
        return await user_chats.findAll({user_id: new ObjectId(user_id.toString())})
    }

    static async getAllUserContacts(user_id: string) {
        return await user_contacts.findAll({user_id: new ObjectId(user_id)})
    }

    static async getAllUserChats(user_id: string) {

        return await user_chats.aggregate([

            {
                $lookup: {
                    from: "chats",
                    localField: "chat_id",
                    foreignField: "_id",
                    as: "chat"
                }
            },
            {$match: {user_id: new ObjectId(user_id)}},
            {$unwind: "$chat"},
            {
                $group: {
                    _id: "$user_id",
                    chats: {
                        $push: "$chat"
                    }
                }
            },
            {$project: {_id: 0, chats: 1}}
        ])
    }
}

import {MongoClient, Collection, Db, ObjectId} from 'mongodb';

const config = require('config');

const DB_URI = config.get('Dev.DB.uri');
const DB_NAME = config.get('Dev.DB.name');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
};

export const CLIENT = new MongoClient(DB_URI, OPTIONS);

export class DB {

    public collection!: Collection;
    private client!: MongoClient;
    private db !: Db;

    constructor(private collectionName: string) {
        this.client = CLIENT;
        this.db = this.client.db(DB_NAME)
        this.collection = this.db.collection(this.collectionName);
    }

    async find(query?: object) {
        return (await this.collection.find(query || {})).next();
    }

    async findAll(query?: object) {
        return await this.collection.find(query || {}).toArray();
    }

    async findOne(query: object) {
        return await this.collection.findOne(query);
    }

    async findLastOne(query: object) {
        return (await this.collection.find(query).sort({ _id: -1 }).limit(1)).next();
    }

    async insertOne(document: object) {
        const result = await this.collection.insertOne(document);
        return result.insertedId;
    }

    async updateOneField(query: object, field: string, value) {
        let new_data = await this.findOne(query)
        new_data[field] = value
        const result = await this.collection.updateOne(query, { $set: new_data });
        return result.modifiedCount;
    }

    async updateAllFields(query: object, update: object) {
        const result = await this.collection.updateOne(query, { $set: update });
        return result.modifiedCount;
    }

    async deleteOne(query: object) {
        const result = await this.collection.deleteOne(query);
        return result.deletedCount;
    }

    async deleteMany(query: object) {
        await this.collection.deleteMany(query);
    }

    async findAndDeleteById(id: ObjectId) {
        await this.collection.findOneAndDelete({"_id": id})
    }

    async findAndUpdateById(id: ObjectId, newObject: object) {
        await this.collection.updateOne({_id: id}, {$set: newObject})
    }

    async updateMany(filter: object, update: object) {
        await this.collection.updateMany(filter, update);
    }

    async aggregate(query: object[]) {
        let res = await (await this.collection.aggregate(query)).toArray();
        return res[0];
    }
}

export const user_chats = new DB('user_chats');
export const chat_messages = new DB('chat_messages');
export const user_contacts = new DB('user_contacts');
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

    async findAll(query?: object) {
        return await this.collection.find(query || {}).toArray();
    }

    async findOne(query: object) {
        return await this.collection.findOne(query);
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

    async findAndDeleteById(id: ObjectId) {
        await this.collection.findOneAndDelete({"_id": id})
    }

    async findAndUpdateById(id: ObjectId, newObject: object) {
        await this.collection.findOneAndUpdate({"_id": id}, newObject)
    }

    async updateMany(filter: object, update: object) {
        await this.collection.updateMany(filter, update);
    }

    async aggregate(query: object[]) {
        let res = await (await this.collection.aggregate(query)).toArray();
        return res[0];
    }
}
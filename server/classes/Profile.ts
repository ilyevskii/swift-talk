import { DB } from './Database'
import { ObjectId } from "mongodb";

export class Profile {

    static readonly db: DB = new DB('profiles');
    readonly db!: DB;
    private id: ObjectId;

    constructor(profile_id?: ObjectId) {

        this.db = Profile.db;
        if (typeof(profile_id) === "string") {
            this.id = new ObjectId(profile_id);
        }
        else{
            this.id = profile_id;
        }

    }

    async initialize() {
        this.id = await this.db.insertOne(
            {
            first_name: '',
            last_name: '',
            bio: ''
            }
        )
        return this.id;
    }

    get_id() {
        return this.id;
    }
    async get_first_name() {
        return (await this.db.findOne({_id: this.id})).first_name;
    }

    async set_first_name(first_name: string) {
        await this.db.updateOneField({_id: this.id}, 'first_name', first_name)
    }

    async get_last_name() {
        return (await this.db.findOne({_id: this.id})).last_name;
    }

    async set_last_name(last_name: string) {
        await this.db.updateOneField({_id: this.id}, 'last_name', last_name)
    }

    async get_bio() {
        return (await this.db.findOne({_id: this.id})).bio;
    }

    async set_bio(bio: string) {
        await this.db.updateOneField({_id: this.id}, 'bio', bio)
    }

    static async set_first_name(profile_id: ObjectId, first_name: string) {
        await Profile.db.updateOneField({_id: profile_id}, 'first_name', first_name)
    }

    static async set_last_name(profile_id: ObjectId, last_name: string) {
        await Profile.db.updateOneField({_id: profile_id}, 'last_name', last_name)
    }

    static async set_bio(profile_id: ObjectId, bio: string) {
        await Profile.db.updateOneField({_id: profile_id}, 'bio', bio)
    }
}
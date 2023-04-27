import {Document, ObjectId, WithId} from "mongodb";

import {DB} from './Database'


export class Profile {

    static readonly profilesDb: DB = new DB('profiles');


    static async addProfile(): Promise<ObjectId> {
        return await this.profilesDb.insertOne(
            {
                first_name: '',
                last_name: '',
                bio: ''
            }
        )
    }

    static async findProfile(query: object): Promise<any> {
        return await Profile.profilesDb.findOne(query);
    }

    static async findProfileById(user_id: string | ObjectId): Promise<WithId<Document>> {
        return await Profile.profilesDb.findOne({_id: new ObjectId(user_id.toString())});
    }
}
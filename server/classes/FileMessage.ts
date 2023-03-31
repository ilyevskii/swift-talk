import { ObjectId } from "mongodb";
import {Message} from "./Message";


export class FileMessage extends Message {

    async initialize(text: string, sender: ObjectId, chat: ObjectId, fileType?: string, src?: string) {
        this.id = await this.db.insertOne(
            {
                text: text,
                sender_id: sender,
                chat_id: chat,
                type: fileType,
                src: src
            }
        )
    }

    async get_file_src() {
        const data = await this.db.findOne({_id: this.id});
        return data.src;

    }

    async set_file_src(src: string) {
        await this.db.updateOneField({_id: this.id}, 'src', src)
    }

    async get_file_type() {
        const data = await this.db.findOne({_id: this.id});
        return data.type;
    }


}
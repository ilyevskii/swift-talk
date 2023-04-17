import {ChatRepository, Chat, ChatDTO} from "./ChatRepository";
import axios from "axios";

export interface User {
    _id: string,
    username: string,
    phone_number: string,
    password: string,
    profile_id: string
}

export interface Contact extends User{
    chat_id: string;
}

export interface ContactDTO {
    _id: string;
    username: string;
    chat_id: string;
}

export interface UserDTO {
    _id: string;
    username: string;
    phone_number: string;
    profile_id: string;
}

export class UserRepository {
    private readonly RequestsUrl: string;

    constructor(serverUrl: string) {
        this.RequestsUrl = `${serverUrl}/api`;
    }

    async getUserInfo(user_id: string): Promise<UserDTO | undefined> {
        try {
            const response = await axios.get(`${this.RequestsUrl}/user/${user_id}`);
            const user: User = response.data as User;

            return UserRepository.userDTO(user);

        } catch (err: any) {
            console.log(err.toString());
        }
    }

    async getAllUserChats(user_id: string): Promise<(ChatDTO | undefined)[] | []> {
        try {
            const response = await axios.get(`${this.RequestsUrl}/user/chats/${user_id}`);
            const user_chats: Chat[] = response.data as Chat[];
            const chatRepo: ChatRepository = new ChatRepository(this.RequestsUrl.slice(0, -4));

            return await Promise.all(user_chats.map(async (chat: Chat) => {
                return await chatRepo.getChatInfo(user_id, chat._id);
            }));

        } catch (err: any) {
            console.log(err.toString());
            return [];
        }
    }

    async getAllUserContacts(user_id: string): Promise<ContactDTO[] | undefined> {
        try{
            const response: any = await axios.get(`${this.RequestsUrl}/user/contacts/${user_id}`);
            const user_contacts = response.data;

            return await Promise.all(user_contacts.map(async (contact: {user_id: string, contact_id: string, chat_id: string}) => {
                const response = await axios.get(`${this.RequestsUrl}/user/${contact.contact_id}`);
                const contact_info: Contact = response.data as Contact;
                contact_info.chat_id = contact.chat_id;

                return UserRepository.contactDTO(contact_info);
            }));
        }
        catch (err: any) {
            console.log(err.toString());
        }
    }

    static contactDTO(contact: Contact): ContactDTO {

        return {
            _id: contact._id,
            username: contact.username,
            chat_id: contact.chat_id,
        };
    }

    static userDTO(user: User): UserDTO {

        return {
            _id: user._id,
            username: user.username,
            phone_number: user.phone_number,
            profile_id: user.profile_id,
        };
    }

}

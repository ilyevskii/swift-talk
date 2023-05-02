import {ChatRepository, Chat, ChatDTO} from "./ChatRepository";
import axios from "axios";

export interface User {
    _id: string,
    username: string,
    phone_number: string,
    password: string,
    profile_id: string
}

export interface Profile {
    first_name: string;
    last_name: string;
    bio: string;
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
    first_name: string;
    last_name: string;
    bio: string;
}

export class UserRepository {
    private readonly RequestsUrl: string;

    constructor(serverUrl: string) {
        this.RequestsUrl = `${serverUrl}/api`;
    }

    async getUserInfo(user_id: string): Promise<UserDTO | undefined> {
        try {

            const user_response = await axios.get(`${this.RequestsUrl}/user/${user_id}`);
            const user: User = user_response.data as User;

            const profile_response = await axios.get(`${this.RequestsUrl}/user/profile/${user.profile_id}`);
            const profile: Profile = profile_response.data as Profile;


            return UserRepository.userDTO(user, profile);

        } catch (err: any) {
            console.log(err.toString());
        }
    }
    async setUserInfo(user: UserDTO): Promise<void> {
        try {
            await axios.put(`${this.RequestsUrl}/user/${user._id}`,
                {
                    _id: user._id,
                    username: user.username,
                    phone_number: user.phone_number,
                    profile_id: user.profile_id
                });

            await axios.put(`${this.RequestsUrl}/user/profile/${user.profile_id}`,
                {
                    _id: user.profile_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    bio: user.bio
                });

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

    static userDTO(user: User, profile: Profile): UserDTO {

        return {
            _id: user._id,
            username: user.username,
            phone_number: user.phone_number,
            profile_id: user.profile_id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            bio: profile.bio
        };
    }

}

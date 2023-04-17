import {MessageRepository, MessageDTO} from "./MessageRepository";
import axios from "axios";

export interface Chat {
    _id: string;
    name: string | Record<string, string>;
    type: string;
    last_message: string | MessageDTO;
}

export interface ChatDTO {
    _id: string;
    name: string;
    type: string;
    last_message: MessageDTO;
}

export class ChatRepository {
    private readonly RequestsUrl: string;

    constructor(serverUrl: string) {
        this.RequestsUrl = `${serverUrl}/api`;
    }

    public async getLastMessage(chat_id: string): Promise<MessageDTO | undefined> {
        try {
            const response: any = await axios.get(`${this.RequestsUrl}/chat/lastMessage/${chat_id}`);
            const data = response.data;

            if (data) {
                const message_id = data.message_id;
                if (message_id) {
                    return await MessageRepository.getMessageInfo(this.RequestsUrl, message_id);
                }
            }

        } catch (err: any) {
            console.log(err.toString());
        }
    }

    private static chatDTO(chat: Chat, last_message?: MessageDTO, user_id?: string): ChatDTO  | undefined{

        try{

            if (chat.type === "private" && typeof chat.name === "object") {
                chat.name = chat.name[user_id!] as string;
            }
            if (last_message) {
                chat.last_message = MessageRepository.messageDTO(last_message);
            }
            return chat as ChatDTO;
        }
        catch (err: any) {
            console.log(err.toString());
        }

    }

    public async getChatInfo(user_id: string, chat_id: string | Chat): Promise<ChatDTO | undefined> {

        try {
            let chat: Chat;

            if (typeof chat_id === "string") {
                const chat_response = await axios.get(`${this.RequestsUrl}/chat/${chat_id}`);
                chat = chat_response.data as Chat;
            }
            else {
                chat = chat_id;
            }

            const last_message: MessageDTO | undefined = await this.getLastMessage(chat._id);
            return ChatRepository.chatDTO(chat, last_message, user_id);

        } catch (err: any) {
            console.log(err.toString());
        }
    }

    public async getChatMessages(chat_id: string): Promise<MessageDTO[]> {
        try {

            const response: any = await axios.get(`${this.RequestsUrl}/chat/messages/${chat_id}`);

            if (response.data.length) {
                const chat_messages = response.data;
                return chat_messages.map(MessageRepository.messageDTO);
            } else {
                return [];
            }

        } catch (err: any) {
            console.log(err.toString());
            return [];
        }
    }

    public static async getChatInfo(url: string, user_id: string, chat_id: string): Promise<ChatDTO | undefined> {
        try {
            const chat_response: any = await axios.get(`${url}/chat/${chat_id}`);
            const chat: ChatRepository = new ChatRepository(url);
            const last_message: MessageDTO | undefined = await chat.getLastMessage(chat_id);

            return ChatRepository.chatDTO(chat_response.data, last_message, user_id);

        } catch (err: any) {
            console.log(err.toString());
        }
    }
}

import {UserAPI, ChatAPI} from "messanger-serializer";

const HOST = "http://localhost";
const PORT = "3001";

export const userRepo = new UserAPI(HOST, PORT);
export const chatRepo = new ChatAPI(HOST, PORT);

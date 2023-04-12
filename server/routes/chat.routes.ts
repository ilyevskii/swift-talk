import {PrivateChat} from "../classes/Chats/PrivateChat";
import {GroupChat} from "../classes/Chats/GroupChat";

const router = require("express").Router();
import {ChatFactory, ChatTypes} from "../classes/Chats/ChatFactory";
import {Chat} from "../classes/Chats/Chat";



// CREATE PRIVATE CHAT
router.post("/private", async (req, res) => {
    try {
        const chat = ChatFactory.createChat(ChatTypes.PRIVATE) as PrivateChat;
        await chat.initialize(req.body.first_user_id, req.body.second_user_id);
        res.status(200).json(await Chat.findOneChatById(chat.get_id()));

    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// CREATE GROUP CHAT
router.post("/group", async (req, res) => {
    try {
        const chat = ChatFactory.createChat(ChatTypes.GROUP) as GroupChat;
        if (req.body.name) {
            await chat.initialize(req.body.users, req.body.name);
        }
        else {
            await chat.initialize(req.body.users);
        }
        res.status(200).json(await Chat.findOneChatById(chat.get_id()));

    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// GET ALL USERS IN CHAT
router.get("/users/:chatId", async (req, res) => {
    try {
        const users = await Chat.getAllChatUsersIds(req.params.chatId);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// GET ALL MESSAGES IN CHAT
router.get("/messages/:chatId", async (req, res) => {
    try {
        const data = await Chat.getAllChatMessagesObjects(req.params.chatId);
        res.status(200).json(data.messages);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// GET LAST MESSAGE IN CHAT
router.get("/lastMessage/:chatId", async (req, res) => {
    try {
        const data = await Chat.getLastMessage(req.params.chatId);
        res.status(200).json({message_id: data.message_id});
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// GET CHAT INFO
router.get("/:chatId", async (req, res) => {
    try {
        const chat = await Chat.findOneChatById(req.params.chatId);

        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// DELETE CHAT
router.delete("/:chatId", async (req, res) => {
    try {
        const chat = await Chat.findOneChatById(req.params.chatId);

        if (!chat) {
            res.status(404).json("Chat doesn`t exists");
            return;
        }

        await Chat.deleteChat(req.params.chatId);
        res.status(200).json("Chat has been deleted.");
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


module.exports = router;
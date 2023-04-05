const router = require("express").Router();
import {ChatCreator} from "../classes/Chats/ChatFactory";
import {Chat} from "../classes/Chats/Chat";


// CREATE PRIVATE CHAT
router.post("/private", async (req, res) => {
    try {
        const chat = await ChatCreator.createPrivateChat(req.body.first_user_id, req.body.second_user_id);
        res.status(200).json(await Chat.findOneChatById(chat.get_id()));

    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// CREATE GROUP CHAT
router.post("/group", async (req, res) => {
    try {
        let chat;
        console.log(1)
        if (req.body.name) {
            console.log(2)
            chat = await ChatCreator.createGroupChat(req.body.users, req.body.name);
            console.log(4)
        }
        else {
            console.log(3)
            chat = await ChatCreator.createGroupChat(req.body.users);
            console.log(5)
        }
        res.status(200).json(await Chat.findOneChatById(chat.get_id()));

    } catch (err) {
        console.log(11)
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
        const messages = await Chat.getAllChatMessagesObjects(req.params.chatId);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
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
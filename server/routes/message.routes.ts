const router = require("express").Router();

import {Message} from "../classes/Message";
import {Chat} from "../classes/Chat";
import {ObjectId} from "mongodb";

// add new message
router.post("/", async (req, res) => {
    try {
        const newMessage = new Message();
        await newMessage.initialize(req.body.text, req.body.sender_id, req.body.chat_id)

        res.status(200).json(await Message.findMessage({_id: newMessage.get_id()}));
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// get messages in chat
router.get("/:chatId", async (req, res) => {
    try {
        const messages = await Chat.getAllMessageObjects(req.params.chatId);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/info/:messageId", async (req, res) => {
    try {
        const message = await Message.findMessage({_id: new ObjectId(req.params.messageId)});
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/edit/:messageId", async (req, res) => {

    try {
        await Message.findMessageByIdAndUpdate(req.params.userId, {
            $set: req.body,
        });
        res.status(200).json("Message has been updated");
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }

});


module.exports = router;
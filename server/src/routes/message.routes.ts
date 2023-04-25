const router = require("express").Router();
import {Message} from "../classes/Message";

// SEND NEW MESSAGE
router.post("/", async (req, res) => {
    try {
        const newMessage = new Message();
        await newMessage.initialize(req.body.text, req.body.sender_id, req.body.chat_id)

        res.status(200).json(await Message.findMessage({_id: newMessage.get_id()}));
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


// GET MESSAGE INFO
router.get("/:messageId", async (req, res) => {
    try {
        const message = await Message.findMessageById(req.params.messageId);

        if (!message) {
            res.status(404).json("message doens`t exists");
            return;
        }

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
});


// EDIT MESSAGE
router.put("/:messageId", async (req, res) => {

    try {
        const message = await Message.findMessageById(req.params.messageId);

        if (!message) {
            res.status(404).json("message doesn`t exists");
            return;
        }

        if (message.sender_id.toString() === req.body.user_id) {
            await Message.setNewMessageText(req.params.messageId, req.body.text);
            res.status(200).json("Message has been updated");
        }
        else {
            res.status(403).json("You can delete only your messages");
        }
    }
    catch (err) {
        res.status(500).json({error: err.toString()});
    }

});


// DELETE MESSAGE
router.delete("/:messageId", async (req, res) => {

    try {
        const message = await Message.findMessageById(req.params.messageId);

        if (!message) {
            res.status(404).json("message doesn`t exists");
            return;
        }

        if (message.sender_id.toString() === req.body._id) {
            await Message.deleteMessageById(req.params.messageId);
            res.status(200).json("Message has been deleted");
        }
        else {
            res.status(403).json("You can delete only your messages");
        }

    } catch (err) {
        res.status(500).json({error: err.toString()});
    }

});


module.exports = router;
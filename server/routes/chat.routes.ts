import {User} from "../classes/User";

const router = require("express").Router();
import {Chat} from "../classes/Chat";


// add chat
router.post("/", async (req, res) => {
    try {
        const chat = new Chat()
        await chat.initialize(req.body.users)

        res.status(200).json(await Chat.findOneChat({"_id": chat.get_id()}));
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// get all user chats
router.get("/:userId", async (req, res) => {
    try {
        const chat = await User.findAllUsers({
            users: {$elemMatch: {$eq: req.params.userId}}
        });

        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


module.exports = router;
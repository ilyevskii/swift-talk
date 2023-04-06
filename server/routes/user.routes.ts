const router = require("express").Router();
import {User} from '../classes/User'
const bcrypt = require("bcrypt");

//GET USER INFO
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOneUserById(req.params.userId);

        if (!user) {
            res.status(404).json("user doesn`t exists");
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


//CHANGE USER INFO
router.put("/:userId", async (req, res) => {
    if (req.body._id === req.params.userId) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            delete req.body._id;
            await User.findUserByIdAndUpdate(req.params.userId, req.body);
            res.status(200).json("Account has been updated");
        } catch (err) {
            res.status(500).json({error: err.toString()});
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});


//DELETE USER
router.delete("/:userId", async (req, res) => {

    if (req.body._id === req.params.userId) {
        try {
            await User.deleteUserById(req.params.userId);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            res.status(500).json({error: err.toString()});
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});


// GET ALL USER CHAT IDS
router.get("/chats/:userId", async (req, res) => {
    try {
        const chats = await User.getAllUserChatsIds(req.params.userId);
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


module.exports = router;
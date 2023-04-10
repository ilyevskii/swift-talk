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


// GET ALL USER CHATS
router.get("/chats/:userId", async (req, res) => {
    try {
        const chats = await User.getAllUserChats(req.params.userId);
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// GET ALL USER CONTACTS
router.get("/contacts/:userId", async (req, res) => {
    try {
        const contacts = await User.getAllUserContacts(req.params.userId);
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// ADD NEW CONTACT
router.post("/contact", async (req, res) => {
    try {
        const contact = await User.findOneUser({phone_number: req.body.contact_phone_number})

        if (contact) {
            await User.addNewContact(req.body.user_id, contact._id);
            res.status(200).json("Contact was added.");
        }
        else {
            res.status(404).json("user doesn`t exists");
        }

    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


module.exports = router;
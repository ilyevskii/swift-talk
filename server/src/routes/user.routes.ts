import {User, UserType} from '../classes/User'

const router = require("express").Router();
const bcrypt = require("bcrypt");


//GET USER INFO
router.get("/:userId", async (req, res): Promise<void> => {

    try {
        const user: UserType = await User.findOneUserById(req.params.userId);

        if (!user) {
            res.status(404).json("User doesn`t exists");
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


//CHANGE USER INFO
router.put("/:userId", async (req, res): Promise<void> => {

    if (req.body._id === req.params.userId) {

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json(err);
                return;
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
        res.status(403).json("You can update only your account!");
    }
});


//DELETE USER
router.delete("/:userId", async (req, res): Promise<void> => {

    if (req.body._id === req.params.userId) {

        try {
            await User.deleteUserById(req.params.userId);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            res.status(500).json({error: err.toString()});
        }

    } else {
        res.status(403).json("You can delete only your account!");
    }
});


// GET ALL USER CHATS
router.get("/chats/:userId", async (req, res): Promise<void> => {

    try {
        const data: any = await User.getAllUserChats(req.params.userId);
        res.status(200).json(data.chats);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// GET ALL USER CONTACTS
router.get("/contacts/:userId", async (req, res): Promise<void> => {

    try {
        const contacts: any[] = await User.getAllUserContacts(req.params.userId);
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

// ADD NEW CONTACT
router.post("/contact", async (req, res): Promise<void> => {

    try {
        const contact: UserType = await User.findOneUser({phone_number: req.body.contact_phone_number})

        if (contact) {
            await User.addNewContact(req.body.user_id, contact._id);
            res.status(200).json("Contact was added.");
        }
        else {
            res.status(404).json("User doesn`t exists.");
        }

    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});


module.exports = router;
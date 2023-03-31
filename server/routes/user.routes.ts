const router = require("express").Router();
import {User} from '../classes/User'
import {ObjectId} from "mongodb";
const bcrypt = require("bcrypt");

//get user info
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOneUser({_id: new ObjectId(req.params.userId)});
        if (!user) {
            res.status(404).json("user doesn`t exists");
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

//change user info
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
            await User.findUserByIdAndUpdate(req.params.userId, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            res.status(500).json({error: err.toString()});
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

//delete user
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



module.exports = router;
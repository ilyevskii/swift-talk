const router = require("express").Router();
const bcrypt = require("bcrypt");
import { User } from '../classes/User'

//REGISTER
router.post("/register", async (req, res) => {
    try {

        // check if user with such phone number or username exists
        if (await User.findOneUser({phone_number: req.body.phone_number})
            || await User.findOneUser({username: req.body.username}))
        {
            res.status(404).json("user exists");
            return;
        }

        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const user = new User();
        await user.initialize(req.body.username, req.body.phone_number, hashedPassword)

        res.status(200).json(await User.findOneUser({_id: user.get_id()}));
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        //try to found user with such phone number
        const user = await User.findOneUser({phone_number: req.body.phone_number})
        if (!user) {
            res.status(404).json("user not found");
            return;
        }

        //check if password correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json("wrong password");
            return
        }

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({error: err.toString()});
    }
});

module.exports = router;
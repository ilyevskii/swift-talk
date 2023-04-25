import {Express} from 'express';
import {Server} from "socket.io";
import {ObjectId} from "mongodb";
import {Message} from "./classes/Message";
import {User} from "./classes/User";
import {Chat} from "./classes/Chats/Chat";

const express = require('express');
const config = require('config');
const http = require('http');
const cors = require('cors');
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth.routes");
const chatRoute = require("./routes/chat.routes");
const userRoute = require("./routes/user.routes");
const messageRoute = require("./routes/message.routes");

const app: Express = express()
const port = config.get('Dev.programConfig.port');
const server = http.createServer(app);


app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200
    }
});

io.on("connection", (socket) => {

    socket.on("join_chat", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        try {

            Chat.sendMessage(data.chat_id, data.sender_id, data.text).then(() => {
                    io.in(data.chat_id).emit("receive_message")
            }).catch(err => console.log(err.toString()))
        }
        catch (err) {
            console.log(err.toString());
        }


    })

    socket.on("delete_message", (message) => {})

    socket.on("add_contact", (data) => {

        User.findOneUser({phone_number: data.new_contact_number}).then(contact => {

            if (contact) {
                User.addNewContact(new ObjectId(data.user_id), contact._id).then((chat_id) => {
                        if (socket.id === data.socket_id) {
                            socket.emit('new_contact', {error: false, chat_id: chat_id})
                        }
                    }
                )
            }
            else {

                if (socket.id === data.socket_id) {
                    socket.emit('new_contact', {error: 'There are no users with such number!'})
                }
            }
        })

    })

    socket.on("get_contact_info", (contact_id) => {

    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})

app.use(bodyParser.json());
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(port, () => {
    console.log(`Server has been started on port ${port}...`)
})

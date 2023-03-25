import {Express} from 'express';
const express = require('express');
const config = require('config');

const app: Express = express()
const port = config.get('Dev.programConfig.port');

app.get('/', (req, res) => {
    res.send('Hello Messenger')
})

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
})


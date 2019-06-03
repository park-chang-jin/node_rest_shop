const http = require('http');
const express = require('express');
const app = express();

app.use((req, res) => {
    res.status(200).json({
        message: 'It works!'
    });
});

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('serverstarted'));
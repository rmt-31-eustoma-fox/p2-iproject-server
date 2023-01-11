if(process.env.NODE_ENV != 'production'){
  require("dotenv").config();
}
const cors = require("cors")
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', "POST"]
    }
});
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected.`)

    socket.on('join', (data) => {
    // console.log("ke trigger")
    socket.join(data.room)
    io.in(data.room).emit('chat message', data)
  })

    socket.on('message', data => {
        socket.broadcast.emit('message: received', data)
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left.`)
    })
})

app.use(routes);

app.use(errorHandler);

server.listen(3000, () => {
    console.log('Chat server is running on 3000')
})
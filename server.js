import App from "./app.js"
import http from "http"
import { Server } from "socket.io"
import moment from "moment"

import cookie from "cookie"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import {insertMessages} from "./models/chat.js"

const app = new App().app
const PORT = 7000 
const server = http.createServer(app)
const io = new Server(server)
const time = moment().format('h:mm a') 


// get user data from token 
io.use(async (socket,next)=>{
    try{
        let cookies = socket.handshake.headers.cookie;
        let parsed_cookies = cookie.parse(cookies);
        let token = parsed_cookies['jwtToken'];

        let tokenData = jwt.verify(token, process.env.SECRET_CODE)
        socket.ownerId = tokenData['_id']

    }catch(e){
        console.error(e)
    }
    next()
})

//socket connection
io.on('connection', (socket) => {
    console.log('a user connected');
    const ownerId = socket.ownerId

    socket.on('join_room',(channelId)=>{
        socket.join(channelId)
        socket.on('send_message',(data,message)=>{
            data['content'] = message
            insertMessages(data)

            // recived message data render to chat-room page
            io.to(channelId).emit('send_message',ownerId,message,time)
        })
    })
    
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
  });

server.listen(PORT,()=>{
    console.log(`Express server connect! http://localhost:${PORT}`)
})
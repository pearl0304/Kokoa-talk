import App from "./app.js"
import http from "http"
import { Server } from "socket.io"
import moment from "moment"


const app = new App().app
const PORT = 7000 
const server = http.createServer(app)
const io = new Server(server)


// socket connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })

    // message recive from client
    socket.on('send_message',(message)=>{
        console.log('send_message : ' + message )
        // recived message data render to chat-room page
        io.emit('send_message',message)
    })
  });


server.listen(PORT,()=>{
    console.log(`Express server connect! http://localhost:${PORT}`)
})
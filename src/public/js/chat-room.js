var socket = io();
var channelId = document.getElementById('friendInfo').getAttribute('channelId')
var userId = document.getElementById('friendInfo').getAttribute('userId')
var friendProfileImg = document.getElementById('friendInfo').getAttribute('friendProfileImg')
var friendNick = document.getElementById('friendInfo').getAttribute('friendNick')
console.log(friendProfileImg)
var form = document.getElementById('message-form')
var input =  document.getElementById('message-input')
var messages = document.getElementById('messages')

// join the personal room
socket.emit('join_room',channelId)

// Send message data from client to server
form.addEventListener("submit",function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('send_message',input.value,channelId)
        input.value=''
    }
})

// Recive data for render (data : message data sent by the user)
socket.on('send_message',function(ownerId,message,time){
 
    const chatTimestamp = document.createElement('div')
    const messageRow = document.createElement('li')
    const messageContent = document.createElement('div')
    const messageInfo = document.createElement('div')
    const messageBubble = document.createElement('span')
    const messageTime = document.createElement('span')

    chatTimestamp.classList.add('chatTimestamp')
    messageRow.classList.add('message-row')
    messageContent.classList.add('message-row__content')
    messageInfo.classList.add('message__info')
    messageBubble.classList.add('message__bubble')
    messageTime.classList.add('message__time')

    if(ownerId == userId){
        messageRow.classList.add('message-row-owner')
    }

    messageBubble.innerText = message
    messageTime.innerText = time

    if(ownerId !==userId){
        const img = document.createElement('img')
        img.src=friendProfileImg
        img.alt="friend profile img"
        
        const friednNick = document.createElement('span')
        friednNick.classList.add('message__friend')
        friednNick.innerText=friendNick

        messageContent.prepend(friednNick)
        messageRow.prepend(img)
    }
    messageInfo.appendChild(messageBubble)
    messageInfo.appendChild(messageTime)
    messageContent.appendChild(messageInfo)
    messageRow.appendChild(messageContent)
    messages.appendChild(messageRow)
    window.scrollTo(0, document.body.scrollHeight);
})


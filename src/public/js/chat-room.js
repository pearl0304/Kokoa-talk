var socket = io();
var form = document.getElementById('message-form')
var input =  document.getElementById('message-input')
var messages = document.getElementById('messages')

// Send message data from client to server
form.addEventListener("submit",function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('send_message',input.value)
        input.value=''
    }
})

// Recive data for render (data : message data sent by the user)
socket.on('send_message',function(message){
    const messageRow = document.createElement('li')
    const messageContent = document.createElement('div')
    const messageInfo = document.createElement('div')
    const messageBubble = document.createElement('span')
    const messageTime = document.createElement('span')

    messageRow.classList.add('message-row')
    messageRow.classList.add('message-row-owner')
    messageContent.classList.add('message-row__content')
    messageInfo.classList.add('message__info')
    messageBubble.classList.add('message__bubble')
    messageTime.classList.add('message__time')

    messageBubble.innerText = message
    messageInfo.appendChild(messageBubble)
    messageInfo.appendChild(messageTime)
    messageContent.appendChild(messageInfo)
    messageRow.appendChild(messageContent)
    messages.appendChild(messageRow)
    window.scrollTo(0, document.body.scrollHeight);
})


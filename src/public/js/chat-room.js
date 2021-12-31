var socket = io();
var channelId = document.getElementById('friendInfo').getAttribute('channelId')
var channelType = document.getElementById('friendInfo').getAttribute('channelType')
var userId = document.getElementById('friendInfo').getAttribute('userId')
var friendId = document.getElementById('friendInfo').getAttribute('friendId')
// var friendProfileImg = document.getElementById('friendInfo').getAttribute('friendProfileImg')
// var friendNick = document.getElementById('friendInfo').getAttribute('friendNick')
// var form = document.getElementById('message-form')
// var input =  document.getElementById('message-input')
// var messages = document.getElementById('messages')

// NOTE : Get user information when joingin a channel
function ajaxPostUsersData(){
    $.ajax({
        url : '/chat/room/users',
        type : 'POST',
        dataType : 'JSON',
        data : {
            "channelId" : channelId,
            "userId" : userId,
            "friendId" : friendId
        },
        success : function(data){
            const messageData = data['messages']
            const friendNick = data['friendNick']
            const friendProfileImg = data['friendProfileImg']
            console.log(friendProfileImg)
 
            messageData.forEach(element => {
                const ownerId = element['userId']
                const message = element['content']
                const reg_dtTime = new Date(element['reg_dt']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                const time = reg_dtTime.toLowerCase() 

                MakeMessageDiv(ownerId,message,time,friendNick,friendProfileImg)
            });
        },
    })
}






// join the personal room
socket.emit('join_room',channelId)

// // Send message data from client to server
// form.addEventListener("submit",function(e){
//     e.preventDefault();
//     if(input.value){
//         socket.emit('send_message',data,input.value)
//         input.value=''
//     }
// })

// // Recive data for render (data : message data sent by the user)
// socket.on('send_message',function(ownerId,message,time){
//     MakeMessageDiv(ownerId,message,time)
// })








function MakeMessageDiv(ownerId,message,time,friendNick,friendProfileImg){
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

}





ajaxPostUsersData()
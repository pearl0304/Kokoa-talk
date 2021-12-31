var socket = io();
var channelId = document.getElementById('friendInfo').getAttribute('channelId')
var channelType = document.getElementById('friendInfo').getAttribute('channelType')
var userId = document.getElementById('friendInfo').getAttribute('userId')
var friendId = document.getElementById('friendInfo').getAttribute('friendId')
var chatTitle = document.getElementById('chat_title')

var form = document.getElementById('message-form')
var input =  document.getElementById('message-input')
var messages = document.getElementById('messages')

// NOTE : Get user information when joingin a channel
function ajaxPostUsersData(){
    $.ajax({
        url : '/chat/room/users',
        type : 'POST',
        dataType : 'JSON',
        data : {
            "channelId" : channelId,
            "friendId" : friendId
        },
        success : function(data){
            const messageData = data['messages']
            const friendNick = data['friendNick']
            const friendProfileImg = data['friendProfileImg']
            let messageDate =  new Date(messageData[0]['reg_dt']).toDateString()
            makeChatTitle(friendNick)
            makeTimeDiv(messageDate)
        
            messageData.forEach(element => {
                const ownerId = element['userId']
                const message = element['content']
                const reg_dtTime = new Date(element['reg_dt']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                const time = reg_dtTime.toLowerCase() 
                            
                makeMessageDiv(ownerId,message,time,friendNick,friendProfileImg)
            });

            let dateArr = []
            for(let i=0; i<messageData.length; i++){
                let messageDate =  new Date(messageData[i]['reg_dt']).toDateString()
                dateArr.unshift(messageDate)

                console.log('messageDate : ', messageDate)
                const nextDate = dateArr[1]
                console.log('nextDate :' , nextDate)
            }
        },
    })
}



// join the personal room
socket.emit('join_room',channelId)


const data = {
    channelId : channelId,
    channelType : channelType,
    userId : userId
}


// Send message data from client to server
form.addEventListener("submit",function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('send_message',data,input.value)
        input.value=''
    }
})

// Recive data for render (data : message data sent by the user)
socket.on('send_message',function(ownerId,message,time){
    
    $.ajax({
        url : '/chat/room/friend',
        type : 'POST',
        dataType : 'JSON',
        data : {
            "friendId" : friendId
        },
        success : function(data){
            const friendNick = data['friendNick']
            const friendProfileImg = data['friendProfileImg']
            
            makeMessageDiv(ownerId,message,time,friendNick,friendProfileImg)
        }
    })    
})





function makeChatTitle(friendNick){
    const altHeaderTitle = document.createElement('h1')
    altHeaderTitle.classList.add('alt-header__title')
    altHeaderTitle.innerText = friendNick
    chatTitle.append(altHeaderTitle)
}


function makeTimeDiv(date){
    const chatTimestamp = document.createElement('div')
    chatTimestamp.classList.add('chat__timestamp')
    chatTimestamp.innerText=date
    messages.prepend(chatTimestamp)
}

function makeMessageDiv(ownerId,message,time,friendNick,friendProfileImg){
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
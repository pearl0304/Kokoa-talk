var socket = io();
var channelId = document.getElementById('friendInfo').getAttribute('channelId')
var channelType = document.getElementById('friendInfo').getAttribute('channelType')
var userId = document.getElementById('friendInfo').getAttribute('userId')
var friendId = document.getElementById('friendInfo').getAttribute('friendId')
var chatTitle = document.getElementById('chat_title')

var form = document.getElementById('message-form')
var input =  document.getElementById('message-input')
var messages = document.getElementById('messages')


function getCurrentPage(){
    document.addEventListener('scroll',function(){
        var scrollLocation =  Math.ceil(document.documentElement.scrollTop) 
        var innerHeight = Math.ceil(window.innerWidth) 
        var fullHeight  = Math.floor((document.body.scrollHeight)*(0.7)) 
        var page = 1
        
        if(scrollLocation + innerHeight >= fullHeight ){
            console.log('스크롤이 바닥이다')
            let height = scrollLocation + innerHeight
            page = Math.floor(height / fullHeight)+1                
        }
    })
}

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
            makeChatTitle(friendNick)
        
            const  messageDateArr= []
            messageData.forEach(element => {
                const ownerId = element['userId']
                const message = element['content']
                const messageDate =  new Date(element['reg_dt']).toDateString()
                const reg_dtTime = new Date(element['reg_dt']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                const time = reg_dtTime.toLowerCase() 
                let printedDate = ''


                // Note : "Sort message by date"
                messageDateArr.unshift(messageDate)
                const nextDate = messageDateArr[1]
                if(nextDate == undefined){
                    printedDate = messageDate
                }else if(messageDate == nextDate){
                    printedDate = nextDate
                }else if (messageDate !== nextDate){
                    printedDate = messageDate
                }
                
                if(messageDate !== nextDate){
                    makeDateDiv(printedDate)
                }
          
                makeMessageDiv(ownerId,message,time,friendNick,friendProfileImg)
            });
    
        },
    })
}





function getMessages(page){

    // $.ajax({
    //     url : `/chat/room/page`,
    //     type : 'POST',
    //     dataType : 'JSON',
    //     data : {                
    //         "channelId" : channelId,
    //     },
    //     success : function(data){
    //         console.log(data)
    //     }
    // })
       
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


function makeDateDiv(date){
    const chatTimestamp = document.createElement('div')
    chatTimestamp.classList.add('chat__timestamp')
    chatTimestamp.innerText=date
    messages.append(chatTimestamp)
}

function makeMessageDiv(ownerId,message,time,friendNick,friendProfileImg){
    const messageRow = document.createElement('li')
    const messageContent = document.createElement('div')
    const messageInfo = document.createElement('div')
    const messageBubble = document.createElement('span')
    const messageTime = document.createElement('span')

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


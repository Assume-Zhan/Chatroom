import 'semantic-ui-css/semantic.min.css';
import React, { useEffect } from 'react';
import '../../css/message.css'
import { Chat } from "@progress/kendo-react-conversational-ui";
import "@progress/kendo-theme-default/dist/all.css";

const initialMessages = (messages, name) => {
    var m = []
    messages != null ? messages.map((message) => {
        console.log(message)
        const user = {
            name: message.username,
            id: message.email,
            avatarUrl: message.imgURL
        }
        m.push({
            author: user,
            timestamp: new Date(message.timeStamp),
            text: message.data
        })
    }) : [];

    return m
}

function Messages_template(props){

    const addNewMessage = (event) => {
        props.sendMessage(event.message.text, props.username)
    };

    return (
        <Chat
            dark
            maxWidth={"none"}
            user={props.user}
            messages={initialMessages(props.messages, props.username)}
            onMessageSend={addNewMessage}
            placeholder={"Type a message..."}
            className='chatClass'
        />
    );
}

export default Messages_template;
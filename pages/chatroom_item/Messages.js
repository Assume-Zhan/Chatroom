import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Message } from 'semantic-ui-react'

function Message_(props){
    return (
        <div style={{textAlign: "right"}}>
            <Message>{props.message}</Message>
        </div>
    )
}

function Messages(props){
    
    // var messages = [["Hello", 1], ["World", 2], ["!", 3]];
    var messages = props.messages == null ? [] : props.messages;

    return <>
    {
        messages == [] ? <></> : messages.map((message) => {
            return <Message_ key={message[1]} message={message[0]}/>
        })
    }
    </>
    
}

export default Messages;
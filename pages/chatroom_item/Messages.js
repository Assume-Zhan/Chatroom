import 'semantic-ui-css/semantic.min.css';
import React, { useEffect } from 'react';
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
    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        console.log("In Messages useEffect", props.messages)
        setMessages(props.messages)
    }, [props.messages])

    var idx = 0;
    console.log("In messages", messages)

    return (<div>
    {
        // messages == [] ? <></> : messages.map((message) => {
        messages && messages.map((message) => {
            console.log("message", message)
            return <Message_ key={idx++} message={message.data}/>
        })

    }
    </div>);
    
}

export default Messages;
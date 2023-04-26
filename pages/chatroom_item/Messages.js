import 'semantic-ui-css/semantic.min.css';
import React, { useEffect } from 'react';
import { Message } from 'semantic-ui-react'
import '../../css/message.css'
import { Chat } from "@progress/kendo-react-conversational-ui";

function Message_(props){
    return (
        props.me === true ? <div style={{textAlign: "right"}}>
            <Message>{props.message}</Message>
        </div> : <div style={{textAlign: "left"}}>
            <Message>{props.message}</Message>
        </div>
    )
}

function Messages(props){
    
    // var messages = [["Hello", 1], ["World", 2], ["!", 3]];
    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        setMessages(props.messages)
    }, [props.messages])

    var idx = 0;

    return (<div>
    {
        // messages == [] ? <></> : messages.map((message) => {
        messages && messages.map((message) => {
            // return <Message_
            //     key={idx++}
            //     message={message.data}
            //     email={message.email}
            //     me={props.currentUser === message.email}
            // />
            return <div>
                <Chat
                    user={message.email}
                    messages={message.data}
                    width={400}
                />
            </div>
        })

    }
    </div>);
    
}

export default Messages;
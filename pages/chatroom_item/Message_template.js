import 'semantic-ui-css/semantic.min.css';
import React, { useEffect } from 'react';
import '../../css/message.css'
import { Chat } from "@progress/kendo-react-conversational-ui";
import "@progress/kendo-theme-default/dist/all.css";
const user = {
  id: 1,
  avatarAltText: "KendoReact Conversational UI RICSU",
};
const bot = {
  id: 0,
};
const initialMessages = [
  {
    author: bot,
    suggestedActions: [
      {
        type: "reply",
        value: "Neat!",
      },
    ],
    timestamp: new Date(),
    text: "Hello, this is a demo bot. I don't do much, but I can count symbols!",
  },
];

function Messages_template(props){
    
    // // var messages = [["Hello", 1], ["World", 2], ["!", 3]];
    // const [messages, setMessages] = React.useState([]);

    // useEffect(() => {
    //     setMessages(props.messages)
    // }, [props.messages])

    // var idx = 0;

    // return (<div>
    // {
    //     // messages == [] ? <></> : messages.map((message) => {
    //     // messages && messages.map((message) => {
    //     //     // return <Message_
    //     //     //     key={idx++}
    //     //     //     message={message.data}
    //     //     //     email={message.email}
    //     //     //     me={props.currentUser === message.email}
    //     //     // />
    //     //     return <div>
    //     //         <Chat
    //     //             user={message.email}
    //     //             messages={message.data}
    //     //             width={400}
    //     //         />
    //     //     </div>
    //     // })
    //     <Chat>

    //     </Chat>

    // }
    // </div>);
    const [messages, setMessages] = React.useState(initialMessages);
    const addNewMessage = (event) => {
        let botResponse = Object.assign({}, event.message);
        botResponse.text = countReplayLength(event.message.text);
        botResponse.author = bot;
        setMessages([...messages, event.message]);
        setTimeout(() => {
        setMessages((oldMessages) => [...oldMessages, botResponse]);
        }, 1000);
    };
    const countReplayLength = (question) => {
        let length = question.length;
        let answer = question + " contains exactly " + length + " symbols.";
        return answer;
    };
    return (
        <Chat
            dark
            maxWidth={"none"}
            user={user}
            messages={messages}
            onMessageSend={addNewMessage}
            placeholder={"Type a message..."}
            className='chatClass'
        />
    );
}

export default Messages_template;
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Input, Container } from 'semantic-ui-react'

function UserInput(props){

    var [messageBuffer, setMessageBuffer] = React.useState('')

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            props.sendMessage(e.target.value);
            setMessageBuffer('');
        }
    }

    return <Container>
        <Input 
            type="text" 
            icon="users" 
            placeholder="Message..."
            onChange={(e) => {setMessageBuffer(e.target.value)}}
            value={messageBuffer}
            onKeyPress={(e) => {handleKeyPress(e)}}
            style={{width: '100%'}}
        />
    </Container>
}

export default UserInput;
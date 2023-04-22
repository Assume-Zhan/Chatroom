import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Input, Container } from 'semantic-ui-react'

function UserInput(props){

    return <Container>
        <Input 
            type="text" 
            icon="users" 
            placeholder="Message..." 
            onChange={() => {props.handleMessageChange()}}
            style={{width: '100%'}}
        />
    </Container>
}

export default UserInput;
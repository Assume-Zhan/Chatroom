import { Menu, MenuItem, Container } from 'semantic-ui-react';
import { Link } from'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from "react-router-dom";
import React from 'react';
import firebase from '../utils/config';
import UserInput from './chatroom_item/UserInput';
import Messager from './chatroom_item/Messager';
import 'firebase/compat/database'

function Chatroom() {

    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUser(user);
        })
    }, [])

    function signout(){
        firebase.auth().signOut();
        navigate('/');
    }

    function sendMessage(message){
        var com_list = firebase.database().ref('com_list');

        var post_data = {
            data: message,
            email: user.email
        };

        com_list.push({data: post_data.data, email: post_data.email}).key;

        com_list.on(
            'value',
            function(snapshot) {
                console.log(snapshot.val());
            }
        )
    }

    return <>
        <Menu>
            <Menu.Item as={Link} to="/">Chatroom</Menu.Item>
            <Menu.Menu position='right'>
                {
                    user === null ? (
                        <>
                            <Menu.Item as={Link} to="/signin">Sign in</Menu.Item>
                            <Menu.Item as={Link} to="/login">Login</Menu.Item>
                        </> )
                        : (
                        <>
                            <Menu.Item onClick={() => {signout()}}>Logout</Menu.Item>
                        </> )
                    
                }
            </Menu.Menu>
        </Menu>
        <div style={{display: "flex"}}>
            <div style={{display: "block", width: "20%", height: "100%", textAlign: "center", backgroundColor: "blue"}}>
                {/* Messager */}
                <Messager textAlign='center'/>
            </div>
            {/* Messages */}
            {/* Input Message */}
            <UserInput textAlign='right'
                sendMessage={sendMessage}
            />
        </div>
    </>;
}

export default Chatroom;
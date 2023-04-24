import { Menu, Divider } from 'semantic-ui-react';
import { Link } from'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'firebase/compat/database'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import firebase from '../utils/config';
import UserInput from './chatroom_item/UserInput';
import Messager from './chatroom_item/Messager';
import Messages from './chatroom_item/Messages';

function Chatroom() {

    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
    const [messages, setMessages] = React.useState([]);

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

    }

    useEffect(() => {
        let m = []
        var com_list = firebase.database().ref('/com_list');
        const callback = snapshot => {
            // var m = messages;
            // m.push(snapshot.val());
            // if(m != messages){
            //     setMessages(m);
            // }
            snapshot.forEach(child => {
                m.push(child.val())
                console.log(child.val())
                console.log(m.length)
            })
        }
        com_list.once(
            // 'child_added',
            'value',
            // function(snapshot) {
            //     var m = messages;
            //     m.push(snapshot.val());
            //     if(m != messages){
            //         setMessages(m);
            //     }
            //     console.log("Messages", messages); }
            callback
        ).then(() => {
            setMessages(m)
        })

    }, [])


    return (<>
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
            <div style={{display: "block", height: "100%", textAlign: "center", backgroundColor: "yellow"}}>
                {/* Messages */}
                <Messages
                    messages={messages}
                />
                {/* Input Message */}
                <UserInput textAlign='right'
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    </>);
}

export default Chatroom;
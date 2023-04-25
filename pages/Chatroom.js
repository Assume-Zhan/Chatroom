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

    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [messages, setMessages] = React.useState({});
    const [group, setGroup] = React.useState([]);

    const [inited, setInited] = React.useState(0);
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

    const [currentGroup, setCurrentGroup] = React.useState("");

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
        var com_list = firebase.database().ref('com_list/' + currentGroup);

        var post_data = {
            data: message,
            email: user.email
        };

        com_list.push(post_data).key;
    }

    const callback = snapshot => {
        group.push(snapshot.val());
        forceUpdate();
        return setGroup(group);
    }

    function init (){
        if(!inited){
            console.log("init");
            var com_list = firebase.database().ref('com_list');

            com_list.on('child_added', callback)

            setInited(1)
        }
    }

    init();

    React.useEffect(() => {
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
            setGroup(m)
        })
    }, [])

    function addGroup(){
        let group = prompt("Please enter your name", "New room");
        if(group != null){
            firebase.database().ref('com_list/' + group).set({name: group});
        }
    }

    function handleGroupClick(name){
        setCurrentGroup(name);
        var com_list = firebase.database().ref('com_list/' + name);

        let m = messages;
        if(m[name] == null){
            m[name] = []
            setMessages(m)
            forceUpdate();
            com_list.on('child_added', (snapshot) => {
                if(snapshot.val().data != null){
                    messages[name].push(snapshot.val());
                    setMessages(messages);
                    forceUpdate();
                    console.log("Message", snapshot.val());
                    console.log(messages);
                }
            })
        }
        else{
        }

        // setPreviousListener(PreviousListener)
    }

    return (<>
        <Menu>
            <Menu.Item as={Link} to="/chatroom">Chatroom</Menu.Item>
            <Menu.Menu position='right'>
                {
                    user === null ? (
                            <Menu.Item as={Link} to="/">Sign in / Login</Menu.Item>
                        ) : (
                            <Menu.Item onClick={() => {signout()}}>Logout</Menu.Item>
                        )
                    
                }
            </Menu.Menu>
        </Menu>
        <div style={{display: "flex"}}>
            <div style={{display: "block", width: "20%", height: "100%", textAlign: "center", backgroundColor: "blue"}}>
                {/* Messager */}
                <Messager textAlign='center'
                    group={group}
                    addGroup={addGroup}
                    handleGroupClick={handleGroupClick}
                />
            </div>
            <div style={{display: "block"}}>
                <div style={{display: "block", borderLeft: "50px solid #fff", overflow: "scroll", maxHeight: "700px", height: "32", textAlign: "center", backgroundColor: "yellow"}}>
                    {/* Messages */}
                    <Messages
                        messages={messages[currentGroup]}
                    />
                </div>
                <div style={{display: "block", borderLeft: "50px solid #fff", textAlign: "center", backgroundColor: "blue"}}>
                    {/* Input Message */}
                    <UserInput textAlign='right'
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </div>
    </>);
}

export default Chatroom;
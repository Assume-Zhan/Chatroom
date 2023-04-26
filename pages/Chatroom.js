import { Menu, Grid } from 'semantic-ui-react';
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
        let auth_flag = false;

        snapshot.val().users.forEach(child => {
            if(child == firebase.auth().currentUser.email){
                auth_flag = true;
            }
        })
        
        if(auth_flag){
            group.push(snapshot.val());
            forceUpdate();
            return setGroup(group);
        }
    }

    function init (){
        if(!inited){
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
            snapshot.forEach(child => {

                let auth_flag = false;
                
                child.val().users.map((user_) => {
                    if(user_ == firebase.auth().currentUser.email){
                        auth_flag = true;
                    }
                })
                
                if(auth_flag){
                    m.push(child.val())
                    forceUpdate();
                    return setGroup(group);
                }
            })
        }

        com_list.once(
            'value',
            callback
        ).then(() => {
            setGroup(m)
        })
    }, [])

    function addGroup(){
        let group = prompt("Please enter your name", "New room");
        if(group != null){
            firebase.database().ref('com_list/' + group).set({name: group, users: [user.email]});
        }
    }

    function addPerson(){
        let email = prompt("Please enter new member's email", "example@gmail.com");
        if(email != null){

            var com_list = firebase.database().ref('com_list/' + currentGroup);
            var current_user_list = [];

            if(currentGroup != null){
                com_list.once('value', (snapshot) => {
                    console.log(snapshot.val().users);
                    current_user_list = snapshot.val().users;
                    current_user_list.push(email);
                }).then(() => {
                    var com_list = firebase.database().ref('com_list/' + currentGroup + "/users");
                    com_list.set(current_user_list);
                });
            }


        }
    }

    function handleGroupClick(name){
        setCurrentGroup(name);
        var com_list = firebase.database().ref('com_list/' + name);

        let m = messages;
        if(m[name] == null){
            m[name] = [];
            setMessages(m);
            forceUpdate();
            com_list.on('child_added', (snapshot) => {
                if(snapshot.val().data != null){
                    messages[name].push(snapshot.val());
                    setMessages(messages);
                    forceUpdate();
                }
            })
        }
        else{
        }
    }

    return (<Grid style={{height: "100vh", maxHeight: "100vh", overflow: "hidden"}}>
        <Grid.Row style={{height: '10%', maxHeight: "10vh", overflow: "hidden"}}>
            <Menu inverted style={{width: '100%'}}>
                <Menu.Item as={Link} to="/chatroom">Chatroom</Menu.Item>
                <Menu.Item as={Link} to="/chatroom">{user != null ? user.email : "non-user"}</Menu.Item>
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
        </Grid.Row>
        <Grid.Column width={3} style={{display: "block", maxHeight: "90vh", width: "20%", textAlign: "center", overflow: "scroll"}}>
            {/* Messager */}
            <Grid.Row style={{height: "5%"}}></Grid.Row>
            <Messager textAlign='center'
                group={group}
                addGroup={addGroup}
                addPerson={addPerson}
                handleGroupClick={handleGroupClick}
            />
        </Grid.Column>
        <Grid.Column width={13} style={{display: "block", maxHeight: "90vh", flexDirection: "columnReverse", overflow: "scroll"}}>
            <Grid.Row style={{height: "80vh", overflow: "scroll"}}>
            {/* <div style={{display: "block", borderLeft: "50px solid #fff", overflow: "scroll", maxHeight: "700px", height: "32", textAlign: "center", backgroundColor: "yellow"}}> */}
                {/* Messages */}
                <Messages
                    currentUser={user === null ? null : user.email}
                    messages={messages[currentGroup]}
                />
            {/* </div> */}
            </Grid.Row>
            <Grid.Row style={{maxHeight: "10vh"}}>
                {/* Input Message */}
                <UserInput
                    sendMessage={sendMessage}
                />
            </Grid.Row>
        </Grid.Column>
    </Grid>);
}

export default Chatroom;
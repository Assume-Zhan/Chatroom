import { Menu, Grid } from 'semantic-ui-react';
import { Link } from'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'firebase/compat/database'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import firebase from '../utils/config';
import Messager from './chatroom_item/Messager';
import Messages_template from './chatroom_item/Message_template';

function Chatroom() {

    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [messages, setMessages] = React.useState({});
    const [group, setGroup] = React.useState([]);

    const [inited, setInited] = React.useState(0);
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

    const [currentGroup, setCurrentGroup] = React.useState("");

    React.useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if(user === null){
                navigate("/")
            }
            else{
                setUser(user);

                /*
                 * Get user profile name
                 */
                var users = firebase.database().ref('com_list/users');
                users.once('value', (snapshot) => {
                    snapshot.forEach((_) => {
                        if(_.val().email == user.email){
                            setUsername(_.val().name);
                        }
                    });
                });
            }
        })
    }, [])

    function signout(){
        firebase.auth().signOut();
        navigate('/');
    }

    function sendMessage(message){
        var com_list = firebase.database().ref('com_list/' + currentGroup);
        const date = new Date();

        var post_data = {
            data: message,
            email: user != null ? user.email : "non-user",
            timeStamp: date.getTime()
        };

        com_list.push(post_data).key;
    }

    const callback = snapshot => {
        let auth_flag = false;

        snapshot.val().users.forEach(child => {
            if(firebase.auth().currentUser != null && child == firebase.auth().currentUser.email){
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
            var com_list = firebase.database().ref('com_list/rooms');

            com_list.on('child_added', callback)

            setInited(1)
        }
    }

    init();

    React.useEffect(() => {
        let m = []
        var com_list = firebase.database().ref('/com_list/rooms');

        const callback = snapshot => {
            snapshot.forEach(child => {

                let auth_flag = false;
                
                child.val().users.map((user_) => {
                    if(firebase.auth().currentUser != null && user_ == firebase.auth().currentUser.email){
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
                <Menu.Item as={Link} to="/chatroom">{username}</Menu.Item>
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
        <Grid.Column width={3} style={{display: "block", maxHeight: "85vh", width: "20%", textAlign: "center", overflow: "scroll"}}>
            {/* Messager */}
            <Grid.Row style={{height: "5%"}}></Grid.Row>
            <Messager textAlign='center'
                group={group}
                addGroup={addGroup}
                addPerson={addPerson}
                handleGroupClick={handleGroupClick}
            />
        </Grid.Column>
        <Grid.Column width={13} style={{
            height: "90vh", 
            display: "block", 
            maxHeight: "90vh",
            paddingBottom: "0rem", 
            paddingTop: "0rem", 
            paddingLeft: "0rem", 
            paddingRight: "1rem", 
        }}>
            <Messages_template
                user={{id:  user != null ? user.email : ""}}
                style={{height: "100%", width: "100%"}}
                messages={messages[currentGroup]}
                sendMessage={sendMessage}
            />
        </Grid.Column>
    </Grid>);
}

export default Chatroom;
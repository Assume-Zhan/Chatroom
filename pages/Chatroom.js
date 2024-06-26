import { Menu, Grid } from 'semantic-ui-react';
import { Link } from'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'firebase/compat/database'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import firebase from '../utils/config';
import Messager from './chatroom_item/Messager';
import Messages_template from './chatroom_item/Message_template';


function notifyMe(message) {

    if (Notification.permission === "granted") {
        var notification = new Notification(message);
    }

    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }
}

function Chatroom() {

    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [imgURL, setImgURL] = React.useState("");
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
                var users = firebase.database().ref('com_list/users/' + user.uid);
                users.once('value', (snapshot) => {
                    if(snapshot.val() != null) {
                        setUsername(snapshot.val().name);
                        setImgURL(snapshot.val().imgURL);
                    }
                });
            }
        })
    }, [])

    function signout(){
        firebase.auth().signOut();
        navigate('/');
    }

    function sendMessage(message, username){
        var com_list = firebase.database().ref('com_list/rooms/' + currentGroup);
        const date = new Date();

        if(currentGroup != ""){
            var post_data = {
                username: username,
                data: message,
                email: user != null ? user.email : "non-user",
                timeStamp: date.getTime(),
                imgURL: imgURL
            };

            com_list.push(post_data).key;
        }
        else{
            alert("Please select a group");
        }
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
        var canAdd = true;
        if(group != null){
            firebase.database().ref('com_list/rooms').once('value', (snapshot) => {
                console.log()
                if(snapshot.val() != null){
                    Object.entries(snapshot.val()).map((child) => {
                        if(child[1].name == group){
                            canAdd = false;
                        }
                    })
                }
            }).then(() => {
                if(canAdd) firebase.database().ref('com_list/rooms/' + group).set({name: group, users: [user.email]});
                else alert("Group name already exists ( may be other user )");
            })
            
        }
    }

    function addPerson(){
        let email = prompt("Please enter new member's email", "example@gmail.com");
        if(email != null){

            var com_list = firebase.database().ref('com_list/rooms/' + currentGroup);
            var current_user_list = [];

            if(currentGroup != null){
                com_list.once('value', (snapshot) => {
                    current_user_list = snapshot.val().users;
                    current_user_list.push(email);
                }).then(() => {
                    var com_list = firebase.database().ref('com_list/rooms/' + currentGroup + "/users");
                    com_list.set(current_user_list);
                });
            }
        }
    }

    function handleGroupClick(name){
        setCurrentGroup(name);
        var com_list = firebase.database().ref('com_list/rooms/' + name);

        var firstLoad = true;

        let m = messages;
        if(m[name] == null){
            m[name] = [];
            setMessages(m);
            forceUpdate();
            com_list.on('child_added', (snapshot) => {
                if(snapshot.val().data != null){
                    if(firstLoad == false && snapshot.val().email != user.email) {
                        console.log(snapshot.val().email, user.email)
                        notifyMe("New message!")
                    }
                    messages[name].push(snapshot.val());
                    setMessages(messages);
                    forceUpdate();
                }
            })

            firstLoad = false;
        }
        else{
        }
    }

    return (<Grid style={{height: "100vh", maxHeight: "100vh", overflow: "hidden"}}>
        <Grid.Row style={{height: '10%', maxHeight: "10vh", overflow: "hidden"}}>
            <Menu inverted style={{width: '100%'}}>
                <Menu.Item as={Link} to="/chatroom">Chatroom</Menu.Item>
                <Menu.Item as={Link} to="/checkprofile">Profile</Menu.Item>
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
        <Grid.Column width={3} style={{display: "block", maxHeight: "85vh", width: "20%", textAlign: "center", overflow: "scroll", paddingRight: "0"}}>
            {/* Messager */}
            <Grid.Row style={{height: "5%", }}></Grid.Row>
            <Messager textAlign='center'
                username={username}
                group={group}
                addGroup={addGroup}
                addPerson={addPerson}
                handleGroupClick={handleGroupClick}
                imgURL={imgURL}
                currentGroup={currentGroup}
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
                username={username}
                style={{height: "100%", width: "100%"}}
                messages={messages[currentGroup]}
                sendMessage={sendMessage}
            />
        </Grid.Column>
    </Grid>);
}

export default Chatroom;
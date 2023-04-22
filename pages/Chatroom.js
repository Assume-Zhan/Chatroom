import { Menu, MenuItem, Search } from 'semantic-ui-react';
import { Link } from'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from "react-router-dom";
import React from 'react';
import firebase from '../utils/config';

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

    return <Menu>
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
    </Menu>;
}

export default Chatroom;
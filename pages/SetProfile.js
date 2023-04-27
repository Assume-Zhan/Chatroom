import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";
import 'firebase/compat/database'

function SetProfile() {

    function SubmitForm(e){
        e.preventDefault();
        firebase.auth().onAuthStateChanged(
            (user) => {

                /*
                 * Set user profile
                 */
                if(user === null) return;
                var users = firebase.database().ref('com_list/users/' + user.uid);
                users.once('value', (snapshot) => {
                    var tempData = snapshot.val();
                    tempData.name = username;
                    if(tempData != null){
                        users.set(tempData);
                    }
                }).then(() => {
                    alert("Set profile successfully");
                    navigate('/chatroom');
                });
            }
        )
    }

    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");

    return <>
    <form autoComplete='off' className='form' onSubmit={(e) => SubmitForm(e)}>
        <div className='control'>
            <h1 style={{textAlign: "center"}}>
            Set your profile
            </h1>
        </div>
        <div className='control block-cube block-input'>
            <input name='username' placeholder='Username' type='text' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            <div className='bg-top'>
            <div className='bg-inner'></div>
            </div>
            <div className='bg-right'>
            <div className='bg-inner'></div>
            </div>
            <div className='bg'>
            <div className='bg-inner'></div>
            </div>
        </div>
        <button className='btn block-cube block-cube-hover' type='submit' >
            <div className='bg-top'>
            <div className='bg-inner'></div>
            </div>
            <div className='bg-right'>
            <div className='bg-inner'></div>
            </div>
            <div className='bg'>
            <div className='bg-inner'></div>
            </div>
            <div className='text'>
            Submit
            </div>
        </button>
    </form>
    </>

}

export default SetProfile;

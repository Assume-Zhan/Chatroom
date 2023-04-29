import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";
import 'firebase/compat/database'
import 'firebase/compat/storage'

function Signup() {

    function SubmitForm(e){

        if(e.target.id === "no") return
        console.log(e.target)

        /* Prevent refresh the page when submit the form */
        e.preventDefault();

        /* Create a new user */
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(
            (userCredential) => {
                var user = userCredential.user;

                /*
                 * Push user profile
                 */
                var users = firebase.database().ref('com_list/users/' + user.uid);
                var userLength = firebase.database().ref('com_list/userlength');
                userLength.once('value', (snapshot) => {

                    /*
                     * Set and get default image
                     */
                    var imgURL = 'https://i.imgur.com/AkiqL9I.png';

                    if(snapshot.val() == null) {
                        userLength.set(0);
                        users.set({
                            email: user.email,
                            id: 0,
                            name: username,
                            imgURL: imgURL,
                            userid: user.uid,
                        });
                    }
                    else{
                        users.set({
                            email: user.email,
                            id: snapshot.val(),
                            name: username,
                            imgURL: imgURL,
                            userid: user.uid,
                        });
                    }
                    
                    /* Update user length  */
                    userLength.set(snapshot.val() + 1);

                }).then(() => {
                    /* Success alert */
                    alert("success", "Sign up success!");

                    /* Navigate to chatroom */
                    navigate('/chatroom');
                    location.reload();
                })
                
            }).catch((error) => {
                alert(error.message);
                setMail("");
                setPassword("");
                setUsername("");
            }
        )
    }

    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <>
    <form autoComplete='on' className='form' onSubmit={(e) => SubmitForm(e)}>
        <div className='control'>
            <h1 style={{textAlign: "center"}}>
            Sign Up
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
        <div className='control block-cube block-input'>
            <input name='email' placeholder='Email' type='text' value={mail} onChange={(e) => {setMail(e.target.value)}}/>
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
        <div className='control block-cube block-input'>
            <input name='password' placeholder='Password' type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
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
        <button className='btn block-cube block-cube-hover' type='submit' id="yes">
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
            Sign up
            </div>
        </button>
    </form>
    </>

}

export default Signup;

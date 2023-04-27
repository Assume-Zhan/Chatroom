import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";
import 'firebase/compat/database'

function Signup() {

    function SubmitForm(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(
            (userCredential) => {
                var user = userCredential.user;
                alert("success", "Sign up success!");

                /*
                 * Push user profile
                 */
                let userLength = 0;
                var users = firebase.database().ref('com_list/users');
                users.once('value', (snapshot) => {
                    snapshot.forEach((_) => {
                        userLength++;
                    });
                }).then(() => {
                    users.push({
                        email: user.email,
                        id: userLength,
                        name: username
                    });
                });

                navigate('/chatroom')
                
            }).catch((error) => {
                alert(error.message);
                setMail("");
                setPassword("");
            }
        )
    }

    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <>
    <form autoComplete='off' className='form' onSubmit={(e) => SubmitForm(e)}>
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
            Sign up
            </div>
        </button>
    </form>
    </>

}

export default Signup;

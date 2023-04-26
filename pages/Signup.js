import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";

function Signup() {

    function SubmitForm(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(
            (userCredential) => {
                var user = userCredential.user;
                navigate('/chatroom')
                alert("success", "Sign up success!");
            }).catch((error) => {
                alert(error.message);
                setMail("");
                setPassword("");
            }
        )
    }

    const navigate = useNavigate();
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
            <input name='username' placeholder='Username' type='text' value={mail} onChange={(e) => {setMail(e.target.value)}}/>
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

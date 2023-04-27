import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";

function Login() {

    function SubmitForm(e){

        /* Prevent refresh the page when submit the form */
        e.preventDefault();

        /* Login with current user */
        firebase.auth().signInWithEmailAndPassword(mail, password).then(
            (_) => {
                /* Successfully login, redirect to chatroom */
                navigate('/chatroom');
                alert("success", "Login success!");
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
            Login
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
            Login
            </div>
        </button>
    </form>
    </>
}

export default Login;

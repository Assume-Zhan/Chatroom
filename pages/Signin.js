import React from "react";
import { Menu, Form, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";

function Signin() {

    function SubmitForm(){
        firebase.auth().createUserWithEmailAndPassword(mail, password).then(
            (userCredential) => {
                var user = userCredential.user;
                navigate('/chatroom')
                alert("success", "Sign up success!");
            }).catch((error) => {
                alert(error.message);
            }
        )
    }

    const navigate = useNavigate();
    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <Container>
        <Form onSubmit={SubmitForm}>
            <Form.Input label="Mail" value={mail} onChange={(e) => {setMail(e.target.value)}} placeholder="Input your mail"></Form.Input>
            <Form.Input label="Password" value={password} type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Input your password"></Form.Input>
            <Form.Button>Sign in</Form.Button>
        </Form>
    </Container>
}

export default Signin;

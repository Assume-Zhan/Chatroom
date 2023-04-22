import React from "react";
import { Menu, Form, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";

function Login() {

    function SubmitForm(){
        if(activeItem === "gmail"){
            firebase.auth().signInWithEmailAndPassword(mail, password).then(
                (userCredential) => {
                    var user = userCredential.user;
                    navigate('/')
                    alert("success", "Login success!");
                }).catch((error) => {
                    alert(error.message);
                }
            )

        }
        else if(activeItem === "email"){

        }
    }

    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState("gmail");
    const [mail, setMail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return <Container>
        <Menu widths="2">
            <Menu.Item active={activeItem === 'gmail'} onClick={() => {setActiveItem("gmail")}}>Gmail Login</Menu.Item>
            <Menu.Item active={activeItem === 'email'} onClick={() => {setActiveItem("email")}}>Email Login</Menu.Item>
        </Menu>
        <Form onSubmit={SubmitForm}>
            <Form.Input label="Mail" value={mail} onChange={(e) => {setMail(e.target.value)}} placeholder="Input your mail"></Form.Input>
            <Form.Input label="Password" value={password} type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Input your password"></Form.Input>
            <Form.Button>
                {activeItem === 'gmail' && "Sign in with Gmail"}
                {activeItem === 'email' && "Sign in with Email"}
            </Form.Button>
        </Form>
    </Container>
}

export default Login;

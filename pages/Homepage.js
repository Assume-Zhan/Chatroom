import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Form, Container } from "semantic-ui-react";
import "firebase/compat/auth";
import Login from "./Login";
import Signin from "./Signin";

function Homepage() {

    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState("signin");

    return <Container>
        <Menu widths="2">
            <Menu.Item active={activeItem === 'signin'} onClick={() => {setActiveItem("signin")}}>Signin</Menu.Item>
            <Menu.Item active={activeItem === 'login'} onClick={() => {setActiveItem("login")}}>Login</Menu.Item>
        </Menu>
        {
            activeItem === "signin" ? <Signin></Signin> :  <Login></Login>
        }
        {/* <Form onSubmit={SubmitForm}>
            <Form.Input label="Mail" value={mail} onChange={(e) => {setMail(e.target.value)}} placeholder="Input your mail"></Form.Input>
            <Form.Input label="Password" value={password} type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Input your password"></Form.Input>
            <Form.Button>
                {activeItem === 'gmail' && "Sign in with Gmail"}
                {activeItem === 'email' && "Sign in with Email"}
            </Form.Button>
        </Form> */}
    </Container>
}

export default Homepage;

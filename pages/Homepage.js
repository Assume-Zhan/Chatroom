import React from "react";
import { Menu, Container } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";

function Homepage() {

    const [activeItem, setActiveItem] = React.useState("signup");

    return <Container textAlign='center' style={{width: "30%", height: "100%", margin: "200px"}}>
        <Menu widths="2">
            <Menu.Item active={activeItem === 'signup'} onClick={() => {setActiveItem("signup")}}>Signup</Menu.Item>
            <Menu.Item active={activeItem === 'login'} onClick={() => {setActiveItem("login")}}>Login</Menu.Item>
        </Menu>
        {
            activeItem === "signup" ? <Signup></Signup> :  <Login></Login>
        }
    </Container>
}

export default Homepage;

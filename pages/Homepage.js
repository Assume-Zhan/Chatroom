import React from "react";
import { Menu, Container } from "semantic-ui-react";
import Login from "./Login";
import Signin from "./Signin";

function Homepage() {

    const [activeItem, setActiveItem] = React.useState("signin");

    return <Container textAlign='center' style={{width: "30%", height: "100%", margin: "200px"}}>
        <Menu widths="2">
            <Menu.Item active={activeItem === 'signin'} onClick={() => {setActiveItem("signin")}}>Signin</Menu.Item>
            <Menu.Item active={activeItem === 'login'} onClick={() => {setActiveItem("login")}}>Login</Menu.Item>
        </Menu>
        {
            activeItem === "signin" ? <Signin></Signin> :  <Login></Login>
        }
    </Container>
}

export default Homepage;

import React from "react";
import { Menu, Grid, GridColumn } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";

function Homepage() {

    const [activeItem, setActiveItem] = React.useState("signup");

    return <Grid style={{height: '100vh', textAlign: "center"}}>
        <Grid.Row style={{height: '10%'}}></Grid.Row>
        <Grid.Row style={{height: '10%'}}>
            <Grid.Column width={5}/>
            <Grid.Column width={6}>
                <Menu widths="2">
                    <Menu.Item active={activeItem === 'signup'} onClick={() => {setActiveItem("signup")}}>Signup</Menu.Item>
                    <Menu.Item active={activeItem === 'login'} onClick={() => {setActiveItem("login")}}>Login</Menu.Item>
                </Menu>
            </Grid.Column>
            <Grid.Column width={5}/>
        </Grid.Row>
        {
            activeItem === "signup" ? <Grid.Row textAlign="center" style={{height: '40%'}}><Signup style={{}}></Signup></Grid.Row> :
                <Grid.Row textAlign="center" style={{height: '40%'}}><Login></Login></Grid.Row>
        }
        <Grid.Row style={{height: '30%'}}></Grid.Row>
    </Grid>
}

export default Homepage;

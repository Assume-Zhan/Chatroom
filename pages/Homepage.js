import React from "react";
import { Menu, Grid } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";

function Homepage() {

    const [activeItem, setActiveItem] = React.useState("signup");

    function pressLogin(e){
        e.preventDefault();
        setActiveItem("login");
    }

    function pressSignup(e){
        e.preventDefault();
        setActiveItem("signup");
    }

    return <Grid style={{height: '100vh', textAlign: "center"}}>
        <Grid.Row style={{height: '10%'}}></Grid.Row>
        <Grid.Row style={{height: '10%'}}>
            <Grid.Column width={5}/>
            <Grid.Column width={6} style={{display: "flex"}}>
            <form autoComplete='off' className='form' onSubmit={(e) => pressLogin(e)}>
                <button className='form btn block-cube block-cube-hover'>
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
            <form autoComplete='off' className='form' onSubmit={(e) => pressSignup(e)}>
                <button className='btn block-cube block-cube-hover'>
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
                    Signup
                    </div>
                </button>
            </form>
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

import React from "react";
import { Grid } from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";
import 'firebase/compat/database'

function Homepage() {

    const [activeItem, setActiveItem] = React.useState("signup");
    const navigate = useNavigate();

    function pressLogin(e){
        e.preventDefault();
        setActiveItem("login");
    }

    function pressSignup(e){
        e.preventDefault();
        setActiveItem("signup");
    }

    function pressGoogle(e){
        e.preventDefault();

        var Provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(Provider)
        .then((userCredential) => {
                var user = userCredential.user;
                
                /*
                 * Push user profile
                 */
                var users = firebase.database().ref('com_list/users/' + user.uid);
                var userLength = firebase.database().ref('com_list/userlength');
                userLength.once('value', (snapshot) => {

                    /*
                     * Set and get default image
                     */

                    if(snapshot.val() == null) {
                        userLength.set(0);
                        users.set({
                            email: user.email,
                            id: 0,
                            name: user.email,
                            imgURL: user.photoURL,
                            userid: user.uid,
                        });
                    }
                    else{
                        users.set({
                            email: user.email,
                            id: snapshot.val(),
                            name: user.email,
                            imgURL: user.photoURL,
                            userid: user.uid,
                        });
                    }
                    
                    /* Update user length  */
                    userLength.set(snapshot.val() + 1);

                    /* Navigate to chatroom */
                    navigate('/chatroom')
                })
            }
        )
        .catch(function(error) {
                create_alert("error", error.message);
            }
        )

    }

    return <Grid style={{height: '100vh', textAlign: "center"}}>
        <Grid.Row style={{height: '10%'}}></Grid.Row>
        <Grid.Row style={{height: '10%', alignItems: "center", justifyContent: "center"}}>
            <Grid.Column style={{width: "20%", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
            <form autoComplete='off' className='form' onSubmit={(e) => pressGoogle(e)}>
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
                    Google
                    </div>
                </button>
            </form>
            </Grid.Column>
        </Grid.Row>
        {
            activeItem === "signup" ? <Grid.Row textAlign="center" style={{height: '40%'}}><Signup style={{}}></Signup></Grid.Row> :
                <Grid.Row textAlign="center" style={{height: '40%'}}><Login></Login></Grid.Row>
        }
        <Grid.Row style={{height: '30%'}}></Grid.Row>
    </Grid>
}

export default Homepage;

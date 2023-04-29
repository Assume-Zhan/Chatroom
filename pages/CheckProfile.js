import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";
import 'firebase/compat/database'
import 'firebase/compat/storage'

function CheckProfile() {

    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [imgURL, setImgURL] = React.useState("");

    React.useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if(user === null){
                navigate("/")
            }
            else{
                setUser(user);

                /*
                 * Get user profile name
                 */
                var users = firebase.database().ref('com_list/users/' + user.uid);
                users.once('value', (snapshot) => {
                    if(snapshot.val() != null) {
                        setUsername(snapshot.val().name);
                        setImgURL(snapshot.val().imgURL);
                    }
                });
            }
        })
    }, [])

    return <>
    <form 
        autoComplete='off' 
        style={{textAlign: "center", justifyContent: "center"}} 
        className='form' id="profile_form" 
        onSubmit={(e) => navigate('/setprofile')}
    >
        <img src={imgURL} style={{width: "150px", height: "150px"}} alt="profile_img" id="profile_img"/>
        <div className='control'>
            <h3 style={{textAlign: "center"}}>
            Name :  {username}
            </h3>
        </div>
        <div className='control'>
            <h3 style={{textAlign: "center"}}>
            Email :  {user === null ? "" : user.email}
            </h3>
        </div>
        <button className='btn block-cube block-cube-hover' id="profile_button" type='submit' >
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
            Set
            </div>
        </button>
    </form>
    <form autoComplete='off' className='form' id="profile_form" onSubmit={(e) => {navigate("/chatroom"); location.reload()}}>
        <button className='btn block-cube block-cube-hover' id="profile_button" type='submit' >
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
            Back
            </div>
        </button>
    </form>
    </>

}

export default CheckProfile;

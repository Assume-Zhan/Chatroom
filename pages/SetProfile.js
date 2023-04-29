import React from "react";
import '../css/enter.css'
import { useNavigate } from "react-router-dom";
import firebase from "../utils/config";
import "firebase/compat/auth";
import 'firebase/compat/database'
import 'firebase/compat/storage'

function SetProfile() {

    function SubmitForm(e){
        e.preventDefault();
        firebase.auth().onAuthStateChanged(
            (user) => {

                /*
                 * Set user profile
                 */
                if(user === null) return;
                var users = firebase.database().ref('com_list/users/' + user.uid);

                users.get().then((snapshot) => {
                    var tempData = snapshot.val();
                    tempData.name = username;
                    if(tempData != null){
                        users.set(tempData);
                    }
                    alert("Set ");
                    navigate('/chatroom');
                })
            }
        )
    }

    function SubmitForm2(e){
        e.preventDefault();
        
        firebase.auth().onAuthStateChanged(
            (user) => {

                /*
                 * Add test picture put
                 */
                var metadata = {
                    contentType: 'image/png'
                };
                var storageReference = firebase.storage().ref('com_list/users/' + user.uid + "/img.png");
                storageReference.put(e.target.files[0], metadata).then(() => {
                    storageReference.getDownloadURL().then((url) => {
                        var users = firebase.database().ref('com_list/users/' + user.uid);
                        var tempData;

                        users.once('value', (snapshot) => {
                            tempData = snapshot.val();
                            tempData.imgURL = url;
                        }).then(() => {
                            if(tempData != null){
                                users.set(tempData);
                            }
                            console.log(tempData);
                            navigate('/chatroom');
                        })
                    })
                })
                
            }
        )

    }

    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");

    return <>
    <form autoComplete='off' className='form' id="profile_form" onSubmit={(e) => SubmitForm(e)}>
        <div className='control'>
            <h1 style={{textAlign: "center"}}>
            Set your profile
            </h1>
        </div>
        <div className='control block-cube block-input'>
            <input name='username' placeholder='Username' type='text' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
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
            Submit
            </div>
        </button>
    </form>
    <form autoComplete='off' className='form profile_picture'>
        <div className='control block-cube block-input'>
            <input name='username' placeholder='file' type='file' onChange={(e) => {SubmitForm2(e)}}/>
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
    </form>
    <form autoComplete='off' className='form' id="profile_form" onSubmit={(e) => navigate("/checkprofile")}>
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

export default SetProfile;

import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBQG88zqwF86nmG-76x3Fux2FdvYEjMT08",
  authDomain: "software-studio-chatroom-59f2f.firebaseapp.com",
  databaseURL: "https://software-studio-chatroom-59f2f-default-rtdb.firebaseio.com",
  projectId: "software-studio-chatroom-59f2f",
  storageBucket: "software-studio-chatroom-59f2f.appspot.com",
  messagingSenderId: "222535257373",
  appId: "1:222535257373:web:d2cda653bcfbeecac225f4",
  measurementId: "G-NC4WD4YW3F"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
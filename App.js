import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Chatroom from "./pages/Chatroom";

function App(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage></Homepage>}></Route>
            <Route path="/signin" element={<Signin></Signin>} exact></Route>
            <Route path="/login" element={<Login></Login>} exact></Route>
            <Route path="/chatroom" element={<Chatroom></Chatroom>} exact></Route>
        </Routes>
    </BrowserRouter>
}

export default App;
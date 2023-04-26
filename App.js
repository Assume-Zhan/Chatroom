import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/Signup";
import styled from 'styled-components';
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Chatroom from "./pages/Chatroom";
import "./index.css"

var StyledHomepage = styled(Homepage)`
    background-color: blue;
`;

function App(){

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<StyledHomepage></StyledHomepage>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/chatroom" element={<Chatroom></Chatroom>}></Route>
        </Routes>
    </BrowserRouter>
}

export default App;
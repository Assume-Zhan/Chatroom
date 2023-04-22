import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signin from "./pages/Signin";
import styled from 'styled-components';
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Chatroom from "./pages/Chatroom";

var StyledHomepage = styled(Homepage)`
    background-color: blue;
`;

function App(){

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<StyledHomepage></StyledHomepage>}></Route>
            <Route path="/signin" element={<Signin></Signin>} exact></Route>
            <Route path="/login" element={<Login></Login>} exact></Route>
            <Route path="/chatroom" element={<Chatroom></Chatroom>} exact></Route>
        </Routes>
    </BrowserRouter>
}

export default App;
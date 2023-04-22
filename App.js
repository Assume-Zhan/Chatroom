import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Signin from "./pages/Signin";
import Login from "./pages/Login";

function App(){
    return <BrowserRouter> 
        <Header/>
        <Routes>
            <Route path="/" element={<h1>Hello</h1>}></Route>
            <Route path="/signin" element={<Signin></Signin>} exact></Route>
            <Route path="/login" element={<Login></Login>} exact></Route>
        </Routes>
    </BrowserRouter>
}

export default App;
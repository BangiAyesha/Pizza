import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Success from "./components/Success";
import Profile from "./components/Profile";
import Orders from "./components/Orders";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Mainpage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/order" element={<Orders />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

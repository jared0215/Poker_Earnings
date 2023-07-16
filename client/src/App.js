import React, { useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/views/Main";
import UserUpdate from "./components/UserTable/UserUpdate";
import PokerForm from "./components/PokerEarner/PokerForm";
import PokerList from "./components/PokerEarner/PokerList";
import PokerUpdate from "./components/PokerEarner/PokerUpdate";
import NavBar from "./components/Navigation/Navbar";

function App() {
    const userListRef = useRef(null);

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar userListRef={userListRef} />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route
                        path="/home"
                        element={<Main userListRef={userListRef} />}
                    />
                    <Route path="/users/edit/:id" element={<UserUpdate />} />
                    <Route path="/users/:id/poker" element={<PokerForm />} />
                    <Route
                        path="/users/:id/poker/games"
                        element={<PokerList />}
                    />
                    <Route path="/poker/edit/:id" element={<PokerUpdate />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

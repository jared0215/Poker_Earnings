import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Main from "./components/views/Main";
import UserUpdate from "./components/UserTable/UserUpdate";
import PokerForm from "./components/PokerEarner/PokerForm";
import PokerList from "./components/PokerEarner/PokerList";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Main />} />
                    <Route path="/users/edit/:id" element={<UserUpdate />} />
                    <Route path="/users/:id/poker" element={<PokerForm />} />
                    <Route
                        path="/users/:id/poker/games"
                        element={<PokerList />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

// Import necessary libraries
import React, { useRef } from "react"; // useRef hook from React
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Router components from react-router-dom
// Import necessary components
import Main from "./components/views/Main";
import UserUpdate from "./components/UserTable/UserUpdate";
import PokerForm from "./components/PokerEarner/PokerForm";
import PokerList from "./components/PokerEarner/PokerList";
import PokerUpdate from "./components/PokerEarner/PokerUpdate";
import NavBar from "./components/Navigation/Navbar";

// App component
function App() {
    // useRef hook to create a mutable ref object with null as initial value
    const userListRef = useRef(null);

    return (
        <div className="App">
            <BrowserRouter>
                {" "}
                {/* Wraps all Route components and manages routing */}
                <NavBar userListRef={userListRef} />{" "}
                {/* Navbar with userListRef prop */}
                <Routes>
                    {" "}
                    {/* Wrapper for all Route components */}
                    <Route path="/" element={<Navigate to="/home" />} />{" "}
                    {/* Route to redirect from "/" to "/home" */}
                    <Route
                        path="/home"
                        element={<Main userListRef={userListRef} />}
                    />
                    {/* Route to Main component with userListRef prop */}
                    <Route
                        path="/users/edit/:id"
                        element={<UserUpdate />}
                    />{" "}
                    {/* Route to UserUpdate component */}
                    <Route
                        path="/users/:id/poker"
                        element={<PokerForm />}
                    />{" "}
                    {/* Route to PokerForm component */}
                    <Route
                        path="/users/:id/poker/games"
                        element={<PokerList />}
                    />{" "}
                    {/* Route to PokerList component */}
                    <Route
                        path="/poker/edit/:id"
                        element={<PokerUpdate />}
                    />{" "}
                    {/* Route to PokerUpdate component */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// Export App component
export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./config/firebase";
import { login } from "./features/login.js";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

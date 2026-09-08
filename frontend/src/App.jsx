import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./config/firebase";
import { login } from "./features/login.js";
import Dashboard from "./pages/dashboard";
import { getMe } from "./features/me";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserData } from "./redux/userSlice.js";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      console.log("me data", data);
      dispatch(setUserData(data));
    };
    fetchUser();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

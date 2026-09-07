import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./config/firebase";
import { login } from "./features/login.js";

const App = () => {
  const handleLogIn = async () => {
    const data = await signInWithPopup(auth, googleProvider);

    console.log("data from frontend", data);
    const token = await data.user.getIdToken();

    console.log("token from frontend", token);
    const loginData = await login({ token });
    console.log("loginData", loginData);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogIn}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default App;

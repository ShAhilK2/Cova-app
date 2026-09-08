import { signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../config/firebase";
import { login } from "../features/login";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import ProfileCard from "../components/profile.jsx";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const handleLogIn = async () => {
    setLoading(true);
    const data = await signInWithPopup(auth, googleProvider);

    console.log("data from frontend", data);
    const token = await data.user.getIdToken();

    console.log("token from frontend", token);
    const loginData = await login({ token });
    console.log("loginData", loginData);
    dispatch(setUserData(loginData));

    setLoading(false);
  };

  if (!userData) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[20px] dark:block" />

        {/* Card */}
        <div
          className="
          relative w-full max-w-sm rounded-2xl
          border border-slate-200/70
          bg-white/80 p-8 text-center
          shadow-xl shadow-slate-200/50
          backdrop-blur-xl
          dark:border-white/[0.08]
          dark:bg-white/[0.03]
          dark:shadow-white/40
          animate-card-enter
        "
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg shadow-black/5 dark:border-transparent">
            <span className="text-lg font-bold text-slate-900">Cova</span>
          </div>

          <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
            Welcome to Cova AI
          </h2>

          <p className="mb-6 text-xs text-slate-600 dark:text-slate-400">
            Sign in to access your projects and continue building
          </p>

          <button
            className="
            flex w-full cursor-pointer items-center justify-center
            gap-2 rounded-lg bg-slate-900 px-6 py-3
            text-sm font-medium text-white
            shadow-lg shadow-slate-900/10
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-slate-800
            hover:shadow-xl
            dark:bg-white dark:text-slate-900
            dark:hover:bg-slate-100
            disabled:opacity-50
          "
            onClick={handleLogIn}
            disabled={loading}
          >
            <FcGoogle className="text-lg" />
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="mt-4 text-[10px] text-slate-500 dark:text-slate-400">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full items-center justify-center font-black">
      Dashboard
    </div>
  );
};

export default Dashboard;

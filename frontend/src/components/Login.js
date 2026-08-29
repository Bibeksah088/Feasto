import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { setlogin, url, setToken } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const OnchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Validate confirm password on signup
    if (currState === "Signup" && data.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (currState === "Signup" && data.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    let newurl = url;
    if (currState === "Login") {
      newurl += "/api/v1/user/login";
    } else {
      newurl += "/api/v1/user/signup";
    }

    setLoading(true);
    try {
      const response = await axios.post(newurl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(currState === "Login" ? "Welcome back!" : "Account created successfully!");
        setlogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="w-[90%] max-w-[420px] rounded-2xl bg-white p-8 flex flex-col gap-5 shadow-2xl animate-fadein"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{currState}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {currState === "Login"
                ? "Welcome back to Feasto!"
                : "Create your Feasto account"}
            </p>
          </div>
          <img
            src={assets.cross}
            className="w-5 h-5 cursor-pointer hover:opacity-70 transition"
            alt="close"
            onClick={() => setlogin(false)}
          />
        </div>

        {/* Name — only on Signup */}
        {currState === "Signup" && (
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={data.name}
            onChange={OnchangeHandler}
            required
            className="w-full h-12 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:border-[#f7983f] focus:ring-1 focus:ring-[#f7983f] transition"
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={data.email}
          onChange={OnchangeHandler}
          required
          className="w-full h-12 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:border-[#f7983f] focus:ring-1 focus:ring-[#f7983f] transition"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={OnchangeHandler}
          required
          className="w-full h-12 border border-gray-300 rounded-xl px-4 text-sm focus:outline-none focus:border-[#f7983f] focus:ring-1 focus:ring-[#f7983f] transition"
        />

        {/* Confirm Password — only on Signup */}
        {currState === "Signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`w-full h-12 border rounded-xl px-4 text-sm focus:outline-none transition ${
              confirmPassword && confirmPassword !== data.password
                ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-[#f7983f] focus:ring-1 focus:ring-[#f7983f]"
            }`}
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full h-12 rounded-xl text-white font-semibold text-base transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#f7983f] hover:bg-[#e8892f] active:scale-[0.98]"
          }`}
        >
          {loading ? "Please wait..." : currState === "Login" ? "Sign In" : "Create Account"}
        </button>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input type="checkbox" className="w-4 h-4 mt-0.5 accent-[#f7983f]" required />
          <p className="text-xs text-gray-500">
            By continuing, I agree to the Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Toggle Login/Signup */}
        <p className="text-sm text-center text-gray-600">
          {currState === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-[#f7983f] cursor-pointer font-semibold hover:underline"
                onClick={() => {
                  setCurrState("Signup");
                  setConfirmPassword("");
                }}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-[#f7983f] cursor-pointer font-semibold hover:underline"
                onClick={() => setCurrState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;

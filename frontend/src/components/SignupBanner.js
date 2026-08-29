import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const SignupBanner = () => {
  const { token, setlogin } = useContext(StoreContext);

  // Don't show if user is already logged in
  if (token) return null;

  return (
    <div className="mx-4 md:mx-[30px] my-8 rounded-2xl bg-gradient-to-r from-[#f7983f] to-[#ff6b35] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col gap-3 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Hungry? Join Feasto Today! 🍔
        </h2>
        <p className="text-white/90 text-sm md:text-base max-w-[450px]">
          Sign up now and explore hundreds of delicious dishes from the best
          restaurants near you. Your next favorite meal is just a click away!
        </p>
      </div>
      <button
        onClick={() => setlogin(true)}
        className="bg-white text-[#f7983f] font-bold px-8 py-3 rounded-xl hover:bg-gray-100 active:scale-95 transition-all duration-200 text-base whitespace-nowrap shadow-lg"
      >
        Sign Up Free →
      </button>
    </div>
  );
};

export default SignupBanner;

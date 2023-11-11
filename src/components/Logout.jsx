import React from "react";
import { useUser } from "../lib/context/UserContext";
const Logout = () => {
  const { user, logout } = useUser();
  return (
    <div className="flex justify-end bg-transparent m-3 sm:m-1">
      <button
        onClick={() => logout()}
        className="border-[1px] 
        text-white border-white py-1 px-2 text-lg transition-all ease-linear cursor-pointer hover:bg-gradient-to-br from-sky-500 to-purple-600  hover:border-transparent"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

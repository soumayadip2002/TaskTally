import React from "react";
import Logout from "../components/Logout";
import Intro from "../components/Intro";
import Todo from "../components/Todo";
import AllTodo from "../components/AllTodo";
import AddTodo from "../components/AddTodo";
const Home = () => {
  return (
    <div
      className="h-screen dark:bg-[#17191d] bg-slate-100 dark:text-gray-200 text-gray-800 grid grid-rows-[1.5fr,2fr] md:grid-rows-[1fr,2fr] sm:grid-rows-[1.5fr,2fr]
     font-Josefin"
    >
      <div
        className={`dark:bg-[url('/image/bg-desktop-dark.jpg')] 
      bg-[url('/image/bg-desktop-light.jpg')] md:dark:bg-[url('/image/bg-mobile-dark.jpg')] 
      md:bg-[url('/image/bg-mobile-light.jpg')] bg-cover bg-no-repeat bg-center`}
      >
        <Logout />
      </div>
      <div className="w-[40%] m-auto mt-[-13rem] md:mt-[-17rem] sm:mt-[-15rem] md:w-[70%] sm:w-[85%]">
        <div>
          <Intro />
          <AddTodo />
          <AllTodo />
        </div>
      </div>
    </div>
  );
};

export default Home;

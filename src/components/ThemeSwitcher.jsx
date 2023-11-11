import React, { useState, useEffect } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { IoMoonSharp } from "react-icons/io5";
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div>
      <button onClick={handleTheme} className="text-[1.5rem]">
        {theme === "light" ? <IoMoonSharp /> : <BsFillSunFill />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;

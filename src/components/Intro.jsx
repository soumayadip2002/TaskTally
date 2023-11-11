import React from 'react'
import ThemeSwitcher from "../components/ThemeSwitcher";
const Intro = () => {
  return (
    <div className="flex justify-between items-center text-white ">
    <h1 className="font-bold text-[2rem] tracking-[.6rem]">TODO</h1>
    <ThemeSwitcher />
  </div>
  )
}

export default Intro

import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { useTask } from "../lib/context/Tasks";
const EditTodo = ({ task }) => {
  const [updateTask, setUpdateTask] = useState(task.task);
  const [open, setOpen] = useState(false);
  const { updateTasks } = useTask();
  const handleUpdate = () => {
    updateTasks({ task: { ...task, task: updateTask } });
  };
  return (
    <>
      <BiEditAlt
        className="text-green-500"
        onClick={(e) => {
          setOpen(!open);
        }}
      />
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] h-screen w-screen  
  flex justify-center items-center ${open ? "visible" : "hidden"}`}
      >
        <div className="w-[42%] h-[40%] md:w-[70%] sm:w-[85%] px-8 rounded-md bg-[#eaf6f6] dark:bg-[#060608] relative flex justify-center items-center shadow-2xl">
          <p
            className="absolute right-0 top-0 cursor-pointer overflow-hidden text-4xl text-purple-800"
            onClick={() => setOpen(!open)}
          >
            <IoCloseCircleOutline />
          </p>
          <div className="w-[100%]">
            <input
              type="text"
              className="bg-white rounded-md dark:bg-[#2c363f] py-3 px-2 w-[100%] 
      shadow-sm border-[1px] border-purple-900 outline-none"
              value={updateTask}
              onChange={(e) => setUpdateTask(e.target.value)}
            />
            <div className="mt-[1.5rem] flex justify-center">
              <button
                className="hover:bg-green-600 bg-transparent border-[1px] border-green-600 transition-all 
          ease-linear py-1 px-6"
                onClick={() => {
                  handleUpdate();
                  setOpen(!open)
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;

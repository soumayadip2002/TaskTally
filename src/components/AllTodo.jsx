import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoIosRadioButtonOff } from "react-icons/io";
import { useTask } from "../lib/context/Tasks";
import { useUser } from "../lib/context/UserContext";
import EditTodo from "./EditTodo";
const AllTodo = () => {
  const { tasks, completeTask, deleteTask, deleteCompletedTask } = useTask();
  const { user } = useUser();
  const [filter, setFilter] = useState("All");

  const [completedTask, setCompletedTask] = useState([]);

  useEffect(()=>{
    const completed = tasks.filter((task)=>task.userId===user.$id && task.completed);
    setCompletedTask(completed)
  }, [tasks, user.$id])

  const filteredTask = tasks.filter((task) => {
    if (filter === "All") return true;
    else if (filter === "Active") return !task.completed;
    else if (filter === "Completed") return task.completed;
  });

  const incompleteTask = tasks.filter((task) => {
    if (task.userId === user.$id) {
      return !task.completed;
    }
  });

  const handleUpdate = (task) => {
    completeTask({ task, completed: true });
  };
  return (
    <div className="dark:bg-[#2c363f] bg-white h-full mt-[1.6rem] rounded-md shadow-lg">
      <div className="dark:border-gray-500 border-gray-300  border-b-[1px]">
        <div className="flex justify-between sm:justify-center items-center p-4 text-sm text-gray-400 cursor-pointer">
          <p className="sm:hidden">{incompleteTask.length} items left</p>
          <div className="flex gap-x-5">
            <p
              onClick={() => {
                setFilter("All");
              }}
              className={filter === "All" ? "text-cyan-600" : ""}
            >
              All
            </p>
            <p
              onClick={() => {
                setFilter("Active");
              }}
              className={filter === "Active" ? "text-cyan-600" : ""}
            >
              Active
            </p>
            <p
              onClick={() => {
                setFilter("Completed");
              }}
              className={filter === "Completed" ? "text-cyan-600" : ""}
            >
              Completed
            </p>
          </div>
          <p
            className="sm:hidden cursor-pointer"
            onClick={() => {
              deleteCompletedTask(completedTask)
              setCompletedTask(null);
            }}
          >
            Clear Completed
          </p>
        </div>
      </div>

      <ul>
        {filteredTask.map((task) =>
          task.userId === user.$id ? (
            <li
              key={task.$id}
              className="dark:border-gray-500 border-gray-300 border-b-[1px] last:border-none"
            >
              <div className="flex justify-between items-center p-3 text-sm gap-x-5">
                <div className="flex items-center text-sm gap-x-5">
                  <div
                    className={`flex items-center justify-center cursor-pointer `}
                    onClick={() => handleUpdate(task)}
                  >
                    {task.completed ? (
                      <div className="border-[1px] p-[.1rem] grid place-items-center rounded-full bg-gradient-to-br from-[#57ddff] to-[#c058f3] border-none">
                        <AiOutlineCheck className="text-2xl p-[.3rem] text-white font-bold" />
                      </div>
                    ) : (
                      <div className="border-[1px] rounded-full grid place-items-center border-gray-400 overflow-hidden">
                        <IoIosRadioButtonOff className="text-2xl text-white dark:text-[#2c363f]" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`text-lg flex items-center pt-1  ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    <p className="overflow-y-auto overflow-x-hidden">
                      {task.task}
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-5 text-xl sm:text-base cursor-pointer">
                  {!task.completed ? <EditTodo task={task} /> : ""}

                  <RxCross1
                    className="text-red-500"
                    onClick={() => deleteTask(task.$id)}
                  />
                </div>
              </div>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

export default AllTodo;

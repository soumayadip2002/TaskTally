import React, { useState } from "react";
import { CgPlayListAdd } from "react-icons/cg";
const Todo = ({task, setTask, operation, button}) => {
  return (
    <div className="dark:bg-[#2c363f] bg-white w-[100%] mt-[2rem] rounded-md overflow-x-hidden shadow-md p-4">
      <form className="flex items-center gap-x-4" onSubmit={operation}>
        <input
          type="text"
          className="w-[100%] py-1 bg-transparent border-none outline-none"
          placeholder="Create a new todo..."
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="overflow-hidden" type="submit">
          {button}
        </button>
      </form>
    </div>
  );
};

export default Todo;

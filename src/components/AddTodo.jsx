import React, {useState}  from "react";
import { useTask } from "../lib/context/Tasks";
import { useUser } from "../lib/context/UserContext";
import { CgPlayListAdd } from "react-icons/cg";
import Todo from "./Todo";
const AddTodo = () => {
  const [task, setTask] = useState("");
  const { addTask } = useTask();
  const { user } = useUser();
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask({ userId: user.$id, task });
    setTask("");
  };
  return (
    <Todo
      task={task}
      setTask={setTask}
      operation={handleSubmit}
      button={
        <CgPlayListAdd className="text-3xl text-[#9d53c3] cursor-pointer" />
      }
    />
  );
};

export default AddTodo;

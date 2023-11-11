import { useState, useEffect, useContext, createContext } from "react";
import { databases } from "../appwrite";
import { ID } from "appwrite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

const TasksContext = createContext();
export const useTask = () => {
  return useContext(TasksContext);
};
const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const addTask = async (taskData) => {
    try {
      let response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        taskData
      );
      setTasks((tasks) => [response, ...tasks]);
      if (response) {
        toast.success("Successfully Created!!", {
          position:'bottom-left',
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const completeTask = async (taskComplete) => {
    try {
      const { task, completed } = taskComplete;
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        task.$id,
        { completed }
      );
      setTasks((tasks) =>
        tasks.map((t) => (t.$id === task.$id ? { ...t, completed } : t))
      );

      if (response) {
        toast.success("Successfully Completed Task!!", {
          position:'bottom-left',
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateTasks = async (taskPayload) => {
    try {
      const { task, completed } = taskPayload;
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        task.$id,
        { completed, task: task.task }
      );
      setTasks((tasks) =>
        tasks.map((t) => (t.$id === task.$id ? { ...t, ...task } : t))
      );

      if (response) {
        toast.success("Successfully Edited!!", {
          position:'bottom-left',
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        taskId
      );

      setTasks((tasks) => tasks.filter((task) => task.$id !== taskId));
      if (response) {
        toast.success("Successfully Deleted!!", {
          position:'bottom-left',
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCompletedTask = async (completedTask) => {
    try {
      for (const task of completedTask) {
        const documentId = task.$id;
        const response = await databases.deleteDocument(
          DATABASE_ID,
          COLLECTION_ID,
          documentId
        );
      }
      setTasks((tasks) => tasks.filter((task) => !task.completed));
      toast.success("Successfully Deleted Completed Task!!", {
        position:'bottom-left',
        autoClose: 1000,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getTask = async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    setTasks(response.documents);
  };

  useEffect(() => {
    getTask();
  }, []);

  const userTasks = {
    tasks,
    addTask,
    updateTasks,
    completeTask,
    deleteTask,
    deleteCompletedTask,
  };
  return (
    <TasksContext.Provider value={userTasks}>
      {children} <ToastContainer />
    </TasksContext.Provider>
  );
};

export default TasksProvider;

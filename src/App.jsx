import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProvider from "./lib/context/UserContext";
import PrivateRoute from "./lib/context/PrivateRoute";
import Home from "./pages/Home";
import TasksProvider from "./lib/context/Tasks";

function App() {
  return (
    <UserProvider>
      <TasksProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </TasksProvider>
    </UserProvider>
  );
}

export default App;

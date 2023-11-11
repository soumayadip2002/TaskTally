import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useUser } from "../lib/context/UserContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { user, login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {email, password};
    login(userInfo);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-[#2c363f]">
      <div className="bg-[#435360] h-fit p-8 pt-1 w-[30%] sm:w-[90%] lg:w-[50%] rounded-md shadow-lg text-white">
        <h2 className="text-center text-white my-[1rem] text-[1.5em]">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="bg-[#647d90] p-2 w-full rounded-md border-none outline-none my-2"
            placeholder="enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="bg-[#647d90] p-2 w-full rounded-md border-none outline-none my-2"
            placeholder="enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center">
            <Button action={"login"} />
          </div>
        </form>
        <p className="mt-5">
          Don't have an account ?{" "}
          <Link to="/signup" className="underline text-[#FFC7EA]">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

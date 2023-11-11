import { acount } from "../appwrite";
import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import Loading from "../../assets/image/loading.gif";

const AuthContext = createContext();
export const useUser = () => {
  return useContext(AuthContext);
};
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUserStatus();
  }, []);

  const login = async (userInfo) => {
    setLoading(true);
    try {
      let response = await acount.createEmailSession(
        userInfo.email,
        userInfo.password
      );

      let acountDetails = await acount.get();
      setUser(acountDetails);
      console.log(acountDetails);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const logout = async () => {
    await acount.deleteSession("current");
    setUser(null);
  };

  const register = async (userInfo) => {
    setLoading(true);
    try {
      let response = await acount.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.userName
      );
      if (response) {
        await acount.createEmailSession(userInfo.email, userInfo.password);
        let acountDetails = await acount.get();
        setUser(acountDetails);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const setUserStatus = async () => {
    try {
      const acountDetails = await acount.get();
      setUser(acountDetails);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  };

  const contextData = {
    user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-[#2c363f]">
          <img src={Loading} className="h-[6rem] w-auto" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default UserProvider;

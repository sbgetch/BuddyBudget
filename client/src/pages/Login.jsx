//libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//context
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, submitError, setSubmitError, setUserId } =
    useContext(AppContext);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://buddybudget-be.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );

      const data = await response.json();
      if (!data.message) {
        setSubmitError("Invalid login!");

        setTimeout(() => {
          setSubmitError("");
        }, 3000);
      } else {
        localStorage.setItem("token", JSON.stringify(data.token));

        setIsLoggedIn(true);
        setUserId(data.userId);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="bg-white h-96 shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form action="" onSubmit={handleSubmitLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              onChange={handleChangeLogin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-700"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChangeLogin}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-700"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button className="loginBtn h-10 w-40 mt-4" type="submit">
              Login
            </button>
            {submitError && <p className="redErrorText">{submitError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

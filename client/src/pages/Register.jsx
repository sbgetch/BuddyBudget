//libraries
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//context
import { AppContext } from "../context/AppContext";

function Register() {
  const navigate = useNavigate();

  const { submitError, setSubmitError } = useContext(AppContext);

  const [registration, setRegistration] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChangeRegistration = (event) => {
    setRegistration({
      ...registration,
      [event.target.id]: event.target.value,
    });
  };

  const handeSubmitRegistration = async (event) => {
    event.preventDefault();

    const alphaRegex = new RegExp("^[a-zA-Z\\s]{2,}$");
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );
    const completeForm =
      !registration.email || !registration.password || !registration.name;

    const errorFunction = (error) => {
      setSubmitError(error);

      setTimeout(() => {
        setSubmitError("");
      }, 3000);
    };

    //form validations
    if (completeForm) {
      errorFunction("Please complete all the text fields!");
    } else if (!alphaRegex.test(registration.name)) {
      errorFunction(
        "Name should consist of letters only and at least 2 characters"
      );
    } else if (!emailRegex.test(registration.email)) {
      errorFunction("Please input valid email!");
    }

    try {
      const response = await fetch(
        `https://buddybudget-be.onrender.com/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registration),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        navigate("/login");
      } else {
        errorFunction(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 ">
      <div className="bg-white h-fit shadow-md rounded-lg p-8 pb-16 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form action="" onSubmit={handeSubmitRegistration}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={handleChangeRegistration}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-700"
            />
          </div>
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
              onChange={handleChangeRegistration}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-700"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChangeRegistration}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-700"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button className="registerBtn h-10 w-40 mt-4" type="submit">
              Submit
            </button>
            {submitError && <p className="redErrorText">{submitError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

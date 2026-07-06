import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  
  const [user,setUser] = useState({email :"", password :""})
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError("Failed to sign in.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Sign in to your account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
                 {error && (
            <p className="text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={user.email}
              onChange={(e) => {
                setUser({...user, email: e.target.value})
              }}
            />
                 
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={user.password}
              onChange={(e) => {
                setUser({...user, password: e.target.value})
              }}
            />
              
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
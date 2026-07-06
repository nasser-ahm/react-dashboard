import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
const [user,setUser] = useState({email: "" , password:"", confirmpass: ""})
const [error,setError] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (user.password !== user.confirmpass) {
    return setError("passwords not matching")
  }
  try {
  await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  navigate("/Login");
  setUser({
  email: "",
  password: "",
  confirmpass: "",
});


} catch (err) {
  switch (err.code) {
    case "auth/email-already-in-use":
      setError("This email is already registered.");
      break;
    case "auth/weak-password":
      setError("Password must be at least 6 characters.");
      break;
    case "auth/invalid-email":
      setError("Please enter a valid email.");
      break;
    default:
      setError("Something went wrong.");
  }
}
}


  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="inset-0 w-[400px] bg-white rounded-xl p-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-500">{error}</div>}
          <h3 className="text-2xl">sign-in</h3>
          <label htmlFor="email">Email :</label>
          <input type="email" className="rounded-xl border py-2 px-2" required value={user.email} onChange={(e) => {setUser({...user, email :e.target.value})}}/>
          <label htmlFor="password">Password :</label>
          <input type="password" className="rounded-xl border py-2 px-2" value={user.password} onChange={(e) => setUser({...user, password:e.target.value})}/>
          <label htmlFor="confirm-pass">Confirm password :</label>
          <input type="password" className="py-2 rounded-xl border px-2" value={user.confirmpass} onChange={(e) => setUser({...user, confirmpass:e.target.value})}/>
          <button className="bg-blue-400 w-90 py-2 px-4 rounded-xl cursor-pointer" type="submit" >sign-in</button>
        </form>
      </div>
      
    </div>
  )
}

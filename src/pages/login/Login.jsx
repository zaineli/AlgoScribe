import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"
import "./login.scss"
import { Navigate, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

export default function Login() {
  const[error, setError] = useState(false)
  const[email, setEmail] = useState()
  const[password, setPassword] = useState()

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch({type: "LOGIN", payload:user})
    navigate("/")
    // ...
  })
  .catch((error) => {
    setError(true)
  });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
         <h1>Visualizer</h1>
        <input type="email" placeholder='email' onChange={e=> setEmail(e.target.value)}/>
        <input type="password" placeholder='password' onChange={e=> setPassword(e.target.value)} />
        <button type='submit'>Login</button>
        {error && <span>Wrong email or password</span>}
        <button onClick={() => navigate("/register")}>Register</button>
        {/* <Navigate to="/register">Register</Navigate> */}
      </form>
    </div>
  )
}

import React from "react";
import { useDispatch } from "react-redux";
import { auth, googleAuth } from "./firebase";
import { login } from "./features/appSlice";
import "./Login.css";
function Login() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    auth
      .signInWithPopup(googleAuth)
      .then((result) =>
        dispatch(
          login({
            userName: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          })
        )
      )
      .catch((err) => alert(err));
  };

  return (
    <div className="Login">
      <h2 className="snapChatTitle">SnapChat</h2>
      <button className="loginButton" onClick={handleLogin}>
        Login using Google
      </button>
    </div>
  );
}

export default Login;

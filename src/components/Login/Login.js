import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { actionTypes } from "../../ContextAPI/reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src="https://image.flaticon.com/icons/svg/733/733585.svg"></img>
        <h2>Sign in to WhatsApp</h2>
        <button onClick={SignIn}>SIGN IN WITH GOOGLE</button>
      </div>
    </div>
  );
}

export default Login;

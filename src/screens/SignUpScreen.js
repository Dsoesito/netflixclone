import { useRef } from "react";
import {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
} from "../firebase";
import "./SignUpScreen.css";
import React from "react";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    registerWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  const signIn = (e) => {
    e.preventDefault();
    logInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;

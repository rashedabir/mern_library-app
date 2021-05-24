import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {userData, setUserData } = useContext(UserContext);


  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/dashboard");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  useEffect(() => {
    if(userData.user){
        history.push('/dashboard');
    }
})

  return (
    <div>
      <div className="form" style={{backgroundColor:'#f2f2f2'}}>
        <form onSubmit={submit}>
          <h3>Login</h3>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Sign in
          </button>
        </form>
        <label>
          Not User!! <Link to="/register">Register Here..</Link>
        </label>
      </div>
      <div className="error-page">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
      </div>
    </div>
  );
}

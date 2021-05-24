import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const {userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await axios.post("http://localhost:5000/users/registration", newUser);
      const loginRes = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      alert("registered..");
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
          <h3>Register</h3>
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
          <div className="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Confirmed Password"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Display Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>
        <label>
          Already Member!! <Link to="/login">Signin Here..</Link>
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

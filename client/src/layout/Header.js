import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Header() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const myFunction = () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  const login = () => {
    history.push("/login");
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  return (
    <div className="topnav" id="myTopnav">
      {userData.user ? (
        <div style={{ height: "100%" }}>
          <Link to="/dashboard" className="active">
            E-Library
          </Link>
          <Link to="/books">Books</Link>
          <Link to="/members">Members</Link>
          <Link to="/bookreturn">Book Return</Link>
          <Link to="/booklend">Book Lend</Link>
          <Link to="/author">Author</Link>
          <button
            className="btn btn-danger"
            style={{
              height: "40px",
              width: "80px",
              marginRight: ".5rem",
              fontSize: "1rem",
              marginTop: "6px",
              float: "right",
            }}
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          <Link to="/" className="active">
            Home
          </Link>
          <Link to="/contact">Contact</Link>
          <Link to="#">About</Link>
          <button
            className="btn btn-warning"
            style={{
              height: "40px",
              width: "70px",
              marginRight: ".5rem",
              fontSize: "1.2rem",
              marginTop: "5px",
              float: "right",
            }}
            onClick={login}
          >
            Login
          </button>
        </div>
      )}

      <Link className="icon" onClick={myFunction}>
        &#9776;
      </Link>
    </div>
  );
}

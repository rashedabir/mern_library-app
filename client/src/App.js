import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/pages/Home";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import Header from "./layout/Header";
import Contact from "./component/pages/Contact";
import UserContext from "./context/UserContext";
import axios from "axios";
import Dashboard from "./component/pages/Dashboard";
import Books from "./component/pages/Books";
import Members from "./component/pages/Members";
import BookReturn from "./component/pages/BookReturn";
import BookLend from "./component/pages/BookLend";
import Author from "./component/pages/Author";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route path="/" exact="true" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/contact" component={Contact} />
            <Route path="/books" component={Books} />
            <Route path="/members" component={Members} />
            <Route path="/bookreturn" component={BookReturn} />
            <Route path="/booklend" component={BookLend} />
            <Route path="/author" component={Author} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

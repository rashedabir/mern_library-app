import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) {
      history.push("/login");
    }
  });

  return (
    <div>
      <div className="wellcome-display">
        <h1>Wellcome</h1>
        <h4>{userData.user.displayName}</h4>
      </div>
    </div>
  );
}

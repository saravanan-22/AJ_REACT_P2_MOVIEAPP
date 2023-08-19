import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/LoginPage");
  };

  return (
    <div style={{ paddingTop: "4em", backgroundColor: "green" }}>
      <button onClick={handleLogIn}>Login</button>
    </div>
  );
};

export default HomePage;

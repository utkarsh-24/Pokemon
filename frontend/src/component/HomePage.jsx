import React, { useState } from "react";
import Dashboard from "./Dashboard";
import PetPage from "./PetPage";
import "../styles/HomePage.css";

const Homepage = () => {
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  return (
    <div>
      <div className="nav-container">
        <div className="tabs">
          <label
          className={`tab ${selectedOption === "dashboard" ? "selected-tab" : ""}`}
            onClick={() => handleOptionChange("dashboard")}
          >
            Dashboard
          </label>
          <label
          className={`tab ${selectedOption === "pets" ? "selected-tab" : ""}`}
            onClick={() => handleOptionChange("pets")}
          >
            Pets
          </label>
        </div>
      </div>
      {selectedOption === "dashboard" ? <Dashboard /> : <PetPage />}
    </div>
  );
};

export default Homepage;

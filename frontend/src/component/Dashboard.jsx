import DashboardCarousel from "./DashboardCarousel";
import "../styles/Dashboard.css";
import DashboardCard from "./DashboardCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [pokemons, setPokemons] = useState([]);
  const fetchPokemons = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bearer = urlParams.get("bearer");
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/api/pokemon",
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      if (response.data.success) setPokemons(response.data.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        window.location.href = "/auth/login" 
      }
    }
  };
  useEffect(() => {
    fetchPokemons();
  }, []);
  return (
    <div className="dashboard">
      <DashboardCarousel>
        {pokemons.map((pokemon) => (
          <DashboardCard {...pokemon} />
        ))}
      </DashboardCarousel>
    </div>
  );
};

export default Dashboard;

import PetCard from "./PetCard";
import "../styles/PetPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const fetchPets = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bearer = urlParams.get("bearer");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/api/pet",
        {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      if (response.data.success) setPets(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPets();
  }, []);
  const feedPet = async (petId) => {
    try {
      const pet = pets.find((pet) => pet._id === petId);
      if (pet && pet.healthStatus < 10) {
        const urlParams = new URLSearchParams(window.location.search);
        const bearer = urlParams.get("bearer");
        const response = await axios.request({
          url: process.env.REACT_APP_API_BASE_URL + "/api/pet/feed/" + petId,
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
          method: "PUT",
        });
        if (response.data.success) {
          const feededPet = response.data.data;
          const updatedPets = pets.map((pet) => {
            if (pet._id === feededPet._id) {
              return feededPet;
            } else {
              return pet;
            }
          });
          setPets(updatedPets);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className="pet__page">
      {pets.map((pet) => (
        <li key={pet.name}>
          <PetCard pet={pet} handleClick={feedPet} />
        </li>
      ))}
    </ul>
  );
};

export default PetPage;

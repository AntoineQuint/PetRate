import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function EditPet(props) {
  const { petId } = useParams();
  const navigate = useNavigate();

  const pet = props.petArr.find((pet) => pet.key === petId);
  
  if (!pet) {
    navigate("/");
  }

  const [updatedPet, setUpdatedPet] = useState({
    name: pet.name,
    description: pet.description,
    owner: pet.owner,
    specie: pet.specie,
    age: pet.age,
    picture: pet.picture,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPet({
      ...updatedPet,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .put(
      
      `https://petrate-default-rtdb.europe-west1.firebasedatabase.app/petData/${petId}.json`, updatedPet
    )
    .then((response) => console.log("Success", response))
    .catch((error) => console.log("Error", error)); 
    props.updatePet(updatedPet);
    navigate(`/pets/${petId}`); 
  };

  return (
    <div className="pet">
      <h1>Edit Pet</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedPet.name}
          onChange={handleChange}
        />
        <br />

        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={updatedPet.description}
          onChange={handleChange}
        />
        <br />

        <label>Owner:</label>
        <input
          type="text"
          name="owner"
          value={updatedPet.owner}
          onChange={handleChange}
        />
        <br />
        <label>Specie:</label>
        <input
          type="text"
          name="specie"
          value={updatedPet.specie}
          onChange={handleChange}
        />
        <br />
        <label>Age:</label>
        <input
          type="numbers"
          name="age"
          value={updatedPet.age}
          onChange={handleChange}
        />
        <br />


        <label>Picture:</label>
        <input
          type="text"
          name="picture"
          value={updatedPet.picture}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

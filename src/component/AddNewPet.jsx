import { useState,useEffect } from "react";
import axios from "axios";
import "./AddNewPet.css"
export default function AddNewPet({ setNewPet }) {

  const [formData,setFormData] = useState({
    name: "",
    description:"",
    owner:"",
    specie:"",
    age:"",
    likes:0,
    picture:""
  })

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    setFormData((val) => ({
      ...val,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPet = { ...formData };

    setNewPet((prevPets) => [newPet, ...prevPets]);
    axios
    .post(
      "https://petrate-default-rtdb.europe-west1.firebasedatabase.app/petData.json", newPet
    )
    .then((response) => console.log("Success", response))
    .catch((error) => console.log("Error", error));
    
    setFormData({
      name: "",
      description: "",
      owner: "",
      specie: "",
      age: "",
      picture: "",
    });



  };


  return (
    <form id="addForm" onSubmit={handleSubmit}>
      <h2>Feel free to add your little pet to the list by filling this form !</h2>
      <label>
        Name:
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="enter their name"
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="enter the description"
          required
        />
      </label>

      <label>
        Owner:
        <input
          name="owner"
          type="text"
          value={formData.owner}
          onChange={handleChange}
          placeholder="enter the owner's name"
          required
        />
      </label>

      <label>
        Specie:
        <input
          name="specie"
          type="text"
          value={formData.specie} 
          onChange={handleChange} 
          placeholder="enter their specie"
          required
        />
      </label>

      <label>
        Age:
        <input 
          name="age" 
          type="numbers"
          value={formData.age} 
          onChange={handleChange}
          required
        />

      </label>
     

      <label>
        Picture:
        <textarea
          name="picture"
          value={formData.picture}
          onChange={handleChange}
          placeholder="enter the url of a picture"
          required
        />
      </label>

      <button>Create</button>
    </form>
  );
}

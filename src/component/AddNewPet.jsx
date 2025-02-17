import { useState } from "react";
import axios from "axios";
import "./AddNewPet.css"
export default function AddNewPet({ setNewPet }) {

  const [formData,setFormData] = useState({
    name: "",
    description:"",
    owner:"",
    specie:"",
    age:"",
    picture:"",
  })

  const handleChange =(event)=>{
    const {value, name, type, checked} = event.target;
    
    setFormData(val =>({
      ...val,
      [name]: type === "checkbox"? checked: value
    }));

   
  }


  const handleSubmit = (event) => {
    event.preventDefault();


    setNewPet((prevPets) => [newPet, ...prevPets]);
    setFormData({
      name: "",
      description:"",
      owner:"",
      specie:"",
      age:"",
      picture:"",
    })

  };
  axios.put("https://petrate-default-rtdb.europe-west1.firebasedatabase.app/petData.json", formData)
        .then(response => console.log(sucess) ) 
        .catch(e => console.log(error))
  return (
    <form id="addForm" onSubmit={handleSubmit}>
      <h2>Add Your Pet</h2>
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

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import EditPet from "./component/EditPet.jsx";
import ShowPet from "./component/ShowPet.jsx";

import PetDetail from "./pages/PetDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";


//import petArr from "./assets/json/ItemsList.json"

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"



function App() {

  const [petsToDisplay, setPetsToDisplay] = useState([]);
  
  const [tempObj, setTempObj] = useState({});
  const base_url = 'https://petrate-default-rtdb.europe-west1.firebasedatabase.app/';
  useEffect(() => {
    axios.get(`${base_url}/petData.json`)
      .then(response => {
        setTempObj(response.data);
      })
      .catch((e) => console.log('data not found: ', e));
  }, []);
  
  useEffect(() => {
    if (Object.keys(tempObj).length > 0) {
    
      const arrayOfObjects = Object.keys(tempObj).map(key => ({ key: key, ...tempObj[key] }));
  
      
      const sortedPets = arrayOfObjects.sort((a, b) => b.likes - a.likes);
  
     
      setPetsToDisplay(sortedPets);
    }
  }, [tempObj]);
  
  

 

  const removePet = (petId) => {
    axios
    .delete(
      `https://petrate-default-rtdb.europe-west1.firebasedatabase.app/petData/${petId}.json`
    )
    .then(() => {
      const newPets = petsToDisplay.filter((pet) => pet.key !== petId);
      setPetsToDisplay(newPets);
    })
    .catch((error) => {
      console.log("Error removing pet: ", error);
    });

  };

  const updatePet = (petId, updatedPet) => {
    const newPets = petsToDisplay.map((pet) =>
      pet.key === petId ? { ...pet, ...updatedPet } : pet
    );
    
    setPetsToDisplay(newPets);
  };

  const petLikes = (petKey) => {
    
    const pet = petsToDisplay.find(p => p.key === petKey);
  
    if (pet) {
     
      const updatedPet = {
        ...pet,
        likes: pet.likes + 1 
      };
  
      setPetsToDisplay(prevPets =>
        prevPets.map(p =>
          p.key === petKey ? updatedPet : p  
        )
      );
  
      
      const updatedLike = {
        likes: updatedPet.likes  
      };
  
      
      axios.patch(`${base_url}/petData/${petKey}.json`, updatedLike)
        .then(response => {
          console.log('Likes incremented successfully:', response);
        })
        .catch(error => {
          console.log('Error incrementing likes:', error);
  
          
          setPetsToDisplay(prevPets =>
            prevPets.map(p =>
              p.key === petKey ? pet : p  
            )
          );
        });
    }
  };
  
  
  
  

  return (
    <div id="app-container">

      <div id="main-section">
        <Navbar/>
        <div id="main-content" className="center-content">
          <Routes>
            <Route
              path="/"
              element={<Home petArr={petsToDisplay} callbackRemovePet={removePet} setNewPet={setPetsToDisplay} callLikes={petLikes} />}
            />
            <Route
              path="/pets/:petId"
              element={<PetDetail petArr={petsToDisplay} />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/CurrentPets"
              element={<ShowPet petArr={petsToDisplay} callbackRemovePet={removePet} callLikes={petLikes} />}
            />
            <Route
              path="/edit/:petId"
              element={<EditPet petArr={petsToDisplay} updatePet={updatePet} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;


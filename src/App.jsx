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
      const arrayOfObjects = Object.keys(tempObj).map(key => ({ key: key,  ...tempObj[key], }));
      setPetsToDisplay(arrayOfObjects);
    }
  }, [tempObj]);
  

 

  const removePet = (petId) => {
    const newPets = petsToDisplay.filter((el) => el.key !== petId);
    setPetsToDisplay(newPets);
  };

  const updatePet = (petId, updatedPet) => {
    const newPets = petsToDisplay.map((pet) =>
      pet.key === petId ? { ...pet, ...updatedPet } : pet
    );
    
    setPetsToDisplay(newPets);
  };

  return (
    <div id="app-container">

      <div id="main-section">
        <Navbar/>
        <div id="main-content" className="center-content">
          <Routes>
            <Route
              path="/"
              element={<Home petArr={petsToDisplay} callbackRemovePet={removePet} setNewPet={setPetsToDisplay} />}
            />
            <Route
              path="/pets/:petId"
              element={<PetDetail petArr={petsToDisplay} />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/CurrentPets"
              element={<ShowPet petArr={petsToDisplay} callbackRemovePet={removePet} />}
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


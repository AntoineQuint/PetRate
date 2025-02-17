import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import EditPet from "./component/EditPet.jsx";
import ShowPet from "./component/ShowPet.jsx";

import PetDetail from "./pages/PetDetail.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import petArr from "./assets/json/ItemsList.json"

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css"



function App() {
  const [petsToDisplay, setPetsToDisplay] = useState(petArr);



  const removePet = (petId) => {
    const newPets = petsToDisplay.filter((el) => el.id !== petId);
    setPetsToDisplay(newPets);
  };

  const updatePet = (petId, updatedPet) => {
    const newPets = petsToDisplay.map((pet) =>
      pet.id === petId ? { ...pet, ...updatedPet } : pet
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


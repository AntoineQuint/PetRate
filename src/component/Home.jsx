import { Link } from "react-router-dom";
import AddNewPet from "./AddNewPet.jsx";
import ShowPets from "./ShowPet.jsx";


export default function Home({ petArr, callbackRemovePet, setNewPet, callLikes }) {
  return (
    <div className="home">
      <h1></h1>
      
      <AddNewPet setNewPet={setNewPet} />

      <ShowPets petArr={petArr} callbackRemovePet={callbackRemovePet} callLikes={callLikes} />
    </div>
  );
}

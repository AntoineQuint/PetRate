import AddNewPet from "./AddNewPet.jsx";
import ShowPets from "./ShowPet.jsx";
import SearchBar from "./searchBar.jsx";

export default function Home({ petArr, callbackRemovePet, setNewPet, callLikes }) {
  return (
    <div className="home">
      <h1></h1>
      
      <SearchBar petsArr={petArr} />

      <ShowPets petArr={petArr} callbackRemovePet={callbackRemovePet} callLikes={callLikes} />


      <AddNewPet setNewPet={setNewPet} />
    </div>
  );
}

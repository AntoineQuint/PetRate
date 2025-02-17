import { Link, useParams } from "react-router-dom";

export default function PetDetail(props) {
  const { petId } = useParams();
  console.log(props)
  const pet = props.petArr.find((element) => {
    return element.id === petId;
  });
  
  return (
    <div key={pet.id} className="home">
      <div className="pet" style={{ width: "60%" }}>
        <ul>
          <li>Name: {pet.name}</li>
          <img src={pet.picture} alt="A picture of this pet" />
          <li>Description: {pet.description}</li>
          <li>Owner: {pet.owner}</li>
          <li>Specie: {pet.specie}</li>
          <li>Age: {pet.age}</li>
          <br />
          <Link to="/">
            <button>Back</button>
          </Link>
          {/* Edit Button */}
          <Link to={`/edit/${pet.id}`}>
            <button>Edit</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

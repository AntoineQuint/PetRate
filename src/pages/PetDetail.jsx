import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PetDetail(props) {
  const { petId } = useParams();
  const navigate = useNavigate();
  console.log(props)
  const pet = props.petArr.find((element) => {
    return element.key === petId;
  });
  useEffect(() => {
      if (!pet) {
        navigate("/");
      }
    }, [pet, navigate]);
  
    if (!pet) {
      return <div>Loading...</div>;
    }
  return (
    <div key={pet.key} className="home">
      <div className="pet" style={{ width: "60%" }}>
        <ul className="flexul">
          <li>Name: {pet.name}</li>
          <img src={pet.picture} alt="A picture of this pet" className="petImage"/>
          <li>Description: {pet.description}</li>
          <li>Owner: {pet.owner}</li>
          <li>Specie: {pet.specie}</li>
          <li>Age: {pet.age}</li>
          <li>Likes: {pet.likes}</li>
          <br />
          <Link to="/">
            <button>Back</button>
          </Link>
          {/* Edit Button */}
          <Link to={`/edit/${pet.key}`}>
            <button>Edit</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

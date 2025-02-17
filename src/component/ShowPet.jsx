import { Link } from "react-router-dom";
import "./ShowPet.css"
export default function ShowPets({petArr, callbackRemovePet}){
    return(
        <div id="pets">
            {petArr.map((element) => {
                return (
                <div className="pet" key={element.id}>
                    <ul>
                    <li><strong>Title: </strong> {element.name}</li>
                    <img src={element.picture} alt="A picture of this pet" />
                    <li><strong>Owner: </strong> {element.owner}</li>
                    <li><strong>Age: </strong> {element.age}</li>
                    <li><strong>Specie: </strong> {element.specie}</li>
                    <Link to={`/pets/${element.id}`}>
                        <button>Show Pet Detail</button>
                    </Link>
                    <button onClick={() => callbackRemovePet(element.id)}>
                        Delete
                    </button>
                    </ul>
                </div>
                );
            })}
        </div>
    )

}
import { Link } from "react-router-dom";
import "./ShowPet.css"
export default function ShowPets({ petArr, callbackRemovePet, callLikes }){
    return(
        <div id="pets">
            {petArr.map((element) => {
                return (
                <div className="pet" key={element.key}>
                    <ul>
                    <li><strong>Name: </strong> {element.name}</li>
                    <img src={element.picture} alt="A picture of this pet" />
                    <li><strong>Owner: </strong> {element.owner}</li>
                    <li><strong>Age: </strong> {element.age}</li>
                    <li><strong>Specie: </strong> {element.specie}</li>
                    <li><strong>Likes:</strong>{element.likes}</li>
                    <Link to={`/pets/${element.key}`}>
                        <button>Show Pet Detail</button>
                    </Link>
                    <button onClick={() => callbackRemovePet(element.key)}>
                        Delete
                    </button>
                    
                    <button onClick={() => callLikes(element.key)}>{element.likes}</button>
                    
                    </ul>
                </div>
                );
            })}
        </div>
    )

}
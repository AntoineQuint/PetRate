import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SearchBar = (props) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const filtered = query 
  ? props.petsArr.filter(item => 
      item.specie.toLowerCase().includes(query.toLowerCase())
    ) 
  : [];

  return (
    <div>
 <input 
  type="text" 
  placeholder="Search by species common name..." 
  value={query}
  onChange={handleSearchChange}
  style={{ width: "300px", height: "40px", fontSize: "16px" }}

  />
  
  <div id="pets">
    {filtered.length > 0 ? (
      filtered.map((element) => (
        <div className="pet" key={element.key}>
          <ul className="flexul">
            <li id="name"><strong>Name: </strong> {element.name}</li>
            <img 
              src={element.picture} 
              alt="A picture of this pet" 
              className="petImage" 
            />
            <li><strong>Owner: </strong> {element.owner}</li>
            <li><strong>Age: </strong> {element.age}</li>
            <li><strong>Specie: </strong> {element.specie}</li>
            <li><strong>Likes: </strong>{element.likes}</li>
            <Link to={`/pets/${element.key}`}>
              <button>Show Pet Detail</button>
            </Link>
            <button onClick={() => callbackRemovePet(element.key)}>
              Delete
            </button>
            <button onClick={() => callLikes(element.key)}>
              <img 
                src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/2764.svg" 
                alt="heart" 
                className="heart"
              />
            </button>
          </ul>
        </div>
      ))
    ) : (
      <div></div> 
    )}
  </div>
</div>

  )
};

export default SearchBar;

import { Link } from "react-router-dom";
export default function ErrorPage() {
    return (
      <div>
        <h1>No cute cats here</h1>
        <Link to="/">
          <button>There is definitely more pets here</button>
        </Link>
        
      </div>
    );
  }
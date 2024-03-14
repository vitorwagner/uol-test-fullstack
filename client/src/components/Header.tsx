import { Link } from 'react-router-dom';
import '../styles/components/header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>UOL Fullstack Test</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

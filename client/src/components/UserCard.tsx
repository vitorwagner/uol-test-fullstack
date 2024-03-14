import { Link } from 'react-router-dom';
import { User } from '../pages/Home';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.phone}</span>
      <span>{user.CPF}</span>
      <span>{user.status}</span>

        <Link to={`/update/${user.id}`}>
          <button>Editar</button>
        </Link>
    </div>
  );
};

export default UserCard;

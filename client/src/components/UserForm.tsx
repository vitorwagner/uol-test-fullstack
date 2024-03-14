interface UserFormProps {
  id?: number;
}

const UserForm: React.FC<UserFormProps> = ({ id }) => {
  return (
    <div>
      <h1>UserForm for User {id}</h1>
      <p>Welcome to the user form page</p>
    </div>
  );
};

export default UserForm;

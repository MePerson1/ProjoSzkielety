import User from "./User";
function Users(props) {
  const users = props.users;
  return (
    <>
      <h2>Lista Użytkowników:</h2>
      <ul>
        {" "}
        {users.map((user) => (
          <User key={user._id} value={user._id} user={user} />
        ))}{" "}
      </ul>{" "}
    </>
  );
}
export default Users;

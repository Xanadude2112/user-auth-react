import { UsersListItem } from "./UsersListsItem";
import "../styles/UsersList.scss";

export const UsersList = ({
  userArray,
  handleEditModal,
  getUserByIdFunction,
  deleteUser,
}) => {
  return (
    <div className="user-list">
      {userArray.map((user) => (
        <UsersListItem
          key={user.id}
          id={user.id}
          username={user.username}
          email={user.email}
          handleEditModal={handleEditModal}
          getUserByIdFunction={getUserByIdFunction}
          deleteUser={deleteUser}
        />
      ))}
    </div>
  );
};

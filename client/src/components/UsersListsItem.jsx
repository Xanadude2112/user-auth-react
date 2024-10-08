import "../styles/UsersListItems.scss";

export const UsersListItem = ({
  id,
  username,
  email,
  handleEditModal,
  getUserByIdFunction,
  deleteUser
}) => {
  return (
    <div className="user-list-item">
      <div className="item-title">
        <p>ID: {id}</p>
        <div className="icon-div">
          <i
            className="fa-solid fa-pencil edit-user"
            onClick={() => {
              handleEditModal();
              getUserByIdFunction(id);
            }}
          ></i>
          <i className="fa-solid fa-xmark delete-user" onClick={()=>deleteUser(id)}></i>
        </div>
      </div>
      <div className="item-content">
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

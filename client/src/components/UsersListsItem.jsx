import "../styles/UsersListItems.scss";

export const UsersListItem = ({ id, username, email, handleEditModal }) => {
  return (
    <div className="user-list-item">
      <div className="item-title">
        <p>ID: {id}</p>
        <div className="icon-div">
          <i className="fa-solid fa-pencil edit-user" onClick={handleEditModal}></i>
          <i className="fa-solid fa-xmark delete-user"></i>
        </div>
      </div>
      <div className="item-content">
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

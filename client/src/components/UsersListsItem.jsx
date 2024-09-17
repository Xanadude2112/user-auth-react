import "../styles/UsersListItems.scss";

export const UsersListItem = ({ id, username, email }) => {
  return (
    <div className="user-list-item">
      <div className="item-title"><p>ID: {id}</p><i className="fa-solid fa-xmark delete-user"></i></div>
      <div className="item-content">
        <p>Username: {username}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

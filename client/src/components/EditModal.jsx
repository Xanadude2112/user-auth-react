import lightning from "../assets/images/blue-lightning.png";
import "../styles/EditModal.scss";

export const EditModal = ({
  userID,
  userUsername,
  userEmail,
  userInfoFilterer,
  usernameBeingEdited,
  userEmailBeingEdited,
  setNewEmail,
  setNewUsername,
  editUser,
  handleEditModal,
}) => {
  return (
    <div className="modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="edit-title">
            EDIT {userInfoFilterer(userUsername, usernameBeingEdited)}
            <img className="modal-lightning" src={lightning} alt="" />
          </h2>
          <form onSubmit={editUser}>
            <div className="modal-inputs">
              <p className="input-top username">Username</p>
              <input
                type="text"
                name="username"
                value={userInfoFilterer(userUsername, usernameBeingEdited)}
              />
              <p className="input-top email">Email</p>
              <input
                type="email"
                name="email"
                value={userInfoFilterer(userEmail, userEmailBeingEdited)}
              />
            </div>
          </form>
          <div className="modal-interact-edit">
            <button className="btn cancel" onClick={handleEditModal}>
              Cancel
            </button>
            <button className="btn save" onClick={editUser}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

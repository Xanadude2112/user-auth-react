import lightning from "../assets/images/blue-lightning.png";
import "../styles/EditModal.scss";

export const EditModal = ({
  userID,
  userUsername,
  userEmail,
  newUsername,
  newEmail,
  setNewEmail,
  setNewUsername,
  editUser,
  handleEditModal,
  userIdBeingEdited,
  usernameBeingEdited,
  userEmailBeingEdited,
  userInfoFilterer
}) => {
  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="edit-title">
            EDIT {userInfoFilterer(userUsername, usernameBeingEdited)}
            <img className="modal-lightning" src={lightning} alt="" />
          </h2>
          <form onSubmit={editUser(userInfoFilterer(userID, userIdBeingEdited))}>
            <div className="modal-inputs">
              <p className="input-top username">Username</p>
              <input
                type="text"
                name="username"
                value={newUsername}
                onChange={handleUsernameChange}
              />
              <p className="input-top email">Email</p>
              <input
                type="email"
                name="email"
                value={newEmail}
                onChange={handleEmailChange}
              />
            </div>
          </form>
          <div className="modal-interact-edit">
            <button className="btn cancel" onClick={handleEditModal}>
              Cancel
            </button>
            <button className="btn save" onClick={()=>{
              editUser(userInfoFilterer(userID, userIdBeingEdited))
              handleEditModal()
            }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

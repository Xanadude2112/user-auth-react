import { useState } from "react";
import { UsersList } from "./UsersList";
import { EditModal } from "./EditModal";
import "../styles/ContentContainer.scss";
import lightning from "../assets/images/blue-lightning.png";
import neutron from "../assets/images/neutron.png";

export const ContentContainer = ({
  userArray,
  userIsLoggedIn,
  newUsername,
  newEmail,
  setNewEmail,
  setNewUsername,
  editUser,
  deleteUser
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userIdBeingEdited, setUserIdBeingEdited] = useState(null);
  const [usernameBeingEdited, setUsernameBeingEdited] = useState(null);
  const [userEmailBeingEdited, setUserEmailBeingEdited] = useState(null);
  const userID = userArray.map((user) => user.id);
  const userUsername = userArray.map((user) => user.username);
  const userEmail = userArray.map((user) => user.email);

  const userInfoFilterer = (info, desiredItem) => {
    return info.filter((item) => item === desiredItem);
  };

  const handleEditModal = () => {
    setIsEditing(!isEditing);
  };

  const getUserByIdFunction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserIdBeingEdited(data.id);
      setUsernameBeingEdited(data.username);
      setUserEmailBeingEdited(data.email);
      // Populate newUsername and newEmail with the current user's data
      setNewUsername(data.username);
      setNewEmail(data.email);
      console.log(`User with id ${id} is ${data.username}`);
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="content-container">
      {userIsLoggedIn === null ? (
        <div className="home-page-animations">
          <h2 className="content-title">WELCOME</h2>
          <div className="neutron-container">
            <img src={neutron} className="neutron" alt="Neutron" />
            <img
              src={lightning}
              className="blue-lightning"
              alt="Blue Lightning"
            />
          </div>
        </div>
      ) : (
        <>
          {isEditing && (
            <EditModal
              userID={userID}
              userUsername={userUsername}
              userEmail={userEmail}
              userInfoFilterer={userInfoFilterer}
              userIdBeingEdited={userIdBeingEdited}
              setUserIdBeingEdited={setUserIdBeingEdited}
              usernameBeingEdited={usernameBeingEdited}
              setUsernameBeingEdited={setUsernameBeingEdited}
              userEmailBeingEdited={userEmailBeingEdited}
              setUserEmailBeingEdited={setUserEmailBeingEdited}
              newUsername={newUsername}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              setNewUsername={setNewUsername}
              editUser={editUser}
              handleEditModal={handleEditModal}
            />
          )}
          <h2 className="content-title">USERS</h2>
          <UsersList
            userArray={userArray}
            handleEditModal={handleEditModal}
            getUserByIdFunction={getUserByIdFunction}
            deleteUser={deleteUser}
          />
        </>
      )}
    </div>
  );
};

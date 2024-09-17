import { UsersList } from "./UsersList";
import "../styles/ContentContainer.scss";
import lightning from "../assets/images/blue-lightning.png";
import neutron from "../assets/images/neutron.png";

export const ContentContainer = ({ userArray, userIsLoggedIn }) => {

  return (
    <div className="content-container">
      {userIsLoggedIn === null? (
        <div className="home-page-animations">
          <h2 className="content-title">WELCOME</h2>
          <div className="neutron-container">
            <img src={neutron} className="neutron" alt="Neutron" />
            <img src={lightning} className="blue-lightning" alt="Blue Lightning" />
          </div>
        </div>
      ) : (
        <>
          <h2 className="content-title">USERS</h2>
          <UsersList userArray={userArray} />
        </>
      )}
    </div>
  );
};

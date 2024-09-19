import "../styles/Navbar.scss";
import image from "../assets/images/blue-lightning.png";

export const Navbar = ({
  handleSignUpModal,
  handleLoginModal,
  userIsLoggedIn,
  handleLogout
}) => {
  return (
    <div className="navbar">
      <h1>
        USER
        <img className="lightning" src={image} />
        AUTH
      </h1>
        {userIsLoggedIn ? (
          <div className="user-access logged-in">
            <p className="welcome">Welcome, <span className="username">{userIsLoggedIn}</span>!</p>
            <button className="btn logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="user-access">
            <button className="btn sign-up" onClick={handleSignUpModal}>
              Sign Up
            </button>
            <p>|</p>
            <button className="btn login" onClick={handleLoginModal}>
              Login
            </button>
          </div>
        )}
    </div>
  );
};

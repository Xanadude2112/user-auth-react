import "../styles/LoginModal.scss";
import image from "../assets/images/blue-lightning.png";

export const LoginModal = ({
  handleLoginModal,
  handleSignUpModal,
  fetchLoggedInUser,
  userLoginInfo,
  setUserLoginInfo,
  setUserIsLoggedIn,
}) => {

  // This function is called when the user types in the input fields
  const handleLoginChange = (e) => {
    setUserLoginInfo({
      ...userLoginInfo,
      [e.target.name]: e.target.value,
    });

    //See SignUpModal.jsx for alternative method
  };

  // This function is called when the user clicks the login button
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchLoggedInUser(userLoginInfo); // No need to manually set the username here
      handleLoginModal();
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-close-container" onClick={handleLoginModal}>
            <i className="fa-solid fa-xmark close-modal"></i>
          </div>
          <h2 className="login-title">
            LOGIN <img src={image} className="modal-lightning" />
          </h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="modal-inputs">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
              />
            </div>
          </form>
          <div className="modal-interact">
            <button className="login-button" onClick={handleLoginSubmit}>Login</button>
            <p>
              Don't have an account?{" "}
              <span
                className="sign-up-here"
                onClick={() => {
                  handleLoginModal();
                  handleSignUpModal();
                }}
              >
                Sign Up here!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

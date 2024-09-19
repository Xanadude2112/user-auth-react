import { useState } from "react";
import "../styles/SignUpModal.scss";
import image from "../assets/images/blue-lightning.png";

export const SignUpModal = ({
  handleSignUpModal,
  handleLoginModal,
  registerUser,
  userSignupInfo,
  setUserSignupInfo,
  setUserIsLoggedIn,
}) => {
  const handleRegisterChange = (e) => {
    setUserSignupInfo({
      ...userSignupInfo,
      [e.target.name]: e.target.value,
    });
    console.log(userSignupInfo);
    // OR you can manually construct the object like this
    // const newUserInfo = {
    //   username: userSignupInfo.username,   // Copy current username
    //   email: userSignupInfo.email,         // Copy current email
    //   password: userSignupInfo.password,   // Copy current password
    //   [e.target.name]: e.target.value,     // Update the specific field being changed
    // };
    // setUserSignupInfo(newUserInfo);         // Set state with the new object
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault(); // Ensure form submission is prevented correctly
    try {
      if (
        !userSignupInfo.username ||
        !userSignupInfo.email ||
        !userSignupInfo.password
      ) {
        alert("Please fill in all fields");
        return;
      } else {
        registerUser(userSignupInfo); // Register the user
        handleSignUpModal(); // Close the modal
        setUserIsLoggedIn(userSignupInfo.username); // Set the logged in user
        console.log(
          `Successfully registered with ${userSignupInfo.username} to the database!`
        ); // Log the user info
      }
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-close-container" onClick={handleSignUpModal}>
            <i className="fa-solid fa-xmark close-modal"></i>
          </div>
          <h2 className="sign-up-title">
            SIGN UP <img src={image} className="modal-lightning" />
          </h2>
          <form onSubmit={handleSignUpSubmit}>
            <div className="modal-inputs">
              <input
                type="username"
                name="username"
                placeholder="Username"
                onChange={handleRegisterChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                name="confirm password"
                placeholder="Confirm Password"
              />
            </div>
          </form>
          <div className="modal-interact">
            <button className="sign-up-button" onClick={handleSignUpSubmit}>
              Sign Up
            </button>
            <p>
              Already have an account?
              <span
                className="login-here"
                onClick={() => {
                  handleLoginModal();
                  handleSignUpModal();
                }}
              >
                Login here!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

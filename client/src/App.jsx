import { useEffect, useState } from "react";
import "./styles/App.scss";
import { Navbar } from "./components/Navbar";
import { ContentContainer } from "./components/ContentContainer";
import { SignUpModal } from "./components/SignUpModal";
import { LoginModal } from "./components/LoginModal";

function App() {
  const [userArray, setUserArray] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(null); //Store the logged in user
  const [userSignupInfo, setUserSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });

  //HANDLE SIGN UP
  const registerUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUserArray((prevUserArray) => [...prevUserArray, data]); // Ensure userArray is updated correctly
      setUserIsLoggedIn(data.username); // Assuming you want to store the username
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }
  };

  //HANDLE LOGIN
  const fetchLoggedInUser = async (loginInfo) => {
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo), // Send login info (email and password)
      });

      if (!response.ok) {
        throw new Error("Login failed"); // Handle failed login
      }

      const data = await response.json();
      setUserIsLoggedIn(data.username); // Assuming you want to store the username
      console.log(`USER: ${data.username} IS LOGGED IN`); // Log the username
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  //HANDLE LOGOUT
  const handleLogout = async () => {
    setUserIsLoggedIn(null); // Reset the logged in user
  };

  //POPULATE HOME PAGE WITH USERS
  const fetchUsers = async () => {
    try {
      // fetch users from the server
      const response = await fetch("http://localhost:8080/users/");
      // convert the response to json data
      const data = await response.json();
      console.log(`ALL USERS ${data.users}`); //see user_routes.js line 27-33
      setUserArray(data.users);
    } catch (err) {
      console.log(`ERROR: ${err.message}, STATUS: ${err.status}`);
    }
  };

  // EDIT USER HANDLER
  const editUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userArray.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // send the new username and email to the server by converting it to JSON using the values of the newUsername and newEmail state
          body: JSON.stringify({
            username: newUsername,
            email: newEmail,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not OK ERROR: ", response.status);
      }

      const data = await response.json();

      //filter through the userArray and update the user with the matching id
      // map through the userArray instead of filtering through it so that we can update the user with the matching id and return the rest of the users as they are
      const newUserArray = userArray.map((user) => {
        // if the user id matches the id of the user we just updated, return the updated user
        if (user.id === data.id) {
          return data;
        }
        return user;
      });

      // once the user is updated, update the state of the userArray with the newUserArray instead of using a fetch request to get all users again (will eventually overload the server)
      setUserArray(newUserArray);
    } catch (err) {
      console.error(`ERROR: ${err.status}, ERROR MESSAGE: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSignUpModal = () => {
    setSignUpModal(!signUpModal);
  };

  const handleLoginModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <div>
      {signUpModal && (
        <SignUpModal
          handleSignUpModal={handleSignUpModal}
          handleLoginModal={handleLoginModal}
          registerUser={registerUser}
          userSignupInfo={userSignupInfo}
          setUserSignupInfo={setUserSignupInfo}
          setUserIsLoggedIn={setUserIsLoggedIn}
        />
      )}
      {loginModal && (
        <LoginModal
          handleSignUpModal={handleSignUpModal}
          handleLoginModal={handleLoginModal}
          fetchLoggedInUser={fetchLoggedInUser}
          userLoginInfo={userLoginInfo}
          setUserLoginInfo={setUserLoginInfo}
          setUserIsLoggedIn={setUserIsLoggedIn}
        />
      )}
      <Navbar
        userArray={userArray}
        handleSignUpModal={handleSignUpModal}
        handleLoginModal={handleLoginModal}
        userIsLoggedIn={userIsLoggedIn}
        handleLogout={handleLogout}
      />
      <ContentContainer
        userArray={userArray}
        userIsLoggedIn={userIsLoggedIn}
        setNewEmail={setNewEmail}
        setNewUsername={setNewUsername}
        editUser={editUser}
      />
    </div>
  );
}

export default App;

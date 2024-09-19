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
  const [userIdIsLoggedIn, setUserIdIsLoggedIn] = useState(null); //Store the logged in user's id
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
      if (!newUser.username || !newUser.email || !newUser.password) {
        alert("Please fill in all fields");
        return;
      } else {
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
        setUserIdIsLoggedIn(data.id); // Assuming you want to store the user id
      }
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }
  };

  //HANDLE LOGIN
  const fetchLoggedInUser = async (loginInfo) => {
    try {
      if (!loginInfo.email || !loginInfo.password) {
        alert("Please fill in all fields");
        return;
      } else {
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
        setUserIdIsLoggedIn(data.id); // Assuming you want to store the user id
        setUserIsLoggedIn(data.username); // Assuming you want to store the username
        console.log(`USER: ${data.username} IS LOGGED IN`); // Log the username
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  //HANDLE LOGOUT
  const handleLogout = async () => {
    setUserIdIsLoggedIn(null); // Reset the logged in user's id
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
  const editUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // send the new username and email to the server by converting it to JSON using the values of the newUsername and newEmail state
        body: JSON.stringify({
          username: newUsername,
          email: newEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not OK ERROR: ", response.status);
      }

      const data = await response.json();
      //filter through the userArray and update the user with the matching id
      // map through the userArray instead of filtering through it so that we can update the user with the matching id and return the rest of the users as they are
      const newUserArray = userArray.map((user) => {
        // this is to make sure the username of the logged in user is
        // updated and doesnt change to a different user when you edit another user
        if (userIdIsLoggedIn === data.id) {
          setUserIsLoggedIn(data.username);
        }
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

  // DELETE USER HANDLER
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // No need to parse the response JSON if it only returns a success message
      // Filter out the user directly using the `id` passed into the function
      const newUserArray = userArray.filter((user) => user.id !== id);
      setUserArray(newUserArray);

      // if the user being deleted is the logged in user, log them out (setUserIsLoggedIn to null)
      if (userIdIsLoggedIn === id) {
        setUserIsLoggedIn(null);
      }

      console.log(`Deleted user with id: ${id}`);
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
    }
  };

  // this is meant to act as a refresh button to get all users again after changes have been made
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
        newUsername={newUsername}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        setNewUsername={setNewUsername}
        editUser={editUser}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;

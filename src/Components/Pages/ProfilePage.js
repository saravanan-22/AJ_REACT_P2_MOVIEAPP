import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { db, auth } from "../../Config/firebase-config"; // Assuming you have 'auth' from Firebase Authentication
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "react-bootstrap";
import "./Profile.css";

const ProfilePage = () => {
  const [uid, setUid] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [update, setUpdate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const uidFromLocalStorage = localStorage.getItem("uid");
    setUid(uidFromLocalStorage);

    const userRef = ref(db, "users/" + uidFromLocalStorage);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserProfile(userData);
      setEditedUsername(userData.username ? userData.username : "loading");
      setEditedEmail(userData.email);
      setEditedPassword(userData.password);
      setEditedPhoneNumber(userData.phoneNumber);
      setProfilePicture(userData.profilePhoto);
    });
  }, [uid]);

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const isUsernameValid = (username) => {
    return username.length >= 2;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!isPasswordValid(editedPassword)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (editedPhoneNumber.length < 10) {
      setPhoneNumberError(true);
      return;
    } else {
      setPhoneNumberError(false);
    }

    if (!isEmailValid(editedEmail)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!isUsernameValid(editedUsername)) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    set(ref(db, `users/${uid}`), {
      ...userProfile,
      username: editedUsername,
      email: editedEmail,
      password: editedPassword,
      phoneNumber: editedPhoneNumber,
      profilePhoto: update,
    });



    setUserProfile((prevProfile) => ({
      ...prevProfile,
      username: editedUsername,
      email: editedEmail,
      password: editedPassword,
      phoneNumber: editedPhoneNumber,
      profilePhoto: update,
    }));

    alert("Profile updated successfully");
  };

  const handleDeleteUser = () => {
    const userRef = ref(db, `users/${uid}`);
    remove(userRef)
      .then((res) => {
       alert("User data deleted successfully.");

        const user = auth.currentUser;
        user
          .delete()
          .then(() => {
            alert("User account deleted successfully.");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error deleting user account:", error);
          });
      })
      .catch((err) => console.error("Error deleting user data:", err));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the image data to Base64 encoding
        const base64String = reader.result.split(",")[1];
        setUpdate(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  // localStorage.setItem("userProfilePhoto", profilePicture)
  // localStorage.setItem("movieAppUserName" ,editedUsername)
  return (
    <div
      style={{
        color: "white",
        paddingTop: "5em",
        backgroundColor: "black",
        width: "fitContent",
        paddingBottom: "1em",
      }}
    >
      {userProfile ? (
        <div>
          <Card style={{ width: "25rem", margin: "auto", marginTop: "1em" }}>
            <Card.Body>
              <Card.Title>
                <h4 style={{ textAlign: "center" }}>User Details</h4>
                <hr/>
              </Card.Title>
              <div>
                <Form onSubmit={handleEditSubmit}>
                  <img
                    src={`data:image/jpeg;base64,${profilePicture}`}
                    alt="Profile"
                    className="profile-image-preview"
                    style={{
                      width: "150px",
                      height: "120px",
                      marginTop: "0.5em",
                      marginBottom: "1em",
                     
                    }}
                  />
                  <label
                    htmlFor="profileImageInput"
                    className="custom-file-upload"
                  >
                    | Update Profile Picture | Click here!
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="profileImageInput"
                    onChange={handleImageUpload}
                    className="hidden-file-input"
                  />
                  <Form.Group controlId="editedUsername">
                    <Form.Label
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      required
                    />
                    {usernameError && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        Username must be at least 2 characters long.
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="editedEmail">
                    <Form.Label
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      required
                    />
                    {emailError && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        Invalid email format.
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="editedPassword">
                    <Form.Label
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={editedPassword}
                      onChange={(e) => setEditedPassword(e.target.value)}
                      required
                    />
                    {passwordError && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        Password must be at least 6 characters long.
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group controlId="editedPhoneNumber">
                    <Form.Label
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={editedPhoneNumber}
                      onChange={(e) => setEditedPhoneNumber(e.target.value)}
                      required
                    />
                    {phoneNumberError && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.875rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        Phone number must be at least 10 digits.
                      </p>
                    )}
                  </Form.Group>
                  <Button type="submit" variant="success" className="my-2">
                    Save Changes
                  </Button>
                </Form>
              </div>
              <Link to={"/"}>
                <Button variant="outline-danger">Logout</Button>
              </Link>
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={handleDeleteUser}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading user profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;

import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { db } from "../../Config/firebase-config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const [uid, setUid] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    const uidFromLocalStorage = localStorage.getItem("uid");
    setUid(uidFromLocalStorage);

    const userRef = ref(db, "users/" + uidFromLocalStorage);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserProfile(userData);
      setEditedUsername(userData.username);
      setEditedEmail(userData.email);
      setEditedPassword(userData.password);
      setEditedPhoneNumber(userData.phoneNumber);
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

    if (editing) {
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
      });

      setUserProfile((prevProfile) => ({
        ...prevProfile,
        username: editedUsername,
        email: editedEmail,
        password: editedPassword,
        phoneNumber: editedPhoneNumber,
      }));

      alert("Profile updated successfully");
      setEditing(false);
    } else {
      setEditing(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowProfile(true);
    }, 500);
  }, []);

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
          <Card style={{ width: "20rem", margin: "auto" }}>
            <AccountCircleIcon style={{ width: "100%", fontSize: "20em" }} />
            <Card.Body>
              <Card.Title>
                <h4 style={{ textAlign: "center" }}>User Details</h4>
              </Card.Title>
              {editing ? (
                <div>
                  <Form onSubmit={handleEditSubmit}>
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
              ) : (
                <Card.Text>{}</Card.Text>
              )}
              <Button
                variant={editing ? "outline-danger" : "outline-primary"}
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel Edit" : "Edit Profile"}
              </Button>
              <Link to={"/"}>
                <Button variant="outline-danger" className="ms-2">
                  Logout
                </Button>
              </Link>
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
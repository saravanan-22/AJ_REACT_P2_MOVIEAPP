import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Config/firebase-config";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { img_300, noPicture } from "../Context/Context";
import image from "./image/background.jpg";
import HomePage from "./HomePage";
import Modal from "react-bootstrap/Modal";
import { FaNotesMedical } from "react-icons/fa6";
import "./HomePage.css"

export const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uid, setUid] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credentials.user;
      const uid = user.uid;
      setUid(uid);
      set(ref(db, "users/" + uid), {
        username: userName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        profilePhoto: profilePhoto,
      });
      alert("Account Created Successfully");
      alert("Please! Close the registerPage and Login your new account")
      handleClose()
      navigate("/");
      
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        );
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <Button variant="primary" className="glow-on-hover" onClick={handleShow}>
      <FaNotesMedical />   Create New Account
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <section>
            <Card className="register-card">
              <Card.Body>
                <Card.Title className="text-center">
                  Register Your Account Here : )
                </Card.Title>
                <hr />
                <Card.Text>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group
                      className="mb-1"
                      controlId="validationCustomUsername"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-1"
                      controlId="validationCustomEmail"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-1"
                      controlId="validationCustomPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-1"
                      controlId="validationCustomConfirmPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please confirm your password.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-1"
                      controlId="validationCustomPhone"
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid phone number.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <span className="mb-2">
                      Add Profile Picture
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </span>

                    <Button
                      type="submit"
                      variant="outline-success"
                      className="register-button"
                    >
                      Sign up
                    </Button>
                  </Form>
                </Card.Text>
                <hr />
              </Card.Body>
            </Card>
          </section>
        </Modal.Header>
      </Modal>
    </div>
  );
};

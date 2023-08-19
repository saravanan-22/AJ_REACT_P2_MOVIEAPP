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
      });

      if (profilePhoto) {
        const profilePhotoUrl = "YOUR_PROFILE_PHOTO_URL";
        set(ref(db, "users/" + uid + "/profilePhoto"), profilePhotoUrl);
      }
      alert("Account Created Successfully");
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
    <div className="register-page bg-black">
      <section>
        <Card className="register-card">
          <Card.Body>
            <Card.Title className="text-center">
              Register Your Account Here : )
            </Card.Title>
            <hr />
            <Card.Text>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
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

                <Form.Group className="mb-1" controlId="validationCustomEmail">
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

                <Form.Group className="mb-1" controlId="validationCustomPhone">
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

                <Form.Group className="mb-3" controlId="validationCustomPhoto">
                  <Form.Label>Profile Photo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setProfilePhoto(e.target.files[0])}
                  />
                </Form.Group>

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
            <p className="p-0 m-0 text-center">
              Have an account? <Link to="/">Login</Link>
            </p>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

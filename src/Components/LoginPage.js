import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebase-config";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaAnglesRight, FaFortAwesome } from "react-icons/fa6";
import "./LoginPage.css";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserUid, setLoginUserUid] = useState("");
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credentials.user;
      const uid = user.uid;
      setLoginUserUid(uid);
      alert("Login completed ");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      navigate(`/Movies`);
      localStorage.setItem("uid", uid);
    } catch (error) {
      alert(error.message);
    }
  };

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  //       );
  //       setMovies(data.results);
  //     } catch (error) {
  //       console.error("Error fetching movie data:", error);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  const setDefaultValues = (e) => {
    e.preventDefault();
    setEmail("saravanan@gmail.com");
    setPassword("1234567");
    console.log("Default values set");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Button variant="outline-warning" onClick={handleShow}>
        <FaAnglesRight /> Login
      </Button>

      <Modal show={show} onHide={handleClose} className="login-modal">
        <section>
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="text-center underline-text">
                Login Your Account
              </Card.Title>
              <hr />
              <Card.Text>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="validationCustomUsername"
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
                    className="mb-3"
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
                  <Link to={"/ForgotPassword"} className="ms-4">
                    Forgot password
                  </Link>
                  <div className="wrapper d-grid gap-2">
                    <Button type="submit" variant="outline-success">
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Text>
              <hr />
            </Card.Body>
            <h6 className="m-auto">
              user credentials!{" "}
              <Button
                className="pulse-button"
                style={{ textDecoration: "underline" }}
                onClick={setDefaultValues}
              >
                Login
              </Button>
            </h6>
            <Link>
              <Button
                className="ms-3 mb-2"
                variant="warning"
                show={show}
                onClick={handleClose}
              >
                Home <FaFortAwesome />
              </Button>
            </Link>
          </Card>
        </section>
      </Modal>
    </div>
  );
};

export default LoginPage;

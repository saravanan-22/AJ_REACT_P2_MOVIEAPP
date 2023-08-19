import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/firebase-config";
import axios from "axios";
import { img_300, noPicture } from "../Context/Context";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserUid, setLoginUserUid] = useState("");
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
      navigate(`/profilePage`);
      localStorage.setItem("uid", uid);
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
    <div
      style={{ minHeight: "100vh", position: "relative" }}
      className="login_main bg-black"
    >
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Link to={"/ForgotPassword"} className="ms-4">
                  Forgot password
                </Link>
                <div className="wrapper">
                  <Button
                    type="submit"
                    variant="outline-success"
                    className="login-button"
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Text>
            <hr />
            <p className="p-0 m-0 text-center">
              Don't have an account? <Link to="/RegisterPage">Sign up</Link>
            </p>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
};

export default LoginPage;

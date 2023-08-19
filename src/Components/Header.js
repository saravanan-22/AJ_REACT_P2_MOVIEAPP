import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import image from "./image/logo.png";
import Movies from "../Components/Pages/Movies"; // Assuming you have a Movies component
import Trending from "./Pages/Trending";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import useLocation
import TopRated from "./Pages/TopRated";
import NowPlaying from "./Pages/NowPlaying";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import TvIcon from "@mui/icons-material/Tv";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("ProfilePage");
  };

  const isHeaderHidden = () => {
    return (
      location.pathname === "/" ||
      location.pathname === "/LoginPage" ||
      location.pathname === "/RegisterPage" ||
      location.pathname === "/ForgotPassword"
    );
  };

  // Return null if header is hidden
  if (isHeaderHidden()) {
    return null;
  }

  return (
    <div>
      <Navbar
        onClick={() => window.scroll(0, 0)}
        expand="lg"
        className="bg-black mb-3 position-fixed w-100"
        style={{ zIndex: 100 }}
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={image} alt="logo" style={{ width: "150px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
              <div className="d-flex mx-auto"></div>
              <Nav className="categories justify-content-end flex-grow-1">
                {/* Add the "selected" class to the active category */}
                <Link to={"/Movies"}>
                  <Button
                    variant="outline-light"
                    className={
                      location.pathname === "/Movies" ? "selected" : ""
                    }
                  >
                    <MovieCreationIcon className="header-btn" />
                    <span className="header-btn"> All Movies</span>
                  </Button>
                </Link>
                <Link to={"/TopRated"}>
                  <Button
                    variant="outline-light"
                    className={
                      location.pathname === "/TopRated" ? "selected" : ""
                    }
                  >
                    <StarHalfIcon className="header-btn" />
                    <span className="header-btn">Top Rated</span>
                  </Button>
                </Link>
                <Link to={"/Trending"}>
                  <Button
                    variant="outline-light"
                    className={
                      location.pathname === "/Trending" ? "selected" : ""
                    }
                  >
                    <WhatshotIcon className="header-btn" />
                    <span className="header-btn">Trending</span>
                  </Button>
                </Link>

                <Link to={"/NowPlaying"}>
                  <Button
                    variant="outline-light"
                    className={
                      location.pathname === "/NowPlaying" ? "selected" : ""
                    }
                  >
                    <LiveTvIcon className="header-btn" />
                    <span className="header-btn"> Now Playing</span>
                  </Button>
                </Link>
                {/* <Link to={"/TvSeries"}>
                  <Button
                    variant="outline-light"
                    className={
                      location.pathname === "/NowPlaying" ? "selected" : ""
                    }
                  >
                    <TvIcon />
                    <span> Tv Series</span>
                  </Button>
                </Link> */}
                <Button variant="outline-light" onClick={handleLogout}>
                  <AccountCircleIcon className="header-btn" />
                  <span className="header-btn"> Profile</span>
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaAmazon,
  FaInstagram,
  FaImdb,
  FaMeta,
  FaSpotify,
  FaSquareTwitter,
  FaSquareWhatsapp,
  FaTelegram,
  FaAnglesRight,
  FaClapperboard,
  FaNotesMedical
} from "react-icons/fa6";
import "./HomePage.css";


const HomePage = () => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/LoginPage");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header>
        <Container>
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1>Movie App</h1>
            <Button onClick={handleLogIn} variant="outline-warning">
              <FaAnglesRight /> Login
            </Button>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Container>
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Title>Welcome to the Movie App</Card.Title>
              <Card.Text>
                Explore the latest movies, discover new favorites, and stay up
                to date with the movie world.
              </Card.Text>
              <Link to={"https://www.imdb.com/"}>
                <Button variant="outline-warning">
                  Learn more <FaImdb />
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </main>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "8rem",
        }}
      >
        <section>
          <Link to={"https://in.bookmyshow.com/"}>
            {" "}
            <Button variant="warning">
              <FaClapperboard /> BooK Tickets Now
            </Button>
          </Link>
        </section>
        <section>
          <Link to={"/RegisterPage"}>
            <Button className="glow-on-hover"><FaNotesMedical/> Create New Account</Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#333",
          padding: "20px 0",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <Container>
          <div className="text-center">
            <section style={{ marginBottom: "1em" }}>
              <div className="icon-container">
                <Link
                  to={
                    "https://www.amazon.in/s?k=movie&crid=2DWKRWPOJTI3N&sprefix=movi%2Caps%2C341&ref=nb_sb_ss_ts-doa-p_2_4"
                  }
                >
                  <FaAmazon style={{ marginRight: "0.5em" }} />
                </Link>
                <Link to={"https://www.instagram.com/"}>
                  {" "}
                  <FaInstagram style={{ marginRight: "0.5em" }} />
                </Link>
                <Link
                  to={
                    "https://www.facebook.com/campaign/landing.php?&campaign_id=15316858002&extra_1=s%7Cc%7C563139538220%7Cb%7Cfacebool%7C&placement=&creative=563139538220&keyword=facebool&partner_id=googlesem&extra_2=campaignid%3D15316858002%26adgroupid%3D130780223515%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-1373821049%26loc_physical_ms%3D9302563%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQjwmICoBhDxARIsABXkXlI6K7nmOrlRI6wrr8vDzZGwE_GpFwz38J31fAOcarrC99KfS0GL2V8aAimzEALw_wcB"
                  }
                >
                  {" "}
                  <FaMeta style={{ marginRight: "0.5em" }} />
                </Link>
                <Link to={"https://open.spotify.com/"}>
                  {" "}
                  <FaSpotify style={{ marginRight: "0.5em" }} />
                </Link>
                <Link
                  to={
                    "https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D"
                  }
                >
                  {" "}
                  <FaSquareTwitter style={{ marginRight: "0.5em" }} />
                </Link>
                <Link to={"https://www.whatsapp.com/join"}>
                  <FaSquareWhatsapp style={{ marginRight: "0.5em" }} />
                </Link>
                <Link to={"https://web.telegram.org/k/"}>
                  {" "}
                  <FaTelegram style={{ marginRight: "0.5em" }} />
                </Link>
              </div>
            </section>
            <p className="m-0 p-0">
              &copy; {new Date().getFullYear()} Movie App
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;

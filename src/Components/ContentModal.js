import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { img_500, unavailable, unavailableLandscape } from "../Context/Context";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "./Carousal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "fitContent",
  bgcolor: "black",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ContentModal = ({ children, media_type, id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setContent(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      console.log(data);
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      <div
        style={{ cursor: "pointer", textAlign: "center" }}
        color="inherit"
        onClick={handleOpen}
        className="media"
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="ContentModal">
              <img
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "opacity 0.3s ease-in-out", // Add fade-in transition for the backdrop image
                }}
                src={
                  content?.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={(content && (content.name || content.title)) || "Backdrop"}
                className="ContentModal__landscape"
              />
              <div
                style={{
                  display: "flex",
                  padding: "10px",
                  alignItems: "center", // Align content vertically center
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                <img
                  style={{
                    width: "200px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  src={
                    content?.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={
                    (content && (content.name || content.title)) ||
                    "Movie Poster"
                  }
                  className="ContentModal__portrait"
                />

                <div
                  className="ContentModal__about"
                  style={{ marginLeft: "20px" }}
                >
                  <span
                    style={{
                      color: " rgb(4, 99, 128)",
                      textDecoration: "underline",
                      fontSize: "24px",
                      fontWeight: "bold",
                      // marginBottom: "10px",
                    }}
                    className="ContentModal__title"
                  >
                    {content?.name || content?.title || "Title Not Available"} (
                    {(
                      content?.first_air_date ||
                      content?.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  <br />
                  {content?.tagline && (
                    <i
                      style={{
                        color: "white",
                        // fontSize: "16px",
                        fontStyle: "italic",
                        // marginBottom: "10px",
                      }}
                    >
                      {content.tagline}
                    </i>
                  )}

                  <span
                    style={{
                      color: "white",
                      // fontSize: "18px",
                      // marginBottom: "20px",
                    }}
                    className="ContentModal__description"
                  >
                    {content?.overview || "Description Not Available"}
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                startIcon={<YouTubeIcon />}
                color="secondary"
                target="__blank"
                href={`https://www.youtube.com/watch?v=${video}`}
                style={{
                  marginBottom: "10px",
                  transition: "opacity 0.3s ease-in-out",
                }} // Add fade-in transition for the button
              >
                Watch the Trailer
              </Button>
              <div
                style={{
                  margin: "10px 0",
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                {" "}
                {/* Add fade-in transition for the carousel */}
                <Carousel
                  media_type={media_type}
                  id={id}
                  itemPadding="5px" // Add padding between carousel images
                />
              </div>
            </div>
            <Button // Close button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
                transition: "opacity 0.3s ease-in-out",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ContentModal;

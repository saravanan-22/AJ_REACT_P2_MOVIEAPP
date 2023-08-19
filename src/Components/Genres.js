import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Genres = ({ selectedGenres, setSelectedGenres, type, setPage }) => {
  const [genres, setGenres] = useState([]);

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      // Cleanup function: here component did unmount.....
      setGenres([]);
    };
  }, []);

  return (
    <div
      style={{
        padding: "10px 10px",
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        background: "black",
        margin: "0 1em",
      }}
    >
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{
              fontWeight: "bolder",
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
              border: "1px solid red",
              "&:hover": {
                border: "1px solid #ff9800", // Change the border color on hover
                background: "#ff9800", // Change the background color on hover
              },
            }}
            size="small"
            color="primary"
            clickable
            onDelete={() => handleRemove(genre)}
            variant="outlined"
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            style={{
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
              border: "1px solid rgb(4, 99, 128)",
              "&:hover": {
                border: "1px solid #ff9800", // Change the border color on hover
                background: "#ff9800", // Change the background color on hover
              },
            }}
            size="small"
            clickable
            onClick={() => handleAdd(genre)}
            variant="outlined"
          />
        ))}
    </div>
  );
};

export default Genres;

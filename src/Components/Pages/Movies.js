import React, { useState, useEffect } from "react";
import Axios from "axios";
import UseGenres from "../../hooks/UseGenres";
import Genres from "../Genres";
import CustomPagination from "../CustomPagination";
import SingleProduct from "../SingleProduct";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchText, setSearchText] = useState(""); // New state for search text

  const genreforURL = UseGenres(selectedGenres);

  const fetchMovies = async () => {
    try {
      let url = "";
      if (searchText) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=${searchText}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreforURL}`;
      }
      const { data } = await Axios.get(url);
      // console.log(data);
      setContent(data.results);
      setNumOfPages(Math.min(data.total_pages, 500));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset page number when initiating a new search
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL, searchText]);

  return (
    <div
      style={{ paddingTop: "4em", backgroundColor: "black" }}
      className="container-fluid"
    >
      <span className="pageTitle"></span>
      {/* Search input */}
      <ThemeProvider theme={createTheme({ palette: { type: "dark" } })}>
        <div
          style={{
            display: "flex",
            margin: "0.5em 1em",
          }}
          className="bg-secondary"
        >
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            id="outlined-textarea"
            label="Search movies..."
            variant="filled"
            placeholder="Placeholder"
            value={searchText}
            multiline
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </div>
      </ThemeProvider>

      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <br />

      <div className="movies">
        {content.length === 0 ? (
          <h2>No movies found.</h2>
        ) : (
          content.map((c) => (
            <SingleProduct
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))
        )}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;

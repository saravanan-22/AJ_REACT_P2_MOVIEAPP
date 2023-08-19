import { Pagination, createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .Mui-selected": {
            color: "white",
          },
          "& .MuiPaginationItem-page": {
            color: "rgb(4, 99, 128)",
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <ThemeProvider theme={theme}>
        <Pagination
          color="primary"
          variant="outlined"
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;

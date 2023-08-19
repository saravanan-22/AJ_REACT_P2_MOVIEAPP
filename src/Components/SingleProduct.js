import React from "react";
import { img_300, unavailable } from "../Context/Context";
import { Badge } from "@mui/material";
import ContentModal from "./ContentModal";

const SingleProduct = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <div className="title-wrapper">
        <div className="title">{title}</div>
        <div className="media-info">
          {media_type === "tv" ? "TV Series" : "Movie"} | {date}
        </div>
      </div>
    </ContentModal>
  );
};

export default SingleProduct;

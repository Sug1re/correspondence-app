"use client";

import React from "react";
import { Box, Link } from "@mui/material";

type SchoolImageProps = {
  url: string;
  imgUrl: string;
  name: string;
};

const SchoolImage: React.FC<SchoolImageProps> = ({ url, imgUrl, name }) => {
  return (
    <>
      {/* 学校の画像 */}
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <Box
          component="img"
          src={`/imgSchool/${imgUrl}`}
          alt={name}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </Link>
    </>
  );
};

export default SchoolImage;

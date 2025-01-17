import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Box, Container, Typography } from "@mui/material";
import * as Component from "@/components/component";

export default async function Home() {
  //データベースからデータを取得する。
  // const schoolsData = await getDocs(collection(db, "schools")).then(
  //   (snapshot) =>
  //     snapshot.docs.map((doc) => {
  //       return doc.data();
  //     })
  // );

  return (
    <>
      <Component.Header />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex-col",
            justifyContent: "center", // 水平中央
            alignItems: "center", // 垂直中央
            height: "100vh", // 画面全体の高さ
          }}
        >
          {/* <Box sx={{ my: 4 }}>
            {schoolsData.map((schoolData, index) => (
              <Box key={index}>
                <Typography>{schoolData.name}</Typography>
                <Typography>学費:{schoolData.tuition}万円</Typography>
              </Box>
            ))}
          </Box> */}
          <Component.Form />
        </Box>
      </Container>
    </>
  );
}

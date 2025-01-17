"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import * as Component from "@/components/component";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

// const SearchResultPage = async () => {
//   //データベースからデータを取得する。
//   const schoolsData = await getDocs(collection(db, "schools")).then(
//     (snapshot) =>
//       snapshot.docs.map((doc) => {
//         return doc.data();
//       })
//   );

//   return (
//     <>
//       <Component.Header />

//       <Container maxWidth="sm">
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h4" component="h2">
//             検索結果
//           </Typography>

//           {/* <Typography variant="body1">データを読み込み中...</Typography> */}
//           {schoolsData.length > 0 ? (
//             schoolsData.map((school, index) => (
//               <Card key={index} sx={{ my: 2 }}>
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     {school.name}
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     学費:年間約{school.tuition}万円
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small">詳細を見る</Button>
//                 </CardActions>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="body1">
//               条件に一致する学校が見つかりませんでした。
//             </Typography>
//           )}
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default SearchResultPage;

const SearchResultPage = () => {
  //データベースからデータを取得する。
  // const schoolsData = await getDocs(collection(db, "schools")).then(
  //   (snapshot) =>
  //     snapshot.docs.map((doc) => {
  //       return doc.data();
  //     })
  // );

  const searchParams = useSearchParams();
  const tuition = searchParams.get("tuition"); // クエリパラメータ ”tuition” を獲得
  return (
    <>
      <Component.Header />

      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            検索結果
          </Typography>
          {/* {schoolsData.length > 0 ? (
            schoolsData.map((school, index) => (
              <Card key={index} sx={{ my: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {school.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    学費:年間約{school.tuition}万円
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">詳細を見る</Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1">
              条件に一致する学校が見つかりませんでした。
            </Typography>
          )} */}

          <Card sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                学校名
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                学費:年間約{tuition || "指定なし"}万円
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">詳細を見る</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default SearchResultPage;

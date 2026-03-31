import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import { HomeSection } from "@/components/Sections/HomeSection";
import { Breadcrumb } from "@/components/Breadcrumbs";

export default function Home() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2}>
          <Suspense fallback={<Loading />}>
            <HomeSection />
          </Suspense>
        </Stack>
      </Container>
    </>
  );
}

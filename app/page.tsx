import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import { TargetButton } from "@/components/Buttons/TargetButton";

export default function Home() {
  return (
    <>
      <Header />

      <Container maxWidth="md">
        <Stack spacing={4} sx={{ mt: 4 }}>
          <TargetButton />
        </Stack>
      </Container>

      <XsWrapper when={true}>
        <Footer />
      </XsWrapper>
    </>
  );
}

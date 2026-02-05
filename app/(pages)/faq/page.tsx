import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import { Breadcrumb } from "@/components/Breadcrumbs";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { FaqSection } from "@/components/Sections/FaqSection";

export default function FaqPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={4}>
          <FaqSection />
        </Stack>
      </Container>

      <ScrollToTopButton />

      <XsWrapper when={true}>
        <Footer />
      </XsWrapper>
    </>
  );
}

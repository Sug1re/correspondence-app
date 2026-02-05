import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { XsWrapper } from "@/components/Wrapper/xsWrapper";
import { Breadcrumb } from "@/components/Breadcrumbs";
import ScrollToTopButton from "@/components/Buttons/ScrollTopButton";
import { BookmarksSection } from "@/components/Sections/BookmarksSection";
import { BaseHeading } from "@/components/Base/BaseHeading";

export default function BookmarksPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2}>
          <BaseHeading title="お気に入り学校一覧" />

          <BookmarksSection />
        </Stack>
      </Container>

      <ScrollToTopButton />

      <XsWrapper when={true}>
        <Footer />
      </XsWrapper>
    </>
  );
}

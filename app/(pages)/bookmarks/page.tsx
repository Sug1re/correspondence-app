import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumbs";
import { BookmarksSection } from "@/components/Sections/BookmarksSection";
import { BaseHeading } from "@/components/Base/BaseHeading";

export default function BookmarksPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={4}>
          <BaseHeading title="ブックマーク一覧" />

          <BookmarksSection />
        </Stack>
      </Container>
    </>
  );
}

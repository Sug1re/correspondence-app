import { Container, Stack } from "@mui/material";
import Header from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/Sections/FaqSection";

export default function FaqPage() {
  return (
    <>
      <Header />

      <Breadcrumb />

      <Container maxWidth="md">
        <Stack spacing={2} sx={{ pb: 6 }}>
          <FaqSection />
        </Stack>
      </Container>
    </>
  );
}

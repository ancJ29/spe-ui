import useMetadata from "@/hooks/useMetadata";
import { Header } from "@/ui/Header";
import { Box, Container, Space } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { Footer } from "../top-page";
import TermsServiceWrapper from "@/ui/TabsPolicy";
import PdfViewer from "../terms-service-conditions/PdfViewer";

export default function Page() {
  const location = useLocation();
  const { data } = useMetadata();
  return (
    <>
      <Header metadata={data} />
      <Container>
        <Space my={"xl"} />
        <TermsServiceWrapper />
        <PdfViewer url="./docs/Risk_Disclosure_Statement_en.pdf" />
      </Container>
      {data && <Footer metadata={data} />}
    </>
  );
}

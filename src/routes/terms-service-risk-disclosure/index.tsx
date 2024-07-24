import useMetadata from "@/hooks/useMetadata";
import { Header } from "@/ui/Header";
import TermsServiceWrapper from "@/ui/TabsPolicy";
import { Container, Space } from "@mantine/core";
import PdfViewer from "../terms-service-conditions/PdfViewer";
import { Footer } from "../top-page";

export default function Page() {
  const { data } = useMetadata();
  return (
    <>
      <Header metadata={data} />
      <Container>
        <Space my={"xl"} />
        <TermsServiceWrapper />
        <PdfViewer url="./docs/Risk_Disclosure_Statement_en.pdf" />
      </Container>
      <Footer metadata={data} />
    </>
  );
}

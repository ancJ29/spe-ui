import TermsServiceWrapper from "@/ui/TabsPolicy";
import { Container, Space } from "@mantine/core";
import PdfViewer from "../terms-service-conditions/PdfViewer";

export default function Page() {
  return (
    <Container>
      <Space my={"xl"} />
      <TermsServiceWrapper />
      <PdfViewer url="./docs/Risk_Disclosure_Statement_en.pdf" />
    </Container>
  );
}

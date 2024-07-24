import { Box } from "@mantine/core";

const PdfViewer = ({ url }: { url: string }) => {
  return (
    <Box h={"85vh"} py={30}>
      <iframe
        src={url}
        style={{
          display: "block",
          width: "100%",
          height: "100%"
        }}
      ></iframe>
    </Box>


  );
};

export default PdfViewer;

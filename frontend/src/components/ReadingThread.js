import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./Styles.css";
import { Button, Box } from "@material-ui/core";

require("dotenv").config();

export default function ReadingThread(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      {" "}
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <Box
          style={{ border: "2px solid steelblue" }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            display="flex"
            style={{ width: "100%" }}
            bgcolor="background.paper"
          >
            <Box display="flex" justifyContent="flex-start" m={1} p={1}>
              <Button
                disabled={pageNumber <= 1}
                onClick={previousPage}
                variant="contained"
                color="primary"
              >
                Previous
              </Button>
              <Button
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                variant="contained"
                color="primary"
                style={{ marginLeft: "4%" }}
              >
                Next
              </Button>
            </Box>
            <Box flexShrink={0} m={1} p={1}>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </Box>
          </Box>
          <Box>
            <Document
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              file={`${API_URL}/book?docID=${props.bookID}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Box>
        </Box>
      </Box>
      {/* <Box
        display="flex"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box
          style={{ border: "2px solid rgb(0, 102, 255)" }}
          display="flex"
          justifyContent="center"
          flexDirection="vertical"
        >
          <Box>
            <Box display="flex" justifyContent="flex-start" m={1} p={1}>
              <Button
                disabled={pageNumber <= 1}
                onClick={previousPage}
                color="primary"
              >
                Previous
              </Button>
              <Button
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                color="primary"
              >
                Next
              </Button>
            </Box>
          </Box>
          <Document
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            file={`${API_URL}/book?docID=${props.bookID}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <div style={{ marginTop: "2%", marginRight: "2%" }}>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </div>
          </div>
        </Box>
      </Box> */}
    </>
  );
}

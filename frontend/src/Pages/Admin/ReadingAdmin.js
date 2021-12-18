import React from "react";
import ReadingThread from "../../components/ReadingThread";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useNavigate } from "@reach/router";

export default function Reading(props) {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("RA : ", props.bookID);

  const navigate = useNavigate();

  const approve = () => {
    console.log("Approved");
    axios
      .post(`${API_URL}/publish?docID=${props.bookID}`)
      .then((res) => {
        console.log(res);
        navigate(`/admin`);
      })
      .catch((err) => console.log(err));
  };

  const reject = () => {
    console.log("Reject");
    axios
      .post(`${API_URL}/reject?docID=${props.bookID}`)
      .then((res) => {
        console.log(res);
        navigate(`/admin`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <MyAppBar />
      <Toolbar /> */}
      <ReadingThread bookID={props.bookID} />
      <div style={{ display: "flex" }}>
        <Button
          onClick={approve}
          style={{
            fontSize: "20",
            height: "35",
            width: "100",
            margin: "20px",
          }}
          color="primary"
          variant="contained"
          disableElevation
        >
          Approve
        </Button>

        <Button
          onClick={reject}
          style={{
            fontSize: "20",
            height: "35",
            width: "100",
            margin: "20px",
          }}
          color="primary"
          variant="contained"
          disableElevation
        >
          Reject
        </Button>
      </div>
    </div>
  );
}

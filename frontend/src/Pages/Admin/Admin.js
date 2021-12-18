import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import $ from "jquery";
import axios from "axios";
import Loader from "../../components/Loader";
import { Grid, Box } from "@material-ui/core";
import PostcardAdmin from "../../components/PostcardAdmin";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  head: {
    margin: "30px auto",
    display: "block",
    padding: "10px",
    fontSize: "40px",
  },
  input: {
    margin: "30px auto",
    display: "block",
    padding: "10px",
    fontSize: "20px",
    width: "400px",
    borderRadius: "5px",
    backgroundColor: "#edf5e1",
  },
  button: {
    margin: "20px auto",
    padding: "10px",
    fontSize: "20px",
    width: "100px",
    borderRadius: "5px",
    backgroundColor: "#05386b",
    color: "white",
    fontWeight: "bold",
    letterSpacing: "2px",
  },
}));

export default function Admin() {
  const classes = useStyles();
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [checkList, setCheckList] = useState({});
  const [render, setRender] = useState(false);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseModal = (event) => {
    console.log(password);
    if (password !== "admin") {
      event.preventDefault();
      var error = "Incorrect Password.";
      $("#login-error").html(error);
      $("#login-error").show();
    } else {
      setIsOpen(false);
    }
  };

  const customStyles = {
    content: {
      position: "relative",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "500px",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: "10px",
      background: "#5cdb95",
      color: "#05386b",
    },
  };

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/pendingrequest`)
      .then((res) => {
        console.log("get : ", res.data);
        setData(res.data);
        //setLen(res.data.length);
        //console.log("Number of items: ",len);
        // console.log("output: ",data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >
        <form>
          <h1 className={classes.head}>Enter Password For Admin Login</h1>
          {/* <input type="text" placeholder="Email" id="email" className={classes.input}  /> */}
          <input
            type="password"
            placeholder="Password"
            id="pswrd"
            className={classes.input}
            onChange={handleChange}
          />
          <button onClick={handleCloseModal} className={classes.button}>
            Enter
          </button>
          <p
            style={{ display: "none", color: "red", fontSize: "20px" }}
            id="login-error"
          ></p>
        </form>
      </Modal>

      <div>
        <h1 style={{ textAlign: "center" }}>Welcome Admin!</h1>
        <h2 style={{ textAlign: "center" }}>Pending Requests</h2>
      </div>

      {data ? (
        <div>
          <Box display="flex" justifyContent="center">
            {/* <h1 style={{ marginLeft: "15px" }}> Results found : {len} </h1> */}
            <Grid container spacing={2} style={{ width: "78vw" }}>
              {data.map((x, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={2}
                  style={{ margin: "20px" }}
                >
                  <PostcardAdmin
                    data={x}
                    key={i}
                    checkList={checkList}
                    setCheckList={setCheckList}
                    render={render}
                    setRender={setRender}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

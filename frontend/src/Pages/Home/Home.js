import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MyAppBar from "../../components/MyAppBar";
import { Cookies, useCookies } from "react-cookie";
import { Button, Box } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import Modal from "@material-ui/core/Modal";
import Search from "../../components/Search";
import axios from "axios";
import Scroll from "../../components/HorizontalScroll/Scroll";
import queryString from "query-string";
import "../../components/Styles.css";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  content: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  bullet: {
    display: "inline-block",
    margin: "0 20px",
    transform: "scale(1.5)",
  },
}));

export default function Home(props) {
  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  const [render, setRender] = useState(false);

  const client_id = process.env.REACT_APP_CLIENT_ID;
  const [cookie, setCookie] = useCookies([""]);
  const [user, setUser] = useState(false);

  console.log("Home-Rerender");
  const classes = useStyles();

  console.log(userCookie);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const responseGoogle = (response) => {
    console.log("Success");
    let authCookie = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      GID: response.googleId,
    };
    console.log(authCookie);
    setCookie("userCookie", authCookie);

    axios
      .post(`${API_URL}/addreader`, authCookie)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setUser(true);
    setRender(!render);
    window.location.reload();
  };

  const fail = (res) => {
    console.log("Failed ", res);
  };

  useEffect(() => {
    if (userCookie !== undefined) setUser(true);
  });

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  console.log(client_id);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        m={1}
        p={1}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setUser(true)}
          style={{ marginBottom: "9%" }}
        >
          Coninue as Guest
        </Button>
        <GoogleLogin
          clientId={client_id}
          onSuccess={responseGoogle}
          onFailure={fail}
        >
          <strong>Sign in with Google</strong>
        </GoogleLogin>
      </Box>
    </div>
  );

  const [drama, setDrama] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [horror, setHorror] = useState([]);
  const [mylist, setMylist] = useState([]);
  const [cr, setCr] = useState([]);
  const [mlen, setMlen] = useState(0);
  const [clen, setClen] = useState(0);
  const [checkList, setCheckList] = useState({});
  // const [reRender, setReRender] = useState(true);

  // console.log("home : ", mylist);
  // console.log("home : ", checkList);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/home/genres?` + queryString.stringify({ genre: "Drama" })
      )
      .then((res) => {
        console.log("get : ", res.data);
        setDrama(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${API_URL}/home/genres?` + queryString.stringify({ genre: "Thriller" })
      )
      .then((res) => {
        console.log("get : ", res.data);
        setThriller(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${API_URL}/home/genres?` + queryString.stringify({ genre: "Horror" })
      )
      .then((res) => {
        console.log("get : ", res.data);
        setHorror(res.data);
      })
      .catch((err) => console.log(err));

    if (userCookie !== undefined) {
      const email = userCookie.email;
      axios
        .get(`${API_URL}/mylist?` + queryString.stringify({ email }))
        .then((res) => {
          console.log("get : ", res.data);
          setMylist(res.data);
          setMlen(res.data.length);
          var tempList = {};
          res.data.forEach((element) => {
            tempList[element.docID] = true;
          });
          console.log(tempList);
          setCheckList(tempList);
        })
        .catch((err) => console.log(err));
    }

    if (userCookie !== undefined) {
      const email = userCookie.email;
      axios
        .get(`${API_URL}/cr?` + queryString.stringify({ email }))
        .then((res) => {
          console.log("get : ", res.data);
          setCr(res.data);
          setClen(res.data.length);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className={classes.root}>
      <MyAppBar render={render} setRender={setRender} />
      {/* <SecondaryBar /> */}
      <Modal
        open={!user}
        onClose={() => {
          setUser(false);
        }}
      >
        {body}
      </Modal>
      <main className={classes.content}>
        <Toolbar />
        <Search />
        <div style={{ marginTop: "2%" }}>
          {userCookie == undefined ? null : clen > 0 ? (
            <>
              <Scroll
                data={cr}
                isAdd={false}
                lable={`Continue Reading : ${clen}`}
                mylist={mylist}
                setMylist={setMylist}
                checkList={checkList}
                setCheckList={setCheckList}
                render={render}
                setRender={setRender}
              />{" "}
            </>
          ) : null}
          {userCookie == undefined ? null : mlen > 0 ? (
            <>
              <Scroll
                data={mylist}
                isAdd={true}
                lable={`My List`}
                mylist={mylist}
                setMylist={setMylist}
                checkList={checkList}
                setCheckList={setCheckList}
                render={render}
                setRender={setRender}
              />{" "}
            </>
          ) : null}

          <Scroll
            data={drama}
            isAdd={false}
            lable={"Drama"}
            mylist={mylist}
            setMylist={setMylist}
            checkList={checkList}
            setCheckList={setCheckList}
            render={render}
            setRender={setRender}
          />

          <Scroll
            data={thriller}
            isAdd={false}
            lable={"Thriller"}
            mylist={mylist}
            setMylist={setMylist}
            checkList={checkList}
            setCheckList={setCheckList}
            render={render}
            setRender={setRender}
          />

          <Scroll
            data={horror}
            isAdd={false}
            lable={"Horror"}
            mylist={mylist}
            setMylist={setMylist}
            checkList={checkList}
            setCheckList={setCheckList}
            render={render}
            setRender={setRender}
          />
        </div>
      </main>
    </div>
  );
}

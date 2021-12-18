import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { Cookies } from "react-cookie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { genres } from "../../utils/Constant";
import { Formik } from "formik";
import { Box, Typography, Button } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useNavigate } from "@reach/router";

require("dotenv").config();

const CloudName = process.env.REACT_APP_CLOUD_NAME;
const UploadPreset = process.env.REACT_APP_CLOUD_PRESET;

// const defaultProps = {
//   border: 1,
//   borderRadius: 5,
//   style: { width: "396px", height: "57px", marginTop: "20px" },
// };

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SubmitForm(props) {
  const classes = useStyles();
  const [bookname, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState([]);
  const [options, setOptions] = useState();
  const [imgUrl, setUrl] = useState("");
  const [render, SetreRender] = useState(false);
  let id = window.location.pathname;
  id = id.substring(6);

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("one : ", bookname);
  useEffect(() => {
    axios
      .get(`${API_URL}/bookbyid?` + queryString.stringify({ docID: id }))
      .then((res) => {
        console.log(res.data);
        setBookName(res.data.title);
        setDescription(res.data.description);
        setGenre(res.data.genres);
        SetreRender(!render);
      });
  }, []);
  function Upload(props) {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CloudName,
        uploadPreset: UploadPreset,
        multiple: false,
        cropping: true,
        showSkipCropButton: true,
        croppingAspectRatio: 0.76,
        folder: "profile_pic",
        clientAllowedFormats: ["png", "jpeg", "mov", "heic"],
        maxFileSize: 7000000,
        maxImageFileSize: 3500000,
        maxVideoFileSize: 40000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        sources: ["local", "instagram", "facebook"],
      },
      (err, res) => {
        if (err) console.log(err);
        if (res.event === "success") {
          //  SetImageUrl(res.info.public_id);
          console.log("ID : ", res.info.public_id);
          setUrl(res.info.public_id);
          SetreRender(!render);
          //  console.log("inside : ", data);
        }
      }
    );
    const showWidget = () => {
      widget.open();
    };

    return (
      <div>
        <button onClick={showWidget}>
          {props.element} <br />
          {props.text}
        </button>
      </div>
    );
  }

  const submit = async () => {
    const cookies = new Cookies();
    const userCookie = cookies.get("userCookie");
    // const email = userCookie.email;

    console.log(userCookie.GID);
    const obj = {
      title: bookname,
      description: description,
      genres: genre,
      docID: id,
      imageUrl: `https://res.cloudinary.com/${CloudName}/image/upload/v1615719550/${imgUrl}`,
    };

    console.log("Final : ", obj);

    axios
      .post(`${API_URL}/submit?` + queryString.stringify({ docID: id }), obj)
      .then((res) => {
        // window.location.reload();
        console.log(res);
        navigate(`/`);
      });
  };

  const onClick = () => {
    if (formRef.current.reportValidity()) submit();
  };

  //   const handleUploadClick = (event) => {
  //     const formData = new FormData();
  //     formData.append("file", event.target.files[0]);
  //     // replace this with your upload preset name
  //     formData.append("upload_preset", UploadPreset);
  //     setOptions({
  //       method: "POST",
  //       body: formData,
  //     });
  //   };

  const formRef = React.useRef();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LibraryBooks />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm/Edit Details
        </Typography>
        <Formik
          enableReinitialize={true}
          initialValues={{
            bookName: bookname || "",
            description: description || "",
            genre: genre || [],
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form className={classes.form} ref={formRef}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={values.bookName}
                margin="normal"
                label="Book Name"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                onChange={(event) => setBookName(event.target.value)}
              />
              <TextField
                variant="outlined"
                fullWidth
                value={values.description}
                label="Description"
                margin="normal"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Autocomplete
                multiple
                options={genres}
                style={{ marginTop: "15px" }}
                value={values.genre}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={genre.length === undefined || genre.length === 0}
                    variant="outlined"
                    label="Genres of Book"
                    placeholder="new genre"
                  />
                )}
                onChange={(event, value) => setGenre(value)}
              />
            </form>
          )}
        </Formik>
        {console.log("outsde : ", imgUrl)}
        {imgUrl ? (
          <>
            <Box
              display="flex"
              justifyContent="center"
              style={{ marginTop: "3%" }}
            >
              <Typography component="h1" variant="h5">
                Book Cover
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              {/* <Card style={{ height: "50%", width: "50%", margin: "3%" }}>
                <CardMedia
                  style={{ height: 0, paddingTop: "100%" }}
                  image={`https://res.cloudinary.com/${CloudName}/image/upload/v1615719550/${imgUrl}`}
                />
              </Card> */}
              <img
                src={`https://res.cloudinary.com/${CloudName}/image/upload/v1615719550/${imgUrl}`}
                style={{ width: 230, height: 300 }}
              />
              {console.log(
                "inside : ",
                `https://res.cloudinary.com/${CloudName}/image/upload/v1615719550/${imgUrl}`
              )}
            </Box>
          </>
        ) : null}
        <Box display="flex" justifyContent="center" style={{ marginTop: "2%" }}>
          <Upload
            element={<AddPhotoAlternateIcon />}
            text={(imgUrl ? "Change" : "Upload") + " Image"}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClick}
        >
          Submit For Review
        </Button>
      </div>
    </Container>
  );
}

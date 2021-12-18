import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "./Styles.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Paper } from "@material-ui/core";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "3px",
  },
  header: {
    textAlign: "center",
  },

  media: {
    textAlign: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(1)",
  },
  like: {
    fontSize: 10,
    color: "#999999",
  },
  heart: {
    paddingLeft: "0.2rem",
  },
  button: {
    fontSize: 8,
    height: 22,
    width: 65,
  },
  wishlist: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    padding: "0.2rem",
    paddingTop: "0.3rem",
  },
  like_in_guest: {
    textAlign: "right",
    fontSize: "medium",
  },
  paper: {
    width: 200,
    height: 270,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    paddingTop: "1rem",
  },
  author: {
    textAlign: "center",
    fontSize: 10,
    paddingBottom: "0.8rem",
  },
  genre: {
    fontSize: 9,
    paddingBottom: "0.2rem",
  },
  des: {
    fontSize: 10,
    paddingBottom: "0.5rem",
    paddingLeft: "0.2rem",
  },
  info: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Postcard = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>➥</span>;
  const heart = <span className={classes.heart}>❤</span>;

  //const Genre = props.data.genres;

  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("URL : ", API_URL);

  const navigate = useNavigate();

  //const [isAdd, setAdd] = React.useState(false);

  const ClickMe = () => {
    console.log("clicked");
    const obj = {
      email: userCookie.email,
      docID: props.data.docID,
    };
    console.log(obj);
    axios
      .post(`${API_URL}/addtomylist`, obj)
      .then((res) => {
        console.log(res);
        if (res.data == "added") {
          let tempList = props.checkList;
          tempList[props.data.docID] = true;
          props.setCheckList(tempList);
          props.setRender(!props.render);
        } else {
          let tempList = props.checkList;
          tempList[props.data.docID] = undefined;
          props.setCheckList(tempList);
          props.setRender(!props.render);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="box">
      <Paper
        className="image"
        elevation={3}
        onClick={() => {
          if (props.data.state == "Published") {
            navigate(`/view/${props.data.docID}`);
          } else {
            navigate(`/edit/${props.data.docID}`);
          }
        }}
      >
        <img src={props.data.imageUrl} />
      </Paper>
      <Paper className="details">
        <Typography className={classes.title} color="textPrimary">
          {props.data.title}
        </Typography>
        <Typography className={classes.author} color="textSecondary">
          {"- "}
          {props.data.author.Fname + " " + props.data.author.Lname}
        </Typography>
        <Typography
          className={classes.genre}
          variant="subtitle2"
          color="textSecondary"
          component="p"
        >
          {bull}{" "}
          {props.data.genres.map((genre) => {
            return "|" + genre + "|" + " ";
          })}
        </Typography>
        <Typography className={classes.des} variant="body2" component="p">
          {props.data.description.length > 235
            ? props.data.description.slice(0, 235) + "..."
            : props.data.description}
        </Typography>
        {props.data.state == "Published" ? (
          <div className={classes.wishlist}>
            <span>
              {userCookie !== undefined ? (
                <Button
                  onClick={ClickMe}
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  disableElevation
                >
                  {props.checkList[props.data.docID] ? "Remove" : "Add"}
                </Button>
              ) : null}
            </span>
            <span className={classes.like}>
              {heart} {props.data.likes.count}
            </span>
          </div>
        ) : null}
      </Paper>
    </div>
  );
};

export default Postcard;

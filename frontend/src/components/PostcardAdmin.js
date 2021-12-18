import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "./Styles.css";
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

const PostcardAdmin = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>➥</span>;
  
  //const Genre = props.data.genres;

  
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("URL : ", API_URL);

  const navigate = useNavigate();

  //const [isAdd, setAdd] = React.useState(false);


  return (
    <div className="box">
      <Paper
        className="image"
        elevation={3}
        onClick={() => {
          navigate(`/admin/view/${props.data.docID}`);
          // if (props.data.state == "Published") {
          //   navigate(`/view/${props.data.docID}`);
          // } else {
          //   navigate(`/edit/${props.data.docID}`);
          // }
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
      </Paper>
    </div>
  );
};

export default PostcardAdmin;

import React from "react";
import ReadingThread from "../../components/ReadingThread";
import MyAppBar from "../../components/MyAppBar";
import Comments from "../../components/CommentThread/Comments";
import Toolbar from "@material-ui/core/Toolbar";

export default function Reading(props) {
  return (
    <div>
      <MyAppBar />
      <Toolbar />
      <ReadingThread bookID={props.bookID} />
      <Comments bookID={props.bookID} />
    </div>
  );
}

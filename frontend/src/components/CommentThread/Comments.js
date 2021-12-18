import { useState, useEffect } from "react";
//import { BrowserRouter as Router } from 'react-router-dom'
//import Header from './components/Header'
import Tasks from "./Tasks";
import Comment from "./Comment";
//import About from './components/About'
import "./appstyle.css";
import "./comment.css";
import "./indexstyle.css";
import { Cookies } from "react-cookie";

const axios = require("axios");

export default function App(props) {
  //console.log("Hello jay", props.bookID);
  const cookies = new Cookies();
  const usercookie = cookies.get("userCookie");
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [tasks, setTasks] = useState([]);
  const [temp, setTemp] = useState(false);
  const [myid, setmyid] = useState(0);

  useEffect(() => {
    //console.log("JAY R SHAH");
    console.log(myid);

    const fetchTasks = async () => {
      const res = await fetch(`${API_URL}/getcomment?docID=${props.bookID}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log("from fetch", data);
      setTasks(data);
      return data;
    };

    fetchTasks();

    if (usercookie !== undefined) {
      setTemp(true);
    }

    //console.log("myid", myid);
  }, [myid]);

  // Add Task
  const addTask = async (task) => {
    console.log(task);

    //setTasks(tasks => [...tasks, task]);
    console.log("task Added from addtask", tasks);
    const temp = axios
      .post(`${API_URL}/addcomment?docID=${props.bookID}`, {
        comment: task.comment,
        Gname: task.Gname,
        GID: task.GID,
        docID: task.docID,
        ...tasks,
      })
      .then((res) => {
        console.log(res, "Form Jay");
        const data1 = res.data;
        //setTasks(data1);
        console.log(data1.data, "find some data");
        console.log(tasks.comment, "From Jay1");
        console.log(tasks.length, "Length");
        if (myid === 10) {
          setmyid(0);
        } else {
          setmyid(myid + 1);
        }
        return res.data;
      })
      .catch((err) => {
        console.error("There was an error!", err);
      });
    const t1 = temp.data;
    console.log(t1, "Jay here");
    return temp;
  };

  return (
    <div>
      {temp && (
        <>
          <div className="container" style={{ margin: "5%" }}>
            <h1>Comments</h1>
            <Comment onAdd={addTask} usercookie={usercookie} props={props} />
            {tasks.length > 0 ? <Tasks tasks={tasks} /> : "No Comments"}
          </div>
        </>
      )}
    </div>
  );
}

// export default App

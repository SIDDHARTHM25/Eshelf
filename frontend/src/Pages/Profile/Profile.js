import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import Avatar from "react-avatar";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import RoomIcon from "@material-ui/icons/Room";
import MyAppBar from "../../components/MyAppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Card, CardMedia, Grid, Divider, Typography } from "@material-ui/core";
import Postcard from "../../components/Postcard";
import { LinkOutlined } from "@ant-design/icons";
import Loader from "../../components/Loader";
import queryString from "query-string";
import { Cookies } from "react-cookie";

import "./profile.css";

import axios from "axios";

require("dotenv").config();

export default function Profile(props) {
  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");
  const [profile, setProfile] = useState();
  const [published, setPublished] = useState([]);
  const [pending, setPending] = useState([]);

  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const CloudName = process.env.REACT_APP_CLOUD_NAME;

  const [checkList, setCheckList] = useState({});
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (userCookie !== undefined) {
      const email = userCookie.email;
      axios
        .get(`${API_URL}/mylist?` + queryString.stringify({ email }))
        .then((res) => {
          console.log("get : ", res.data);
          var tempList = {};
          res.data.forEach((element) => {
            tempList[element.docID] = true;
          });
          console.log(tempList);
          setCheckList(tempList);
        })
        .catch((err) => console.log(err));
    }
    axios
      .get(`${API_URL}/profile?email=${props.email}`)
      .then((response) => {
        //  console.log(response);
        console.log(response.data[0]);
        const data = response.data[0];
        setProfile(data);
        console.log(profile);
        const pub = data.books.filter((book) => book.state === "Published");
        const pen = data.books.filter((book) => book.state !== "Published");
        setPublished(pub);
        setPending(pen);
      })
      .catch(() => {
        console.log("Error!");
      });
  }, []);

  return (
    // <div>
    //   <h1>{"Profile of " + props.GID}</h1>
    // </div>

    <div>
      <MyAppBar />
      <Toolbar />
      {console.log("pro : ", profile)}
      {profile ? (
        <div className="page">
          <div className="profile">
            <div className="profilepic">
              {profile.picUrl ? (
                <Card
                  style={{ height: "10%", width: "50%", borderRadius: "50%" }}
                >
                  <CardMedia
                    style={{
                      height: 0,
                      paddingTop: "100%",
                      borderRadius: "50%",
                    }}
                    image={`https://res.cloudinary.com/${CloudName}/image/upload/v1615719550/${profile.picUrl}`}
                  />
                </Card>
              ) : (
                <Avatar
                  name={profile.Fname}
                  size="140"
                  font-size="3em"
                  round={true}
                  color="Slateblue"
                />
              )}
            </div>

            <div className="name">
              <p className="name1">{profile.Fname + " " + profile.Lname}</p>
            </div>

            <div className="author">
              <p className="author1">Author & Story-Writer</p>
            </div>

            <div className="contact">
              <p className="contact1">CONTACT-info</p>

              <div className="email">
                <p className="email1">
                  <SocialIcon
                    network="email"
                    url=""
                    style={{ height: 28, width: 28 }}
                  />
                  {"  "}
                  {profile.email}
                </p>
              </div>

              {profile.Twitter ? (
                <div className="Twitter">
                  <p className="Twitter1">
                    <SocialIcon
                      network="twitter"
                      url=""
                      style={{ height: 28, width: 28 }}
                    />
                    {"   "}
                    {profile.Twitter}
                  </p>
                </div>
              ) : null}

              {profile.linkedInUrl ? (
                <div className="linkedInUrl">
                  <p className="linkedInUrl1">
                    <SocialIcon
                      network="linkedin"
                      url=""
                      style={{ height: 28, width: 28 }}
                    />
                    {"  "}
                    {profile.linkedInUrl}
                  </p>
                </div>
              ) : null}

              {profile.Mnumber ? (
                <div className="Mnumber">
                  <p className="Mnumber1">
                    <SocialIcon
                      network="whatsapp"
                      url=""
                      style={{ height: 28, width: 28 }}
                    />
                    {"  "}
                    {profile.Mnumber}
                  </p>
                </div>
              ) : null}
            </div>

            {profile.Website ? (
              <div className="Mnumber">
                <p className="Mnumber1">
                  <LinkOutlined />
                  {"  "}
                  {profile.Website}
                </p>
              </div>
            ) : null}

            <Divider style={{ marginRight: "7%" }} />
            {profile.Company ? (
              <div className="Company">
                <p className="Company1">WORK-details</p>
                <p className="Company2">
                  <HomeWorkIcon
                    color="secondary"
                    fontSize="large"
                  ></HomeWorkIcon>{" "}
                  {profile.Company}
                  <br></br>
                  {profile.Clocation ? (
                    <>
                      <RoomIcon color="secondary" fontSize="large"></RoomIcon>
                      {profile.Clocation}
                    </>
                  ) : null}
                </p>
              </div>
            ) : null}

            <Divider style={{ marginRight: "7%" }} />
            <div className="Location">
              <p className="Location1">LOCATION</p>
              <p className="Location2">
                <HomeIcon color="secondary" fontSize="large" />{" "}
                {profile.City ? profile.City + ", " : null}
                {profile.State ? profile.State + ", " : null}
                {profile.Country}
              </p>
            </div>
          </div>

          <div className="bio">
            <Typography className="bio2" color="secondary" variant="h5">
              BIO:
            </Typography>
            <p className="bio1">{profile.Bio}</p>
          </div>

          {pending.length > 0 ? (
            <div className="posts">
              <Typography className="posts1" color="secondary" variant="h5">
                Editing / Submitted:
              </Typography>
              <Grid container spacing={2}>
                {pending.map((x, i) => (
                  <Grid key={i} item xs={3}>
                    <Postcard
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
              <Divider style={{ margin: "2%" }} />
            </div>
          ) : null}

          {published.length > 0 ? (
            <div className="posts">
              <Typography className="posts1" color="secondary" variant="h5">
                Published:
              </Typography>
              <Grid container spacing={2}>
                {published.map((x, i) => (
                  <Grid key={i} item xs={3}>
                    <Postcard
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
            </div>
          ) : null}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

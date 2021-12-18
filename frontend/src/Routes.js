import React from "react";
import { Router } from "@reach/router";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import AddProfile from "./Pages/AddProfile/AddProfile";
import CreateNewBook from "./Pages/CreateNewBook";
import Reading from "./Pages/Reading/Reading";
import ReadingAdmin from "./Pages/Admin/ReadingAdmin";
import SearchResult from "./Pages/SearchResult";
import GenreSearch from "./Pages/GenreSearch";
import Admin from "./Pages/Admin/Admin";
import { Cookies } from "react-cookie";
import MyAppBar from "./components/MyAppBar";

export default function Routes(props) {
  const cookies = new Cookies();
  const userCookie = cookies.get("userCookie");

  return (
    <>
      {userCookie ? (
        <Router>
          <Home path="/" />
          <Profile path="/profile/:email" />
          <Home path="*" />
          <Reading path="/view/:bookID" />
          <ReadingAdmin path="admin/view/:bookID" />
          <GenreSearch path="/genres/:genre" />
          <SearchResult path="/search/:value" />
          <Admin path="/admin" />
          <AddProfile path="/editprofile" />
          <CreateNewBook path="/edit/:roomID" />
        </Router>
      ) : (
        <Router>
          <Home path="/" />
          <Profile path="/profile/:email" />
          <Home path="*" />
          <Reading path="/view/:bookID" />
          <ReadingAdmin path="admin/view/:bookID" />
          <GenreSearch path="/genres/:genre" />
          <SearchResult path="/search/:value" />
          <Admin path="/admin" />
        </Router>
      )}
    </>
  );
}

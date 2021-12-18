import React from "react";
import SearchBar from "material-ui-search-bar";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { FormControl, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import { genres } from "../utils/Constant";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    margin: theme.spacing(1),
  },
}));

export default function Search() {
  const classes = useStyles();

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.value);
    navigate(`/genres/${event.target.value}`);
    window.location.reload();
  };

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <SearchBar
            //onChange={(value) => console.log(value)} //when search text changes
            onRequestSearch={(value) => {
              console.log(value);
              navigate(`/search/${value}`);
              window.location.reload();
            }}
            style={{
              width: "50%",
            }}
          />
        </Box>
        <Box p={1}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Genre</InputLabel>
            <Select native onChange={(event) => handleChange(event)}>
              <option> None </option>
              {genres.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Divider />
    </div>
  );
}

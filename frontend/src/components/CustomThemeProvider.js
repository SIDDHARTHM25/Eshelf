import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Cookies, useCookies } from "react-cookie";
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const light = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#3f51b5",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
    },
    titleBar: {
      main: "#3f51b5",
      contrastText: "#222222",
    },
  },
});

const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#26292C",
      light: "rgb(81, 91, 95)",
      dark: "rgb(26, 35, 39)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFB74D",
      light: "rgb(255, 197, 112)",
      dark: "rgb(200, 147, 89)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    titleBar: {
      main: "#555555",
      contrastText: "#ffffff",
    },
    error: {
      main: red.A400,
    },
  },
});

const themes = {
  light,
  dark,
};

function getTheme(theme) {
  return themes[theme];
}

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
  currentTheme: "light",
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  const [cookie, setCookie] = useCookies([""]);
  const cookies = new Cookies();

  // eslint-disable-next-line react/prop-types
  const { children } = props;

  // Read current theme from localStorage or maybe from an api
  const currentTheme = cookies.get("themeCookie") || "light";

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme);

  console.log(themeName);

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    setCookie("themeCookie", name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;

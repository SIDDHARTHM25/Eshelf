import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import CustomThemeProvider from "./components/CustomThemeProvider";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <CustomThemeProvider>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </CustomThemeProvider>
  </CookiesProvider>,
  document.querySelector("#root")
);

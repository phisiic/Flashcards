import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./features/Routing";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { AuthContext } from "./AuthContext";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("access_token"))
  );
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </MantineProvider>
    </AuthContext.Provider>
  );
}

export default App;

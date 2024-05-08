import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// const routing = (
//   <Router>
//     <React.StrictMode>
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </React.StrictMode>
//   </Router>
// );

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import AllRoutes from "./routes/Allroutes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Box className="App">
      <Navbar />
      <AllRoutes />

      {/* <Footer /> */}
    </Box>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Transaction from "./pages/Transanction";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Transaction" element={<Transaction />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;

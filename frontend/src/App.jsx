import { Box, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CeratePage from "./pages/CreatePage";
function App() {
  return (
    <BrowserRouter>
      <Box
        minH={"100vh"}
        w={"100vw"}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CeratePage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

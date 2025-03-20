import "./App.css";
import Login from "./pages/Login";
import CharacterListing from "./pages/characterListing";
import CharacterDetails from "./pages/CharacterDetails";
import { BrowserRouter, Route, Routes } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/characterListing" element={<CharacterListing />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

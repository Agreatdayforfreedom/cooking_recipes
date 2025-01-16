import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/Home";
import RecipePage from "@/pages/Recipe";
import SignupPage from "@/pages/Signup";
import LoginPage from "@/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

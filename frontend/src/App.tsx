import { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "@/pages/Home";
import RecipePage from "@/pages/Recipe";
import SignupPage from "@/pages/Signup";
import LoginPage from "@/pages/Login";
import { ProtectedRouteGuard } from "@/guards/ProtectedGuard";
import { useAuth } from "@/stores/auth";
import { AuthRouteGuard } from "@/guards/AuthGuard";
import YourRecipes from "@/pages/YourRecipes";
import MainLayout from "@/layouts/MainLayout";

function App() {
  const setUser = useAuth((state) => state.setUser);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get("http://localhost:4000/profile");
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? `Bearer ${token}`
        : config.headers.Authorization;
      return config;
    });
    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRouteGuard />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route element={<ProtectedRouteGuard />}>
            <Route path="/your-recipes" element={<YourRecipes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

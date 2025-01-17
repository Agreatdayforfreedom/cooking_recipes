import { useEffect, useLayoutEffect } from "react";
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
import { api } from "@/lib/api";

function App() {
  const setUser = useAuth((state) => state.setUser);
  const token = useAuth((state) => state.token);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const tk = localStorage.getItem("token");
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = tk
        ? `Bearer ${tk}`
        : config.headers.Authorization;
      return config;
    });
    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

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

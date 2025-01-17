import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../stores/auth";
import { LogOut, Utensils } from "lucide-react";
import { useRecipes } from "../stores/recipes";

export const Header = () => {
  const setUser = useAuth((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);
  const setRecipes = useRecipes((state) => state.setRecipes);
  const user = useAuth((state) => state.user);
  return (
    <header className="flex flex-col py-3 sm:py-0 sm:flex-row justify-between items-center w-full min-h-12 bg-dish-dash-800 border-b border-dish-dash-900">
      <Link to="/" className="flex items-center space-x-1 ml-4 ">
        <h1 className="text-2xl font-bold text-white">Dish Dash</h1>
        <Utensils className=" text-white" size={20} />
      </Link>
      <nav>
        {user !== undefined &&
          (!!user ? (
            <>
              <Link to="/your-recipes" className="font-bold text-gray-300">
                Your recipes
              </Link>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(undefined);
                  setRecipes([]); //also clear the recipes (your recipes) state to avoid conflicts
                  localStorage.removeItem("token");
                }}
                variant={"link"}
                className="hover:no-underline font-bold text-white text-md "
              >
                <LogOut />
                <span>Log out</span>
              </Button>
            </>
          ) : (
            <div className="flex space-x-4 mr-4">
              <Link className="  px-3 py-1 font-semibold text-white" to="login">
                Log in
              </Link>
              <Link
                className="border border-dish-dash-600  px-3 py-1 font-semibold text-white"
                to="signup"
              >
                Sign up
              </Link>
            </div>
          ))}
      </nav>
    </header>
  );
};

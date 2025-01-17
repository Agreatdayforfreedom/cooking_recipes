import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../stores/auth";
import { LogOut, Utensils } from "lucide-react";

export const Header = () => {
  const setUser = useAuth((state) => state.setUser);
  const user = useAuth((state) => state.user);
  return (
    <header className="flex justify-between items-center w-full h-12 bg-dish-dash-800 border-b border-dish-dash-900">
      <Link to="/" className="flex items-center space-x-1 ml-4 ">
        <h1 className="text-2xl font-bold text-white">Dish Dash</h1>
        <Utensils className=" text-white" size={20} />
      </Link>
      <nav>
        {user !== undefined && //todo add skeleton
          (!!user ? (
            <>
              <Link to="/your-recipes">Your recipes</Link>
              <Button
                onClick={() => {
                  setUser(null);
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

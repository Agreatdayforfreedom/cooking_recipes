import { Link, Outlet } from "react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../stores/auth";

const MainLayout = () => {
  const setUser = useAuth((state) => state.setUser);
  const user = useAuth((state) => state.user);

  return (
    <>
      <header className="w-full h-12 bg-orange-200">
        <Link to="/">Logo</Link>
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
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="signup">Sign up</Link>
                <Link to="login">Log in</Link>
              </>
            ))}
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default MainLayout;

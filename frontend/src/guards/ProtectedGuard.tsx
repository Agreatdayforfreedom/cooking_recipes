import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../stores/auth";

interface Props extends React.PropsWithChildren {
  redirectPath?: string;
}

export const ProtectedRouteGuard = ({ redirectPath = "/", children }: Props) => {
  const user = useAuth((state) => state.user);

  if (user === undefined) {
    return null;
  }

  if (user === null) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

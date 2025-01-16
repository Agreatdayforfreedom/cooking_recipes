import React from "react";
import { useAuth } from "@/stores/auth";

const YourRecipes = () => {
  const user = useAuth((state) => state.user);

  return <div>{JSON.stringify(user)}</div>;
};

export default YourRecipes;

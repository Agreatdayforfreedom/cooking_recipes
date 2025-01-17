import { User } from "@/types";

interface AuthProps {
  user: User | undefined | null;
  token: string | undefined;
}

export interface AuthStore extends AuthProps {
  setUser: (user: User | null) => void;
  setToken: (token: string | undefined) => void;
}

import { create } from "zustand";

export const useAuth = create<AuthStore>()((set) => ({
  user: undefined,
  token: undefined,
  setUser: (user: User | null) => set(() => ({ user })),
  setToken: (token: string | undefined) => set(() => ({ token })),
}));

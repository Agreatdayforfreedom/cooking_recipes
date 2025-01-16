import { User } from "@/types";

interface AuthProps {
  user: User | undefined | null;
}

export interface AuthStore extends AuthProps {
  setUser: (user: User | null) => void;
}

import { create } from "zustand";

export const useAuth = create<AuthStore>()((set) => ({
  user: undefined,
  setUser: (user: User | null) => set(() => ({ user })),
}));

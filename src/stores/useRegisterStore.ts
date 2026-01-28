import { create } from "zustand";


interface RegisterStore {
    email: string | null;
    setEmail: (email: string) => void;
    reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    reset: () => set({ email: null }),
}));


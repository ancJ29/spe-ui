import { AuthenticationPayload } from "@/common/types";
import { create } from "zustand";

interface AuthState {
  token?: string
  me?: AuthenticationPayload,
  logout: () => void,
  setMe: (me: AuthenticationPayload) => void,
}

const authStore = create<AuthState>((set) => ({
  token: localStorage.__TOKEN__ || undefined,
  setMe: (me: AuthenticationPayload) => {
    set((state) => ({ ...state, me }));
  },
  logout: () => {
    delete localStorage.__TOKEN__;
    delete sessionStorage.__TOKEN__;
    sessionStorage.clear();
    set((state) => ({ ...state, token: undefined, me: undefined }));
    window.location.reload();
  },
}));

export default authStore;

import { PROFILE_IMAGE_PREFIX } from "@/common/configs";
import { AuthenticationPayload } from "@/common/types";
import { masking } from "@/common/utils";
import { create } from "zustand";

interface AuthState {
  token?: string;
  isLogin: boolean;
  me?: AuthenticationPayload;
  displayName?: string;
  avatar?: string;
  logout: () => void;
  setMe: (me: AuthenticationPayload) => void;
}

const authStore = create<AuthState>((set) => ({
  isLogin: false,
  token: localStorage.__TOKEN__ || undefined,
  setMe: (me: AuthenticationPayload) => {
    set({
      me,
      avatar: `${PROFILE_IMAGE_PREFIX}/${me?.avatar}`,
      isLogin: Boolean(me?.id),
      displayName:
        me?.nickName || masking(me?.email || me?.mobile || ""),
    });
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

import { CopyMasterDetail } from "@/common/types";
import { fetchMyMasterDetail } from "@/services/apis";
import { create } from "zustand";

interface CopyState {
  master?: {
    information: CopyMasterDetail;
  }
  loadMaster: () => Promise<void>;
}

const copyStore = create<CopyState>((set) => ({
  loadMaster: async () => {
    const information = await fetchMyMasterDetail();
    set({ master: { information } });
  },
}));

export default copyStore;

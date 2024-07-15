import { MarketPrice, SymbolConfig } from "@/common/types";
import {
  fetchMarketPricesApi,
  getAllSymbolsApi,
} from "@/services/apis";
import { create } from "zustand";

interface TradeState {
  symbols: SymbolConfig[];
  symbolMap: Record<string, SymbolConfig>;
  marketPrices: MarketPrice;
  loadSymbols: () => Promise<void>;
  loadMarketPrices: () => Promise<void>;
}

const tradeStore = create<TradeState>((set) => ({
  symbols: [],
  symbolMap: {},
  marketPrices: {},
  async loadSymbols() {
    const symbols = await getAllSymbolsApi();
    set({
      symbols,
      symbolMap: Object.fromEntries(
        symbols.map((symbol) => [symbol.symbol, symbol]),
      ),
    });
  },
  async loadMarketPrices() {
    set({ marketPrices: await fetchMarketPricesApi() });
  },
}));

export default tradeStore;

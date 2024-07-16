import { MarketInformation, MarketPrice, SymbolConfig } from "@/common/types";
import {
  fetchAllMarketInformation,
  fetchMarketInformation,
  fetchMarketPricesApi,
  getAllSymbolsApi,
} from "@/services/apis";
import { create } from "zustand";

interface TradeState {
  symbols: SymbolConfig[];
  symbolMap: Record<string, SymbolConfig>;
  marketPrices: MarketPrice;
  marketInformation: Record<string, MarketInformation>;
  loadSymbols: () => Promise<void>;
  loadMarketPrices: () => Promise<void>;
  loadMarketInformation: (symbol: string) => Promise<void>;
  loadAllMarketInformation: () => Promise<void>;
}

const tradeStore = create<TradeState>((set, get) => ({
  symbols: [],
  symbolMap: {},
  marketPrices: {},
  marketInformation: {},
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

  async loadAllMarketInformation() {
    const data = await fetchAllMarketInformation();
    set({
      marketInformation: Object.fromEntries(
        data.map((info) => [info.symbol, info]),
      ),
    });
  },

  async loadMarketInformation(symbol: string) {
    const data = await fetchMarketInformation(symbol);
    set({
      marketInformation: {
        ...get().marketInformation,
        [symbol]: data,
      }
    });
  },
}));

export default tradeStore;

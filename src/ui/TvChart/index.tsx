import { ResolutionString } from "public/tv/charting_library";
import { useEffect, useRef, useState } from "react";
import dataFeed from "./data-feed";

export const TVChart = ({
  base = "BTC",
  quote = "USDT",
  isSpot = true,
  theme = "Dark",
}: {
  base?: string;
  quote?: string;
  isSpot?: boolean;
  theme?: "Light" | "Dark";
}) => {
  const chartContainerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [widget, setWidget] = useState<any>(null);
  useEffect(() => {
    if (widget) {
      return;
    }
    const symbol = isSpot
      ? `${base}_${quote}_SPOT`
      : `${base}${quote}`;
    chartContainerRef.current &&
      setWidget(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new TradingView.widget({
          container: chartContainerRef.current,
          symbol,
          locale: "en",
          library_path: "/tv/charting_library/",
          datafeed: dataFeed(symbol, isSpot),
          interval: "1h" as ResolutionString,
          debug: false,
          theme,
          autosize: true,
          disabled_features: [
            "symbol_info",
            "widget_logo",
            "left_toolbar",
            "header_symbol_search",
            "header_screenshot",
            "symbollist_context_menu", // cspell: disable-line
            "auto_enable_symbol_labels",
          ],
        }),
      );
    return () => widget && widget.remove();
  }, [base, isSpot, theme, quote, widget]);

  return (
    <div
      ref={chartContainerRef}
      style={{ height: "100%", minHeight: "500px" }}
    />
  );
};

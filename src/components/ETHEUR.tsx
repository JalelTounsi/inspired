// TradingViewWidget.js

import { Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function ETHEUR(props: Props) {
  const onLoadScriptRef = useRef();
  const pair_1 = 'ETHDAI'
  const pair_2 = 'ETHBTC'
  const pair_3 = 'ETHUSD'
  const pair_4 = 'ETHEUR'
  const pair_5 = 'BTCEUR'

  let pair = pair_4
  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_bdd14") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: '100%',
          height: 500,
          symbol: `KRAKEN:${pair}`,
          interval: "W",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_bdd14",
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_bdd14" />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}

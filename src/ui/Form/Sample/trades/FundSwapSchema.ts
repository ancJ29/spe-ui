import { CoinsAsName, SwapSideAsName, swapSides, swapSymbols } from "@/domain/marketPrice";
import { Sample } from "../Sample";

const FundSwapSchema: Sample = {
  schema: {
    properties: {
      accountId: {
        type: "string"
      },
      side: {
        type: "string",
        enum: swapSides,
        default: swapSides[0]
      },
    },
    
    dependencies: {
      side: {
        oneOf: [
          {
            properties: {
              symbolFrom: {
                type: "string",
                enum: [CoinsAsName.USDT],
                default: CoinsAsName.USDT
              },
              side: {
                enum: [SwapSideAsName.BUY]
              },
              symbolTo: {
                type: "string",
                enum: [CoinsAsName.BTC, CoinsAsName.ETH],
                default: CoinsAsName.BTC
              },
              infoPrice: {
                type: "string"
              },
              volume: {
                type: ["number", "string"],
              }
            },

          },
          {
            properties: {
              symbolFrom: {
                type: "string",
                enum: [CoinsAsName.BTC, CoinsAsName.ETH],
                default: CoinsAsName.BTC
              },
              side: {
                enum: [SwapSideAsName.SELL]
              },
              symbolTo: {
                type: "string",
                enum: [CoinsAsName.USDT],
                default: CoinsAsName.USDT
              },
              infoPrice: {
                type: "string"
              },
              volume: {
                type: ["number", "string"],
              }
            },

          },
        ]
      }
    }


  },
  uiSchema: {
    "ui:order": [
      "accountId",
      "symbolFrom",
      "side",
      "symbolTo",
      "*"
    ],
    "ui:options": {
      classNames: "grid-form-root gap-0",
    },
    "ui:submitButtonOptions": {
      submitText: "Swap",
      props: {
        fullWidth: true,
        size: "lg",
      },
    },
    "symbolTo": {
      "ui:options": {
        widget: "CoinSwapWidget",
        label: false
      }
    },
    "symbolFrom": {
      "ui:options": {
        widget: "CoinSwapWidget",
        label: false
      }
    },
    "volume": {
      "ui:options": {
        widget: "hidden",
        label: false
      }
    },
    "side": {
      "ui:options": {
        widget: "SwapSwitchWidget",
        label: false
      }
    },
    accountId: {
      "ui:options": {
        widget: "FundingAccountWidget",
        label: false
      }
    },
    infoPrice: {
      "ui:options": {
        widget: "MarketPriceInfoWidget",
        label: false
      }
    }
    

  },
  formData: {
    "accountId": "{{FUNDING_ACCOUNT_ID}}",
    "symbol": "BTC_USDT_SPOT",
    "side": "BUY",
    "volume": "0.1"
  }
};

export default FundSwapSchema;

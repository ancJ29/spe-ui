import { FormSchema } from "@/types";

const NewOrderOfSpotTradeSchema: FormSchema = {
  schema: {
    type: "object",
    properties: {
      spotType: {
        type: "string",
        enum: ["BUY", "SELL"],
        default: "BUY",
      },
      spotBy: {
        type: "string",
        enum: ["Limit", "Market", "Conditional", "TP/SL"],
        default: "Limit",
      },
    },
    allOf: [
      {
        if: {
          properties: {
            spotType: {
              const: "BUY",
            },
            spotBy: {
              const: "Limit",
            },
          },
        },
        then: {
          properties: {
            uiBalance: {
              type: "string",
              readOnly: true,
            },

            orderPrice: {
              type: "number",
              title: "Order Price",
            },
            qty: {
              type: "number",
              title: "Qty",
            },
            orderValue: {
              type: "number",
              title: "Order Value",
            },
            uiSubmitBuy: {
              type: "number",
            },
          },
        },
        required: [],
      },
      {
        if: {
          properties: {
            spotType: {
              const: "BUY",
            },
            spotBy: {
              const: "Market",
            },
          },
        },
        then: {
          properties: {
            uiBalance: {
              type: "string",
              readOnly: true,
            },
            orderValueMarket: {
              type: "number",
              title: "Order Value",
            },
            uiSubmitBuy: {
              type: "number",
            },
          },
        },
        required: [],
      },
      {
        if: {
          properties: {
            spotType: {
              const: "BUY",
            },
            spotBy: {
              enum: ["Conditional", "TP/SL"],
            },
          },
        },
        then: {
          properties: {
            uiBalance: {
              type: "string",
              readOnly: true,
            },
            triggerPrice: {
              type: "number",
              title: "Trigger Price",
            },
            orderTriggerBy: {
              type: "string",
              enum: ["LIMIT", "MARKET"],
              default: "LIMIT",
              title: "",
            },
          },
          if: {
            properties: {
              orderTriggerBy: {
                const: "LIMIT",
              },
            },
          },
          then: {
            properties: {
              orderPriceConditional: {
                type: "number",
                title: "Order Price",
              },
              qty: {
                type: "number",
                title: "Qty",
              },
              uiSubmitBuy: {
                type: "number",
              },
            },
          },
          else: {
            properties: {
              orderPriceConditional: {
                type: "number",
                readOnly: true,
                title: "Order Price",
              },
              orderValue: {
                type: "number",
                title: "Order Value",
              },
              uiSubmitBuy: {
                type: "number",
              },
            },
          },
        },
        required: [],
      },
      {
        if: {
          properties: {
            spotType: {
              const: "SELL",
            },
            spotBy: {
              const: "Limit",
            },
          },
        },
        then: {
          properties: {
            uiBalanceBtc: {
              type: "string",
              readOnly: true,
            },
            qty: {
              type: "number",
              title: "Qty",
            },
            orderValue: {
              type: "number",
              title: "Order Value",
            },
            uiSubmitSell: {
              type: "number",
              readOnly: true,
            },
          },
          required: [],
        },
        else: {
          properties: {},
          required: [],
        },
      },
      {
        if: {
          properties: {
            spotType: {
              const: "SELL",
            },
            spotBy: {
              const: "Market",
            },
          },
        },
        then: {
          properties: {
            uiBalanceBtc: {
              type: "string",
              readOnly: true,
            },
            qty: {
              type: "number",
              title: "Qty",
            },
            uiSubmitSell: {
              type: "number",
              readOnly: true,
            },
          },
          required: [],
        },
        else: {
          properties: {},
          required: [],
        },
      },
      {
        if: {
          properties: {
            spotType: {
              const: "SELL",
            },
            spotBy: {
              const: "Conditional",
            },
          },
        },
        then: {
          properties: {
            uiBalanceBtc: {
              type: "string",
              readOnly: true,
            },
            triggerPrice: {
              type: "number",
              title: "Trigger Price",
            },
            orderTriggerBy: {
              type: "string",
              enum: ["LIMIT", "MARKET"],
              default: "LIMIT",
              title: "",
            },
            uiSubmitSell: {
              type: "number",
              readOnly: true,
            },
          },
          if: {
            properties: {
              orderTriggerBy: {
                const: "LIMIT",
              },
            },
          },
          then: {
            properties: {
              orderPriceConditional: {
                type: "number",
                title: "Order Price",
              },
              qty: {
                type: "number",
                title: "Qty",
              },
            },
          },
          else: {
            properties: {
              orderPriceConditional: {
                type: "number",
                title: "Order Price",
                readOnly: true,
              },
              qty: {
                type: "number",
                title: "Qty",
              },
            },
          },
          required: [],
        },
        else: {
          properties: {},
          required: [],
        },
      },
      {
        if: {
          properties: {
            spotType: {
              const: "SELL",
            },
            spotBy: {
              const: "TP/SL",
            },
          },
        },
        then: {
          properties: {
            uiBalanceBtc: {
              type: "string",
              readOnly: true,
            },
            triggerPrice: {
              type: "number",
              title: "Trigger Price",
            },
            orderTriggerBy: {
              type: "string",
              enum: ["LIMIT", "MARKET"],
              default: "LIMIT",
              title: "",
            },
            uiSubmitSell: {
              type: "number",
              readOnly: true,
            },
          },
          if: {
            properties: {
              orderTriggerBy: {
                const: "LIMIT",
              },
            },
          },
          then: {
            properties: {
              orderPriceConditional: {
                type: "number",
                title: "Order Price",
              },
              qty: {
                type: "number",
                title: "Qty",
              },
              orderValue: {
                type: "number",
                title: "Order Value",
              },
              uiSubmitSell: {
                type: "number",
                readOnly: true,
              },
            },
          },
          else: {
            properties: {
              orderPriceConditional: {
                type: "number",
                readOnly: true,
                title: "Order Price",
              },
              qty: {
                type: "number",
                title: "Qty",
              },
              uiSubmitSell: {
                type: "number",
                readOnly: true,
              },
            },
          },
          required: [],
        },

        else: {
          properties: {},
          required: [],
        },
      },
    ],
  },
  uiSchema: {
    "ui:order": [
      "spotType",
      "spotBy",
      "uiBalance",
      "uiBalanceBtc",
      "triggerPrice",
      "orderPriceConditional",
      "orderPrice",
      "orderTriggerBy",
      "qty",
      "orderValue",
      "*",
    ],
    "ui:options": {
      submitButtonOptions: {
        norender: true,
      },
      classNames: "grid-form-root gap-10",
    },
    "spotType": {
      "ui:options": {
        widget: "TradeBuySellSwitchTPLimitWidget",
        label: false,
      },
    },
    "spotBy": {
      "ui:options": {
        widget: "TradeSpotByModeWidget",
        label: false,
      },
    },
    "uiBalance": {
      "ui:options": {
        widget: "UiBalanceWidget",
        label: false,
      },
    },
    "uiBalanceBtc": {
      "ui:options": {
        widget: "UiBalanceWidget",
        label: false,
      },
    },
    "triggerPrice": {
      "ui:options": {
        widget: "VolumeInputFieldWidget",
        label: false,
        // "classNames": "span-15",
      },
    },
    "orderTriggerBy": {
      "ui:options": {
        widget: "TakeProfitTriggerByWidget",
        label: false,
        classNames: "span-9",
      },
    },
    "orderPrice": {
      "ui:options": {
        widget: "VolumeInputFieldWidget",
        label: false,
        // "classNames": "span-9",
        props: {
          suffix: "USDT",
        },
      },
    },
    "orderPriceConditional": {
      "ui:options": {
        widget: "VolumeInputFieldWidget",
        label: false,
        classNames: "span-15",
      },
    },
    "qty": {
      "ui:options": {
        widget: "QtyPercentWidget",
        label: false,
        props: {
          suffix: "BTC",
        },
      },
    },
    "orderValue": {
      "ui:options": {
        widget: "VolumeInputHintFieldWidget",
        label: false,
        props: {
          suffix: "USDT",
        },
      },
    },
    "orderValueMarket": {
      "ui:options": {
        widget: "VolumeInputPercentFieldWidget",
        label: false,
        props: {
          suffix: "USDT",
        },
      },
    },
    "uiSubmitBuy": {
      "ui:options": {
        widget: "QtyBuyButtonWidget",
        label: false,
      },
    },
    "uiSubmitSell": {
      "ui:options": {
        widget: "QtySellButtonWidget",
        label: false,
      },
    },
  },
  formData: {},
};

// #### Parameters

// | name                  | type      | required | default | description                   |
// | --------------------- | --------- | -------- | ------- | ----------------------------- |
// | `accountId`           | `string`  | `YES`    |         |                               |
// | `symbolId`            | `string`  | `YES`    |         |                               |
// | `side`                | `string`  | `YES`    |         | Enum: `BUY`, `SELL`           |
// | `type`                | `string`  | `YES`    |         | Enum: `MARKET`, `LIMIT`       |
// | `volume`              | `string`  | `YES`    |         |                               |
// | `price`               | `string`  |          |         |                               |
// | `leverage`            | `number`  |          |         |                               |
// | `timeInForce`         | `string`  |          | `GTC`   | Enum: `GTC`, `IOC`, `FOK`     |
// | `postOnly`            | `boolean` |          | `false` |                               |
// | `reduceOnly`          | `boolean` |          | `false` |                               |
// | `triggerPrice`        | `string`  |          |         |                               |
// | `triggerBy`           | `string`  |          |         | Enum: `MARK`, `LAST`, `INDEX` |
// | `triggerDirection`    | `string`  |          |         | Enum: `UP`, `DOWN`            |
// | `takeProfit`          | `string`  |          |         |                               |
// | `takeProfitTriggerBy` | `string`  |          |         | Enum: `MARK`, `LAST`, `INDEX` |
// | `stopLoss`            | `string`  |          |         |                               |
// | `stopLossTriggerBy`   | `string`  |          |         | Enum: `MARK`, `LAST`, `INDEX` |
// | `clientOrderId`       | `string`  |          |         |                               |

export default NewOrderOfSpotTradeSchema;

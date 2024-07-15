import { t } from "@/common/utils";
import { getDictionary } from "@/services/languages";
import { FormSchema } from "@/types";

const dictionary = getDictionary();

const PostOrderSchema: FormSchema = {
  schema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
      },
      base: {
        type: "string",
      },
      quote: {
        type: "string",
      },
      orderSide: {
        type: "string",
        enum: ["BUY", "SELL", "LONG", "SHORT"],
        default: "BUY",
      },
      orderType: {
        type: "string",
        // enum: ["Market", "Limit", "Conditional"],
        enum: ["Market", "Limit"],
        default: "Market",
      },
      uiBalance: {
        type: ["number", "string"],
        readOnly: true,
      },
      volume: {
        type: "number",
        title: t(dictionary, "Volume"),
      },
      postOnly: {
        type: "boolean",
        default: false,
      },
      reduceOnly: {
        type: "boolean",
        default: false,
      },
      timeInForce: {
        type: "string",
        enum: ["GTC", "IOC", "FOK"],
        default: "GTC",
      },
      isFuture: {
        type: "boolean",
        default: true,
      },
      uiSubmit: {
        type: "string",
        readOnly: true,
      },
    },
    allOf: [
      {
        if: {
          properties: {
            orderType: {
              not: {
                const: "Market",
              },
            },
          },
        },
        then: {
          properties: {
            orderPrice: {
              type: "number",
              title: t(dictionary, "Order Price"),
            },
          },
        },
      },
    ],
  },
  uiSchema: {
    "ui:order": [
      "orderSide",
      "orderType",
      "uiBalance",
      "orderPrice",
      "volume",
      "postOnly",
      "reduceOnly",
      "timeInForce",
      "uiSubmit",
      "*",
    ],
    "ui:options": {
      submitButtonOptions: {
        norender: true,
      },
      classNames: "grid-form-root gap-10",
    },
    "symbol": {
      "ui:widget": "hidden",
    },
    "base": {
      "ui:widget": "hidden",
    },
    "quote": {
      "ui:widget": "hidden",
    },
    "isFuture": {
      "ui:widget": "hidden",
    },
    "orderSide": {
      "ui:options": {
        widget: "OrderSideWidget",
        label: false,
      },
    },
    "orderType": {
      "ui:options": {
        widget: "OrderTypeWidget",
        label: false,
      },
    },
    "uiBalance": {
      "ui:options": {
        widget: "UiBalanceWidget",
        label: false,
      },
    },
    "orderPrice": {
      "ui:options": {
        widget: "OrderPriceInputFieldWidget",
        label: false,
        props: {
          suffix: "USDT",
        },
      },
    },
    "volume": {
      "ui:options": {
        widget: "VolumeInputFieldWidget",
        label: false,
      },
    },
    "postOnly": {
      "ui:options": {
        widget: "PostOnlyWidget",
        label: false,
      },
    },
    "reduceOnly": {
      "ui:options": {
        widget: "ReduceOnlyWidget",
        label: false,
      },
    },
    "timeInForce": {
      "ui:options": {
        widget: "TimeInForceWidget",
        label: false,
      },
    },
    "uiSubmit": {
      "ui:options": {
        widget: "PlaceOrderButtonsWidget",
        label: false,
      },
    },
    // "triggerPrice": {
    //   "ui:options": {
    //     widget: "VolumeInputFieldWidget",
    //     label: false,
    //     // "classNames": "span-15",
    //   },
    // },
    // "orderTriggerBy": {
    //   "ui:options": {
    //     widget: "OrderTriggerBySpotWidget",
    //     label: false,
    //     classNames: "span-9",
    //   },
    // },
    // "orderPriceConditional": {
    //   "ui:options": {
    //     widget: "OrderPriceConditionalSpotWidget",
    //     label: false,
    //     classNames: "span-15",
    //   },
    // },
    // "orderValue": {
    //   "ui:options": {
    //     widget: "OrderValueInputSpotWidget",
    //     label: false,
    //     props: {
    //       suffix: "USDT",
    //     },
    //   },
    // },
    // "orderValueMarket": {
    //   "ui:options": {
    //     widget: "OrderValuePercentSpotWidget",
    //     label: false,
    //     props: {
    //       suffix: "USDT",
    //     },
    //   },
    // },
    // "orderValueConditionalMarket": {
    //   "ui:options": {
    //     widget: "OrderValuePercentSpotWidget",
    //     label: false,
    //   },
    // },
    // "orderValueConditionalLimit": {
    //   "ui:options": {
    //     widget: "OrderValueInputSpotWidget",
    //     label: false,
    //     props: {
    //       suffix: "USDT",
    //     },
    //   },
    // },
    // "uiSubmitBuy": {
    //   "ui:options": {
    //     widget: "ButtonSubmitSpotWidget",
    //     label: false,
    //   },
    // },
    // "uiSubmitSell": {
    //   "ui:options": {
    //     widget: "ButtonSubmitSpotWidget",
    //     label: false,
    //   },
    // },
  },
  formData: {},
};

export default PostOrderSchema;

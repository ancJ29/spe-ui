import { Sample } from "../Sample";

const AddTPandSLOfTrade: Sample = {
  schema: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["Long", "Short"],
        default: "Long",
        title: "Add Type",
      },
      biasType: {
        type: "string",
        default: "1",
        title: "Bias Type",
        oneOf: [
          {
            title: "Entire Position",
            const: "1",
          },
          {
            title: "Current Order",
            const: "2",
          },
        ],
      },
    },
    allOf: [
      {
        if: {
          properties: {
            biasType: { const: "2" },
          },
        },
        then: {
          properties: {
            tp: {
              type: "object",
              title: "",
              properties: {
                type: {
                  type: "string",
                  enum: ["1", "2", "3"],
                  default: "1",
                  title: "Take Profit-Trigger by",
                },
                limit: {
                  type: "boolean",
                  default: false,
                  title: "Limit",
                },
                value: {
                  type: "number",
                },
              },
              if: {
                properties: {
                  limit: { const: true },
                },
              },
              then: {
                properties: {
                  orderPrice: {
                    type: "number",
                  },
                },
              },
            },
            sl: {
              type: "object",
              title: "",
              properties: {
                type: {
                  type: "string",
                  enum: ["1", "2", "3"],
                  default: "1",
                  title: "Stop Loss-Trigger by ",
                },
                limit: {
                  type: "boolean",
                  default: false,
                  title: "Stop Loss-Trigger by",
                },
                value: {
                  type: "number",
                },
              },
              if: {
                properties: {
                  limit: { const: true },
                },
              },
              then: {
                properties: {
                  orderPrice: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
      {
        if: {
          properties: {
            biasType: { const: "1" },
          },
        },
        then: {
          properties: {
            tp: {
              type: "object",
              title: "",
              properties: {
                value: {
                  type: "number",
                  title: "Take Profit-Trigger by",
                },
              },
            },
            sl: {
              type: "object",
              title: "",
              properties: {
                value: {
                  type: "number",
                  title: "Stop Loss-Trigger by",
                },
              },
            },
          },
        },
      },
    ],
  },
  uiSchema: {
    "ui:options": {
      submitButtonOptions: {
        norender: true,
      },
      classNames: "grid-form-root",
    },
    "type": {
      "ui:widget": "TradeLongShortSwitchTPLimitWidget",
      "ui:options": {
        label: false,
      },
    },
    "biasType": {
      "ui:widget": "BiasTypeSwitchWidget",
      "ui:options": {
        label: false,
      },
    },
    "tp": {
      "ui:options": {
        label: false,
      },
      "type": {
        "ui:widget": "TpAndSlSettingsWidget",
        "ui:options": {
          classNames: "span-18",
          label: false,
        },
      },
      "limit": {
        "ui:widget": "CheckLimitTpAndSlWidget",
        "ui:options": {
          label: false,
          classNames: "span-6",
        },
      },
      "value": {
        "ui:widget": "ProfitInputWidget",
        "ui:options": {
          label: false,
        },
      },
      "orderPrice": {
        "ui:widget": "OrderPriceTPInputWidget",
        "ui:options": {
          label: false,
        },
      },
    },

    "sl": {
      "ui:options": {
        label: false,
      },
      "type": {
        "ui:widget": "TpAndSlSettingsWidget",
        "ui:options": {
          classNames: "span-18",
          label: false,
        },
      },
      "limit": {
        "ui:widget": "CheckLimitTpAndSlWidget",
        "ui:options": {
          label: false,
          classNames: "span-6",
        },
      },
      "value": {
        "ui:widget": "StopLossInputWidget",
        "ui:options": {
          label: false,
        },
      },
      "orderPrice": {
        "ui:widget": "OrderPriceSLInputWidget",
        "ui:options": {
          label: false,
        },
      },
    },
  },
  formData: {
    orderPrice: 3,
  },
};

export default AddTPandSLOfTrade;

import { Sample } from "../Sample";

const FundSwapSchema: Sample = {
  schema: {
    definitions: {
      coin: {
        type: "string",
        enum: ["ETH", "BTC", "USDT"],
        default: "ETH"
      },
      amount: {
        type: "number",
      },
      toAccountId: {
        type: "string"
      },
      fromAccountId: {
        type: "string"
      },
      isOneToMany: {
        type: "boolean",
        default: true
      },
      swapMode: {
        type: "boolean",
        default: false
      },
    },
    properties: {
      coin: {
        $ref: "#/definitions/coin",
      },
      swapMode: {
        $ref: "#/definitions/swapMode",
      }
    },
    dependencies: {
      swapMode: {
        oneOf: [
          {
            properties: {
              "swapMode": {
                const: true
              },
              "fromAccountId": {
                $ref: "#/definitions/fromAccountId",
              },
              "toAccountId": {
                $ref: "#/definitions/toAccountId",
              },
              "amount": {
                $ref: "#/definitions/amount",
              },
            },

          },
          {
            properties: {
              "swapMode": {
                const: false
              },
              "fromAccountId": {
                $ref: "#/definitions/fromAccountId",
              },
              "toAccountId": {
                $ref: "#/definitions/toAccountId",
              },
              "amount": {
                $ref: "#/definitions/amount",
              },
            },

          },
        ]
      }
    }


  },
  uiSchema: {
    "ui:order": [
      "coin",
      "fromAccountId",
      "swapMode",
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
    "coin": {
      "ui:options": {
        widget: "hidden",
        label: false
      }
    },
    "toAccountId": {
      "ui:options": {
        widget: "ToCoinSwapWidget",
        label: false
      }
    },
    "fromAccountId": {
      "ui:options": {
        widget: "FromCoinSwapWidget",
        label: false
      }
    },
    "amount": {
      "ui:options": {
        widget: "hidden",
        label: false
      }
    },
    "swapMode": {
      "ui:options": {
        widget: "SwapSwitchWidget",
        label: false
      }
    }


  },
  formData: {}
};

export default FundSwapSchema;

import { Sample } from "../Sample";

const FundTransferSchema: Sample = {
  schema: {
    definitions: {
      coin: {
        type: "string",
        enum: ["USDT", "BTC", "ETH"],
        default: "USDT",
        title: "Choose coin to transfer"
      },
    },
    properties: {
      coin: {
        $ref: "#/definitions/coin",
      },
      fromAccountId: {
        type: "string",
        title: "From account transfer"
      },
      toAccountId: {
        type: "string",
        title: "To account transfer"
      },
      amount: {
        type: "number",
        title: "Amount",
        minimum: 0.01
      },

    },
    required: ["coin", "fromAccountId", "toAccountId", "amount"],

  },
  uiSchema: {
    "ui:order": [
      "fromAccountId",
      "toAccountId",
      "*",
    ],
    "ui:options": {
      submitButtonOptions: {
        props: {
          fullWidth: true,
          size: "lg",
        },
        submitText: "Submit",
      },
      label: false,
      classNames: "grid-form-root gap-15",
    },
    "coin": {
      "ui:options": {
        label: false,
        widget: "SelectCoinWidget"
      }
    },
    "fromAccountId": {
      "ui:options": {
        label: false,
        widget: "SelectAccountWalletWidget"
      }
    },
    "toAccountId": {
      "ui:options": {
        label: false,
        widget: "SelectAccountWalletWidget"
      }
    },
    "amount": {
      "ui:options": {
        label: false,
        widget: "AmountWidget",
        props: {
          placeholder: "Min 0.01",
        },
      }
    },
       

  },
  formData: {

  }
};

export default FundTransferSchema;


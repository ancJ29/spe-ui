import { Sample } from "../Sample";

const FundWithdrawSchema: Sample = {
  schema: {
    definitions: {
      coin: {
        type: "string",
        enum: ["USDT", "BTC", "ETH"],
        default: "USDT",
        title: "Choose coin to withdraw"
      },
      qrcode: {
        type: "string",
        title: "",
        readOnly: true,
      },
      chain: {
        type: "string",
        title: ""
      },
      address: {
        type: "string",
        title: "Address",
        default: "0x12131"
      },
      amount: {
        type: "number",
        title: "Amount",
        minimum: 0.01
      },
      infoETH: {
        type: "object",
        title: "",
        properties: {
          chain: {
            type: "string",
            enum: ["ETH"],
            default: "ETH",
            title: "Chain"
          },
          amount: {
            $ref: "#/definitions/amount",
          },
          address: {
            $ref: "#/definitions/address",
          },
        },
        required: ["amount", "chain", "address"]
      },
      infoBTC: {
        type: "object",
        title: "",
        properties: {
          chain: {
            type: "string",
            enum: ["BTC"],
            default: "BTC",
            title: "Chain"
          },
          amount: {
            $ref: "#/definitions/amount",
          },
          address: {
            $ref: "#/definitions/address",
          },

        },
        required: ["address", "amount", "chain"]
      },
      infoUSDT: {
        type: "object",
        title: "",
        properties: {
          chain: {
            type: "string",
            enum: ["TRC20", "SOLANA", "POLYGON", "ERC20"],
            default: "TRC20",
            title: "Chain"
          },
          amount: {
            $ref: "#/definitions/amount",
          },
          address: {
            $ref: "#/definitions/address",
          },

        },
        required: ["amount", "address", "chain"]
      },

    },
    properties: {
      coin: {
        $ref: "#/definitions/coin",
      },
    },
    required: ["coin"],
    allOf: [
      {
        if: {
          properties: {
            coin: {
              const: "USDT"
            }
          }
        },
        then: {
          properties: {
            infoUSDT: {
              $ref: "#/definitions/infoUSDT",
            }
          },
        }
      },
      {
        if: {
          properties: {
            coin: {
              const: "BTC"
            }
          }
        },
        then: {
          properties: {
            infoBTC: {
              $ref: "#/definitions/infoBTC",
            }
          }
        }
      },
      {
        if: {
          properties: {
            coin: {
              const: "ETH"
            }
          }
        },
        then: {
          properties: {
            infoETH: {
              $ref: "#/definitions/infoETH",
            }
          }
        }
      }
    ],
  },
  uiSchema: {
    "ui:order": [
      "coin",
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
    "infoUSDT": {
      chain: {
        "ui:options": {
          label: false,
          widget: "SelectChainWidget",
          props: {
            withAsterisk: true,
          },
        }
      },
      address: {
        "ui:options": {
          widget: "EnterAddressWidget",
          label: false,
          props: {
            placeholder: "Enter address"
          }
        }
      },
      amount: {
        "ui:options": {
          label: false,
          widget: "AmountToSendWidget",
          props: {
            placeholder: "Min 0.01",
          },
        }
      }

    },
    "infoBTC": {
      chain: {
        "ui:options": {
          label: false,
          widget: "SelectChainWidget",
          props: {
            withAsterisk: true,
          },
        }
      },
      address: {
        "ui:options": {
          widget: "EnterAddressWidget",
          label: false,
          props: {
            placeholder: "Enter address"
          }
        }
      },
      amount: {
        "ui:options": {
          label: false,
          widget: "AmountToSendWidget",
          props: {
            placeholder: "Min 0.01",
          },
        }
      }
    },
    "infoETH": {
      chain: {
        "ui:options": {
          label: false,
          widget: "SelectChainWidget",
          props: {
            withAsterisk: true,
          },
        }
      },
      address: {
        "ui:options": {
          widget: "EnterAddressWidget",
          label: false,
          props: {
            placeholder: "Enter address"
          }
        }
      },
      amount: {
        "ui:options": {
          label: false,
          widget: "AmountToSendWidget",
          props: {
            placeholder: "Min 0.01",
          },
        }
      }
    },

  },
  formData: {

  }
};

export default FundWithdrawSchema;

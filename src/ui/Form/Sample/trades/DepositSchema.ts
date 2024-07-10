import { Sample } from "../Sample";

const DepositSchema: Sample = {
  schema: {
    definitions: {
      coin: {
        type: "string",
        enum: ["USDT", "BTC", "ETH"],
        default: "USDT",
        title: "Choose coin to deposit"
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
      depositAddress: {
        type: "string",
        title: "",
        readOnly: true,
      },
      fromAddress: {
        type: "string",
        default: "0x1",
        title: "",
        readOnly: true,
      },
      walletAddress: {
        type: "string",
        title: "",
        readOnly: true,
      },
      txId: {
        type: "string",
        default: "0x2",
        readOnly: true,
        title: ""
      },
      amount: {
        type: "number",
        title: "Enter Deposit Amount",
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
          walletAddress: {
            $ref: "#/definitions/walletAddress",
            readOnly: true
          },
          amount: {
            $ref: "#/definitions/amount",
          },
          fromAddress: {
            $ref: "#/definitions/fromAddress",
          },
          txId: {
            $ref: "#/definitions/txId",
          },
        },
        required: ["walletAddress", "amount", "fromAddress", "txId", "chain"]
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
          walletAddress: {
            $ref: "#/definitions/walletAddress",
            readOnly: true
          },
          amount: {
            $ref: "#/definitions/amount",
          },
          fromAddress: {
            $ref: "#/definitions/fromAddress",
            readOnly: true
          },
          txId: {
            $ref: "#/definitions/txId",
          },

        },
        required: ["walletAddress", "amount", "fromAddress", "txId", "chain"]
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
          walletAddress: {
            $ref: "#/definitions/walletAddress",
          },

          amount: {
            $ref: "#/definitions/amount",
          },
          fromAddress: {
            $ref: "#/definitions/fromAddress",
          },
          txId: {
            $ref: "#/definitions/txId",
          },

        },
        required: ["walletAddress", "amount", "fromAddress", "txId", "chain"]
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
      walletAddress: {
        "ui:options": {
          label: false,
          widget: "QrCodeWidget",
          props: {
            withAsterisk: true,
          },
        }
      },
      fromAddress: {
        "ui:options": {
          widget: "hidden"
        }
      },
      txId: {
        "ui:options": {
          widget: "hidden"
        }
      },
      amount: {
        "ui:options": {
          label: false,
          widget: "AmountWidget",
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
      walletAddress: {
        "ui:options": {
          label: false,
          widget: "QrCodeWidget",
          props: {
            withAsterisk: true,
          },
        }
      },
      fromAddress: {
        "ui:options": {
          widget: "hidden"
        }
      },
      txId: {
        "ui:options": {
          widget: "hidden"
        }
      },
      amount: {
        "ui:options": {
          label: false,
          widget: "AmountWidget",
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
      walletAddress: {
        "ui:options": {
          label: false,
          widget: "QrCodeWidget",
          props: {
            withAsterisk: true,
          },
        }
      },
      fromAddress: {
        "ui:options": {
          widget: "hidden"
        }
      },
      txId: {
        "ui:options": {
          widget: "hidden"
        }
      },
      amount: {
        "ui:options": {
          label: false,
          widget: "AmountWidget",
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

export default DepositSchema;

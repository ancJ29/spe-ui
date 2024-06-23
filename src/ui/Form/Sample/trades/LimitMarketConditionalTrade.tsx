import { Sample } from "../Sample";


const LimitFutureTrade: Sample = {
  schema: {
    "type": "object",
    properties: {
      type: {
        "type": "string",
        "enum": ["Long", "Short"],
        default: "Long",
        "title": "Add Type"
      },
      biasType: {
        "type": "string",
        default: "1",
        "title": "Bias Type",
        "oneOf": [
          {
            "title": "Entire Position",
            "const": "1"
          },
          {
            "title": "Current Order",
            "const": "2"
          }
        ],
      },
    },
    allOf: [
      {
        if: {
          properties: {
            biasType: { const: "2" },
          }
        },
        then: {
          properties: {
            tp: {
              type: "object",
              title: "",
              properties: {
                limit: {
                  type: "boolean",
                  default: false,
                  title: "Take Profit-Trigger by ROI (%)"
                },
                value: {
                  type: "string",
                  
                },
              },
              if: {
                properties: {
                  limit: { const: true }
                }
              },
              then: {
                properties: {
                  orderPrice: {
                    type: "string",
                  },
                }
              }
            },
            sl: {
              type: "object",
              title: "",
              properties: {
                limit: {
                  type: "boolean",
                  default: false,
                  title: "Stop Loss-Trigger by Change %"
                },
                value: {
                  type: "string",
                  
                },
              },
              if: {
                properties: {
                  limit: { const: true }
                }
              },
              then: {
                properties: {
                  orderPrice: {
                    type: "string",
                  },
                }
              }
            },
          },
        },
      },
      {
        if: {
          properties: {
            biasType: { const: "1" },
          }
        },
        then: {
          properties: {
            tp: {
              type: "object",
              title: "",
              properties: {
                value: {
                  type: "string",
                  title: "Take Profit-Trigger by ROI (%)",
                },
              },
            },
            sl: {
              type: "object",
              title: "",
              properties: {
                value: {
                  type: "string",
                  title: "Stop Loss-Trigger by Change %"
                },
              },
            },
          },
        },
      },
    ],
  },
  uiSchema: {
    // 'ui:order': ['type', 'biasType', 'limitTP', 'tp', 'orderPrice', 'limitSL', 'sl', 'orderPriceSl', 'profit', 'x'],
    "ui:options": {
      submitButtonOptions: {
        norender: true
      }
    },
    "type": {
      "ui:widget": "TradeLongShortSwitchTPLimitWidget",
      "ui:options": {
        label: false,
      },
    },
    biasType: {
      "ui:widget": "BiasTypeSwitchWidget",
      "ui:options": {
        label: false,
      },
    },
    tp: {
      "ui:widget": "ProfitInputWidget",
      "ui:options": {
        label: false,
      },
      limit: {
        "ui:widget": "CheckLimitTpAndSlWidget",
        "ui:options": {
          label: false,
        },
      },
      value: {
        "ui:widget": "ProfitInputWidget",
        "ui:options": {
          label: false,
        },
      },
    },
    
    sl: {
      "ui:widget": "StopLossInputWidget",
      "ui:options": {
        label: false,
      },
      limit: {
        "ui:widget": "CheckLimitTpAndSlWidget",
        "ui:options": {
          label: false,
        },
      },
      value: {
        "ui:widget": "ProfitInputWidget",
        "ui:options": {
          label: false,
        },
      },
    }
    
  },
  

}

export default LimitFutureTrade;

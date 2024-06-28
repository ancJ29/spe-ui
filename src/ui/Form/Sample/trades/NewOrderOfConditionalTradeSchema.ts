import { Sample } from "../Sample";

const NewOrderOfConditionalTradeSchema: Sample = {
  schema: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        readOnly: true
      },
      type: {
        type: "string",
        enum: [
          "MARKET", "LIMIT"
        ],
        default: "MARKET",
        readOnly: true
      },
      symbolId: {
        type: "string",
        readOnly: true
      },
      triggerPrice: {
        type: "string",
        title: "Trigger Price"
      },
      triggerBy: {
        type: "string",
        enum: ["MARK", "LAST", "INDEX"],
        default: "MARK",
        title: "",
      },
      
      uiOrderPriceBy: {
        type: "string",
        enum: ["MARKET", "LIMIT"],
        default: "LIMIT",
        title: "",
      },
      volume: {
        type: "string"
      },
      leverage: {
        type: "number",
        enum: [10, 25, 50, 75, 100],
        default: 0
      },
      clientOrderId: {
        type: "string",
        readOnly: true,
      },
      // only ui
      uiIsTpAndSl: {
        type: "boolean",
        default: false
      },
      uiGroupActions: {
        type: "string",
        readOnly: true
      },
      uiCalcInfoPrice: {
        type: "string",
        readOnly: true
      },
    },
    if: {
      properties: {
        uiOrderPriceBy: {
          const: "MARKET"
        }
      }
    },
    then: {
      properties: {
        price: {
          type: "string",
          title: "Order Price",
          readOnly: true,
        },
      }
    },
    else: {
      properties: {
        price: {
          type: "string",
          title: "Order Price"
        },
      }
    },
    required: [
      "accountId", "symbolId", "side", "type", "volume",
    ]
  },
  uiSchema: {
    "ui:order": [
      "triggerPrice",
      "triggerBy",
      "price",
      "uiOrderPriceBy",
      "volume",
      "leverage",
      "uiCalcInfoPrice",
      "uiIsTpAndSl",
      "takeProfit",
      "takeProfitTriggerBy",
      "stopLoss",
      "stopLossTriggerBy",
      "uiGroupActions",
      "postOnly",
      "timeInForce",
      "reduceOnly",
      "*"
    ],
    "ui:options": {
      submitButtonOptions: {
        norender: true,
      },
      classNames: "grid-form-root gap-10",
    },
    "type": {
      "ui:widget": "hidden",
    },
    "accountId": {
      "ui:widget": "hidden",
    },
    "symbolId": {
      "ui:options": {
        "widget": "hidden",
      }
    },
    "price": {
      "ui:options": {
        "widget": "OrderPriceConditionalWidget",
        "label": false,
        "classNames": "span-15",
      }
    },
    "uiOrderPriceBy": {
      "ui:options": {
        "widget": "OrderByPriceByWidget",
        "label": false,
        "classNames": "span-9",
      }
    },
    "triggerPrice": {
      "ui:options": {
        "widget": "TriggerPriceNoLastWidget",
        "label": false,
        "classNames": "span-15",
      }
    },
    "triggerBy": {
      "ui:options": {
        "widget": "TakeProfitTriggerByWidget",
        "label": false,
        "classNames": "span-9",
      }
    },
    "volume": {
      "ui:options": {
        "widget": "VolumeInputFieldWidget",
        "label": false,
      }
    },
    "timeInForce": {
      "ui:options": {
        "widget": "TimeInForceWidget",
        "label": false,
        "classNames": "span-7",
      }
    },
    "postOnly": {
      "ui:options": {
        "widget": "PostOnlyWidget",
        "label": false,
        "classNames": "span-17",
      },

    },
    "reduceOnly": {
      "ui:options": {
        "widget": "ReduceOnlyWidget",
        "label": false,
        "classNames": "span-12",
      }
    },
    "uiIsTpAndSl": {
      "ui:options": {
        "widget": "TPandSLModalWidget",
        "label": false,
      }
    },
    "takeProfit": {
      "ui:options": {
        "widget": "TakeProfitWidget",
        "label": false,
        "classNames": "span-15",
      }
    },
    "takeProfitTriggerBy": {
      "ui:options": {
        "widget": "TakeProfitTriggerByWidget",
        "label": false,
        "classNames": "span-9",
      }
    },
    
    "stopLossTriggerBy": {
      "ui:options": {
        "widget": "StopLossTriggerByWidget",
        "label": false,
        "classNames": "span-9",
      }
    },
    "stopLoss": {
      "ui:options": {
        "widget": "StopLossWidget",
        "label": false,
        "classNames": "span-15",
      }
    },

    "uiGroupActions": {
      "ui:options": {
        "widget": "LongShortButtonsWidget",
        "label": false,
      }
    },
    "leverage": {
      "ui:options": {
        "widget": "LeverageWidget",
        "label": false,
      }
    },
    "uiCalcInfoPrice": {
      "ui:options": {
        "widget": "calcInfoPriceWidget",
        "label": false,
      }
    },
    "clientOrderId": {
      "ui:options": {
        "widget": "hidden",
        "label": false,
      }
    }
  },
  formData: {

  },
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


export default NewOrderOfConditionalTradeSchema;

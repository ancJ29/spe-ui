import { Sample } from "../Sample";

const LimitMarketConditionalTrade: Sample = {
  schema: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        readOnly: true
      },
      symbolId: {
        type: "string",
        readOnly: true
      },
      type: {
        type: "string",
        enum: [
          "BUY", "SELF"
        ],
        default: "BUY",
        readOnly: true
      },
      volume: {
        type: "string"
      },
      price: {
        type: "string"
      },
      leverage: {
        type: "number"
      },
      timeInForce: {
        type: "string",
        enum: ["GTC", "IOC", "FOK"],
        default: "IOC"
      },
      postOnly: {
        type: "boolean",
        default: false
      },
      reduceOnly: {
        type: "boolean",
        default: false
      },
      triggerPrice: {
        type: "string"
      },
      triggerBy: {
        type: "string",
        enum: ["MARK", "LAST", "INDEX"],
        default: "MARK"
      },
      triggerDirection: {
        type: "string",
        enum: ["UP", "DOWN"],
        default: "UP"
      },
      takeProfit: {
        type: "string"
      },
      takeProfitTriggerBy: {
        type: "string",
        enum: ["MARK", "LAST", "INDEX"],
        default: "MARK"
      },
      stopLoss: {
        type: "string",
      },
      stopLossTriggerBy: {
        type: "string",
        enum: ["MARK", "LAST", "INDEX"],
        default: "MARK"
      },
      clientOrderId: {
        type: "string",
        readOnly: true,
      },
      // only ui
      groupActions: {
        type: "string",
        readOnly: true
      }
    },
    required: [
      "accountId", "symbolId", "side", "type", "volume"
    ]
  },
  uiSchema: {
    "ui:order": [
      "price", 
      "volume", 
      "takeProfit", 
      "groupActions", 
      "postOnly",  
      "timeInForce",
      "reduceOnly",
      "*"
    ],
    "ui:options": {
      submitButtonOptions: {
        norender: true,
      },
      classNames: "grid-form-root gap-15",
    },
    type: {
      "ui:widget": "hidden",
    },
    accountId: {
      "ui:widget": "hidden",
    },
    symbolId: {
      "ui:options": {
        "widget": "hidden",
      }
    },
    price: {
      "ui:options": {
        "widget": "OrderPriceWidget",
        label: false,
      }
    },
    volume: {
      "ui:options": {
        "widget": "VolumeInputFieldWidget",
        label: false,
      }
    },
    timeInForce: {
      "ui:options": {
        "widget": "TimeInForceWidget",
        label: false,
        classNames: "span-7",
      }
    },
    postOnly: {
      "ui:options": {
        "widget": "PostOnlyWidget",
        label: false,
        classNames: "span-17",
      },
      
    },
    reduceOnly: {
      "ui:options": {
        "widget": "ReduceOnlyWidget",
        label: false,
        classNames: "span-12",
      }
    },
    takeProfit: {
      "ui:options": {
        "widget": "TPandSLModalWidget",
        label: false,
      }
    },
    groupActions: {
      "ui:options": {
        "widget": "LongShortButtonsWidget",
        label: false,
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


export default LimitMarketConditionalTrade;

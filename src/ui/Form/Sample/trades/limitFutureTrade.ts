import { Sample } from "../Sample";

const LimitFutureTrade: Sample = {
    schema: {
        definitions: {
            TextPrice: {
                type: "string",
                minLength: 1,
                title: "Phone",
            },
            OrderByType: {
                type: "number",
                enum: [1, 2],
            },
        },
        properties: {
            orderPrice: {
                $ref: "#/definitions/TextPrice",
                default: 1,
            },
            orderBy: {
                $ref: "#/definitions/OrderByType",
            },
        },
        required: ["orderPrice", "orderBy"],
    },
    uiSchema: {

    },
    formData: {},
};

export default LimitFutureTrade;

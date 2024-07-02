import { Sample } from "../Sample";

const SignUpSchema: Sample = {
  schema: {
    definitions: {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone Number",
      },
      Logo: {
        type: "string",
        title: "Sign up",
      },
      Email: {
        type: "string",
        minLength: 1,
        title: "Email",
      },
      Password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      SignUpType: {
        type: "number",
        enum: [1, 2],
      },
    },
    oneOf: [
      {
        properties: {
          type: {
            $ref: "#/definitions/SignUpType",
            default: 1,
          },
          email: {
            $ref: "#/definitions/Email",
          },
          password: {
            $ref: "#/definitions/Password",
          },
        },
        required: ["type", "email", "password"],
      },
      {
        properties: {
          type: {
            $ref: "#/definitions/SignUpType",
            default: 2,
          },
          mobile: {
            $ref: "#/definitions/PhoneNumber",
          },
          password: {
            $ref: "#/definitions/Password",
          },
        },
        required: ["type", "mobile", "password"],
      },
    ],
  },
  uiSchema: {
    "ui:widget": "TabWidget",
    "ui:options": {
      submitButtonOptions: {
        props: {
          fullWidth: true,
          size: "lg",
        },
        submitText: "Submit",
      },
    },
    "mobile": {
      "ui:widget": "PhoneNumberWidget",
      "ui:placeholder": "Mobile",
    },
    "email": {
      "ui:placeholder": "Email",
    },
    "password": {
      "ui:widget": "CustomPasswordWidget",
      "ui:placeholder": "Password",
    },
    "type": {
      "ui:widget": "hidden",
      "ui:options": {
        label: false,
      },
    },
    "logo": {
      "ui:widget": "LogoWidget",
      "ui:options": {
        label: false,
      },
    },
  },
  formData: {},
};

export default SignUpSchema;

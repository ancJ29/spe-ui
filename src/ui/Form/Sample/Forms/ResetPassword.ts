import { Sample } from "../Sample";

const ResetPassword: Sample = {
  schema: {
    "definitions": {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone"
      },
      Logo: {
        type: "string",
        title: "Sign In"
      },
      Email: {
        type: "string",
        minLength: 1,
        title: "Email"
      },
      Password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      SignUpType: {
        "type": "number",
        "enum": [
          1,
          2
        ]
      },
      Code: {
        type: "string",
        title: "Code",
        minLength: 3,
      },
    },
    "oneOf": [
      {
        "properties": {
          // "logo": {
          //   "$ref": "#/definitions/Logo",
          // },
          "type": {
            "$ref": "#/definitions/SignUpType",
            "default": 1
          },
          "email": {
            "$ref": "#/definitions/Email",
          },
          "password": {
            "$ref": "#/definitions/Password",
          },
          "code": {
            "$ref": "#/definitions/Code",
          },
        },
        "required": ["type", "email", "password", "code"]
      },
      {
        "properties": {
          // "logo": {
          //   "$ref": "#/definitions/Logo",
          // },
          "type": {
            "$ref": "#/definitions/SignUpType",
            "default": 2
          },
          "mobile": {
            "$ref": "#/definitions/PhoneNumber",
          },
          "password": {
            "$ref": "#/definitions/Password",
          },
          "code": {
            "$ref": "#/definitions/Code",
          },
        },
        "required": ["type", "mobile", "password", "code"]
      },
      
    ],
  },
  uiSchema: {
    "ui:widget": "TabWidget",
    "ui:submitButtonOptions": {
      submitText: "Submit",
      props: {
        fullWidth: true,
        size: "lg"
      }
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
        label: false
      }
    },
    "password": {
      "ui:widget": "PasswordWidget",
    }
  },
  formData: {

  },
};

export default ResetPassword;

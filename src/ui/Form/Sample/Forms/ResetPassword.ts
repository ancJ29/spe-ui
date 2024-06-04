import { Sample } from "../Sample";

const ResetPassword: Sample = {
  schema: {
    "definitions": {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone Number"
      },
      Logo: {
        type: "string",
        title: "Reset Password"
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
      VerifyCode: {
        type: "string",
        title: "Verification Code",
        minLength: 3,
      },
      Code: {
        type: "string",
        title: "Code",
        minLength: 3,
      },
    },
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "1",
          "2"
        ],
        default: "1",
      },
    },
    "allOf": [
      {
        "if": {
          "properties": {
            "type": {
              "const": "2"
            }
          }
        },
        "then": {
          "properties": {
            "logo": {
              "$ref": "#/definitions/Logo",
            },
            "mobile": {
              "$ref": "#/definitions/PhoneNumber",
            },
            "code": {
              "$ref": "#/definitions/Code",
            },
            "password": {
              "$ref": "#/definitions/Password",
            },
          },
          "required": [
            "code", "password", "type"
          ]
        }
      },
      {
        "if": {
          "properties": {
            "type": {
              "const": "1"
            }
          }
        },
        "then": {
          "properties": {
            "logo": {
              "$ref": "#/definitions/Logo",
            },
            "email": {
              "$ref": "#/definitions/Email",
            },
            "code": {
              "$ref": "#/definitions/Code",
            },
            "password": {
              "$ref": "#/definitions/Password",
            },
          },
          "required": [
            "email", "password", "code"
          ]
        }
      },
      {
        "required": [
          "type"
        ]
      }
    ],
    // title: "A registration form",
    // description: "A simple form example.",
  },
  uiSchema: {
    "ui:submitButtonOptions": {
      submitText: "Submit",
      props: {
        fullWidth: true,
        size: "lg"
      }
    },
    type: {
      'ui:widget': "TabWidget",
      "ui:options": {
        label: false,
      }
    },
    logo: {
      'ui:widget': "LogoWidget",
      "ui:options": {
        label: false
      }
    }
  },
  formData: {

  },
};

export default ResetPassword;

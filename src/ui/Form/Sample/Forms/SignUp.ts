
import { Sample } from "../Sample";

const SignUp: Sample = {
  schema: {
    "definitions": {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone Number"
      },
      Logo: {
        type: "string",
        title: "Sign up"
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
    },
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": [
          "1",
          "2"
        ],
        "default": "1",
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
            // "logo": {
            //   "$ref": "#/definitions/Logo",
            // },
            "mobile": {
              "$ref": "#/definitions/PhoneNumber",
            },
            "password": {
              "$ref": "#/definitions/Password",
            },
          },
          "required": [
            "mobile", "password"
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
            // "logo": {
            //   "$ref": "#/definitions/Logo",
            // },
            "email": {
              "$ref": "#/definitions/Email",
            },
            "password": {
              "$ref": "#/definitions/Password",
            },
          },
          "required": [
            "email", "password"
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
    "mobile": {
      "ui:widget": "PhoneNumberWidget",
      "ui:placeholder": "Mobile"
    },
    "email": {
      "ui:placeholder": "Email"
    },
    "password": {
      "ui:placeholder": "Password"
    },
    "type": {
      "ui:widget": "TabWidget",
      "ui:options": {
        label: false,
      },
    },
    "logo": {
      "ui:widget": "LogoWidget",
      "ui:options": {
        label: false
      }
    }
  },
  formData: {

  },
};

export default SignUp;

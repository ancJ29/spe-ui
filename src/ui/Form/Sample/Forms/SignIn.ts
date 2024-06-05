
import { Sample } from "../Sample";

const SignIn: Sample = {
  schema: {
    "definitions": {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone / Email"
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
    },
    "type": "object",
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
      "email", "password", "mobile"
    ]
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
    "type": {
      "ui:widget": "TabWidget",
      "ui:options": {
        label: false,
      }
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

export default SignIn;

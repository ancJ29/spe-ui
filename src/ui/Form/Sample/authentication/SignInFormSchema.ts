import { REGEX } from "@/utils/regex";
import { Sample } from "../Sample";


const SignInFormSchema: Sample = {
  schema: {
    definitions: {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone",
      },
      Logo: {
        type: "string",
        title: "Sign In",
      },
      Email: {
        type: "string",
        minLength: 1,
        title: "Email",
        pattern: REGEX.EMAIL
      },
      Password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      SignUpType: {
        type: "string",
        enum: ["1", "2"],
        default: "1"
      },
      PhoneLocal: {
        type: "string",
        default: "+81 Japan",
        title: "Region"
      }
    },
    properties: {
      type: {
        $ref: "#/definitions/SignUpType",
      }
    },
    if: {
      properties: {
        type: {
          const: "1"
        }
      }
    },
    then: {
      properties: {
        email: {
          $ref: "#/definitions/Email",
        },
        password: {
          $ref: "#/definitions/Password",
        },
      },
      required: ["email", "password"],
    },
    else: {
      properties: {
        phoneLocale: {
          $ref: "#/definitions/PhoneLocal"
        },
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
        password: {
          $ref: "#/definitions/Password",
        },
      },
      required: ["phoneLocale","mobile", "password"],
    },
  },
  uiSchema: {
    "ui:options": {
      "classNames": "grid-form-root gap-15",
      "label": false,
    },
    // "ui:widget": "TabWidget",
    "ui:submitButtonOptions": {
      submitText: "Submit",
      props: {
        fullWidth: true,
        size: "lg",
      },
    },
    "type": {
      "ui:options": {
        "widget": "TabWidget",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "password": {
      "ui:options": {
        "widget": "CustomPasswordWidget",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }

    },
    "phoneLocale": {
      "ui:options": {
        "widget": "PhoneLocalWidget",
        "classNames": "span-9",
        "label": false,
        "props": {
          withAsterisk: true,
        }
      }
    },
    "mobile": {
      "ui:options": {
        "widget": "PhoneNumberWidget",
        "placeholder": "Mobile",
        "label": false,
        "classNames": "span-15",
        "props": {
          withAsterisk: true
        }
      }
    },
    "email": {
      "ui:options": {
        "widget": "TextEmailWidget",
        "placeholder": "Email",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "mfaCode": {
      "ui:options": {
        "placeholder": "Email",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    }
  },
  formData: {},
};

export const SignIn2FAFormSchema: Sample = {
  schema: {
    definitions: {
      PhoneNumber: {
        type: "string",
        title: "Phone",
      },
      Logo: {
        type: "string",
        title: "Sign In",
      },
      Email: {
        type: "string",
        title: "Email",
      },
      Password: {
        type: "string",
        title: "Password",
      },
      SignUpType: {
        type: "string",
        enum: ["1", "2"],
        default: "1"
      },
      PhoneLocal: {
        type: "string",
        default: "+81 Japan",
        title: "Region"
      }
    },
    properties: {
      type: {
        $ref: "#/definitions/SignUpType",
      }
    },
    if: {
      properties: {
        type: {
          const: "1"
        }
      }
    },
    then: {
      properties: {
        email: {
          $ref: "#/definitions/Email",
        },
        password: {
          $ref: "#/definitions/Password",
        },
        mfaCode: {
          type: "string",
          title: "2FA Code"
        }
      },
      required: ["email", "password", "mfaCode"],
    },
    else: {
      properties: {
        phoneLocale: {
          $ref: "#/definitions/PhoneLocal"
        },
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
        password: {
          $ref: "#/definitions/Password",
        },
        mfaCode: {
          type: "string",
          title: "2FA Code"
        }
      },
      required: ["phoneLocale", "mobile", "password", "mfaCode"],
    },
  },
  uiSchema: {
    "ui:options": {
      "classNames": "grid-form-root gap-15",
      "label": false,
    },
    // "ui:widget": "TabWidget",
    "ui:submitButtonOptions": {
      submitText: "Submit",
      props: {
        fullWidth: true,
        size: "lg",
      },
    },
    "type": {
      "ui:options": {
        "widget": "TabWidget",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "password": {
      "ui:options": {
        "widget": "CustomPasswordWidget",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }

    },
    "phoneLocale": {
      "ui:options": {
        "widget": "PhoneLocalWidget",
        "classNames": "span-9",
        "label": false,
        "props": {
          withAsterisk: true,
        }
      }
    },
    "mobile": {
      "ui:options": {
        "widget": "PhoneNumberWidget",
        "placeholder": "Mobile",
        "classNames": "span-15",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "email": {
      "ui:options": {
        "widget": "TextEmailWidget",
        "placeholder": "Email",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "mfaCode": {
      "ui:options": {
        "placeholder": "Email",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    }
  },
  formData: {},
};

export default SignInFormSchema;

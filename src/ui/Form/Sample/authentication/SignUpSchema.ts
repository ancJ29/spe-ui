import { REGEX } from "@/utils/regex";
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
        default: "2",
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
      },
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
      required: ["mobile", "password"],
    },
  },
  uiSchema: {
    "ui:options": {
      submitButtonOptions: {
        props: {
          fullWidth: true,
          size: "lg",
        },
        submitText: "Submit",
      },
      // label: false,
      classNames: "grid-form-root gap-15",
    },
    "type": {
      "ui:options": {
        "widget": "TabWidget",
        "label": false
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
        "placeholder": "Email",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "password": {
      "ui:options": {
        "widget": "CustomPasswordWidget",
        "placeholder": "Password",
        "label": false,
        "props": {
          withAsterisk: true,
        }
      }
    },
    "logo": {
      "ui:options": {
        "label": false,
        "widget": "LogoWidget",
      },
    },
  },
  formData: {},
};


export const SignUp2FASchema: Sample = {
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
        type: "string",
        enum: ["1", "2"],
        default: "2",
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
      },
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
      required: ["phoneLocale", "mfaCode", "mobile", "password"],
    },
  },
  uiSchema: {
    "ui:options": {
      submitButtonOptions: {
        props: {
          fullWidth: true,
          size: "lg",
        },
        submitText: "Submit",
      },
      // label: false,
      classNames: "grid-form-root gap-15",
    },
    "type": {
      "ui:options": {
        "widget": "TabWidget",
        "label": false
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
        "placeholder": "Email",
        "label": false,
        "props": {
          withAsterisk: true
        }
      }
    },
    "password": {
      "ui:options": {
        "widget": "CustomPasswordWidget",
        "placeholder": "Password",
        "label": false,
        "props": {
          withAsterisk: true,
        }
      }
    },
    "logo": {
      "ui:options": {
        "label": false,
        "widget": "LogoWidget",
      },
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

export default SignUpSchema;

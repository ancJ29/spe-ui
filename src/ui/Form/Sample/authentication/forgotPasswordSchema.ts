import { REGEX } from "@/utils/regex";
import { Sample } from "../Sample";

const ForgotPasswordSchema: Sample = {
  schema: {
    definitions: {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone Number",
      },
      Email: {
        type: "string",
        minLength: 1,
        title: "Email",
        pattern: REGEX.EMAIL
      },
      SignUpType: {
        type: "string",
        enum: ["1", "2"],
        default: "1",
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
      },
      required: ["email"]
    },
    else: {
      properties: {
        phoneLocale: {
          $ref: "#/definitions/PhoneLocal"
        },
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
      },
      required: ["phoneLocale", "mobile"]
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

export const ForgotPassword2FASchema: Sample = {
  schema: {
    definitions: {
      PhoneNumber: {
        type: "string",
        minLength: 1,
        title: "Phone Number",
      },
      Email: {
        type: "string",
        minLength: 1,
        title: "Email",
        pattern: REGEX.EMAIL
      },
      SignUpType: {
        type: "string",
        enum: ["1", "2"],
        default: "1",
      },
      PhoneLocal: {
        type: "string",
        default: "+81 Japan",
        title: "Region"
      },
      mfaCode: {
        type: "string",
        title: "2FA Code"
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
        mfaCode: {
          $ref: "#/definitions/mfaCode",
        },
        
      },
      required: ["email", "mfaCode"]
    },
    else: {
      properties: {
        phoneLocale: {
          $ref: "#/definitions/PhoneLocal"
        },
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
        mfaCode: {
          $ref: "#/definitions/mfaCode",
        }
      },
      required: ["phoneLocale", "mobile", "mfaCode"]
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

export default ForgotPasswordSchema;

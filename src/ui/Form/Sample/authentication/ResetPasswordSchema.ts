import { REGEX } from "@/utils/regex";
import { Sample } from "../Sample";

const ResetPasswordSchema: Sample = {
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
      Code: {
        type: "string",
        title: "Code",
        minLength: 3,
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
        password: {
          $ref: "#/definitions/Password",
        },
        code: {
          $ref: "#/definitions/Code",
        },
      },
      required: ["type", "email", "password", "code"],
    },
    else: {
      properties: {
        phoneLocale: {
          $ref: "#/definitions/PhoneLocal",
        },
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
        password: {
          $ref: "#/definitions/Password",
        },
        code: {
          $ref: "#/definitions/Code",
        },
      },
      required: ["type", "mobile", "password", "code"],
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
    "code": {
      "ui:options": {
        label: false,
        props: {
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

export const ResetPassword2FASchema: Sample = {
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
      Code: {
        type: "string",
        title: "Code",
        minLength: 3,
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
        password: {
          $ref: "#/definitions/Password",
        },
        code: {
          $ref: "#/definitions/Code",
        },
        mfaCode: {
          $ref: "#/definitions/mfaCode",
        }
      },
      required: ["type", "email", "password", "code", "mfaCode"],
    },
    else: {
      properties: {
        phoneLocale: {
          $ref: "#/definitions/PhoneLocal",
        },
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
        password: {
          $ref: "#/definitions/Password",
        },
        code: {
          $ref: "#/definitions/Code",
        },
        mfaCode: {
          $ref: "#/definitions/mfaCode",
        }
      },
      required: ["type", "email", "password", "code", "mfaCode"],
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
    "code": {
      "ui:options": {
        label: false,
        props: {
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

export default ResetPasswordSchema;

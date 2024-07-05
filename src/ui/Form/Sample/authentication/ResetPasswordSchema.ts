import { REGEX } from "@/utils/regex";
import { Sample } from "../Sample";

const ResetPasswordSchema: Sample = {
  schema: {
    definitions: {
      PhoneNumber: {
        type: "object",
        title: "",
        properties: {
          phoneLocale: {
            $ref: "#/definitions/PhoneLocal"
          },
          mobile: {
            title: "Phone",
            type: "string"
          },
          is2fa: {
            type: "boolean",
            default: false
          },
          password: {
            $ref: "#/definitions/Password",
          },
          code: {
            $ref: "#/definitions/Code",
          },
        },
        required: ["phoneLocale", "mobile", "password", "code"],
        if: {
          properties: {
            is2fa: {
              const: true
            }
          }
        },
        then: {
          properties: {
            mfaCode: {
              $ref: "#/definitions/mfaCode",
            }
          },
          required: ["mfaCode"],
        }
      },
      Email: {
        type: "object",
        title: "",
        properties: {
          email: {
            type: "string",
            title: "Email",
            pattern: REGEX.EMAIL,
          },
          is2fa: {
            type: "boolean",
            default: false
          },
          password: {
            $ref: "#/definitions/Password",
          },
          code: {
            $ref: "#/definitions/Code",
          },
        },
        required: ["email", "password", "code"],
        if: {
          properties: {
            is2fa: {
              const: true
            }
          }
        },
        then: {
          properties: {
            mfaCode: {
              $ref: "#/definitions/mfaCode",
            },
          },
          required: ["mfaCode"]
        }
      },
      Password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      type: {
        type: "string",
        enum: ["1", "2"],
        default: "1"
      },
      PhoneLocal: {
        type: "string",
        default: "+81 Japan",
        title: "Region"
      },
      mfaCode: {
        type: "string",
        title: "2FA Code"
      },
      Code: {
        type: "string",
        title: "Code",
        minLength: 3,
      },
      
    },
    properties: {
      type: {
        $ref: "#/definitions/type",
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
      required: ["email"],
    },
    else: {
      properties: {
        mobile: {
          $ref: "#/definitions/PhoneNumber",
        },
      },
      required: ["mobile"],
    },

  },
  uiSchema: {
    "ui:options": {
      "widget": "hidden",
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
    
    "code": {
      "ui:options": {
        label: false,
        props: {
          withAsterisk: true
        }
      }
    },
    "mobile": {
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
      mobile: {
        "ui:options": {
          "widget": "PhoneNumber2FAWidget",
          "placeholder": "Mobile",
          "label": false,
          "classNames": "span-15",
          "props": {
            withAsterisk: true
          }
        },
      },
      is2fa: {
        "ui:options": {
          "widget": "hidden",
          "label": false,
          "classNames": "hiddenField",
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
      "mfaCode": {
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
          "label": false,
          "props": {
            withAsterisk: true
          }
        }
      }
    },
    "email": {
      email: {
        "ui:options": {
          "widget": "TextEmail2FaWidget",
          "placeholder": "Email",
          "label": false,
          "props": {
            withAsterisk: true
          }
        },
      },
      is2fa: {
        "ui:options": {
          "widget": "hidden",
          "label": false,
          "classNames": "hiddenField",
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
      "mfaCode": {
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
          "label": false,
          "props": {
            withAsterisk: true
          }
        }
      }
    },
  },
  formData: {},
};


export default ResetPasswordSchema;

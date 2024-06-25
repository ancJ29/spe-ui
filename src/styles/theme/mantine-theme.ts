import {
  CSSVariablesResolver,
  Container,
  Modal,
  NumberInput,
  Select,
  createTheme,
} from "@mantine/core";

// https://mantine.dev/styles/css-variables/#css-variables-resolver
export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--main-color": theme.colors.primary[7],
    "--mantine-success": theme.colors.primary[7],
    "--mantine-success-text-emphasis": theme.colors.primary[8],
    "--mantine-success-rgb": theme.colors.primary[8],
  },
  light: {},
  dark: {},
});

export const theme = createTheme({
  primaryColor: "primary",
  defaultRadius: "sm",
  fontFamily:
    "IBM Plex Sans,-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif",
  components: {
    Container: Container.extend({
      defaultProps: {
        size: "lg",
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        styles: {
          root: {
            // border: "solid 1px red"
          },
          input: {
            background: "#26282c",
            fontSize: "14px",
          },
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        styles: {
          input: {
            background: "#26282c",
            fontSize: "14px",
          },
          section: {
            background: "red",
          },
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        classNames: {
          title: "app-modal--title",
          body: "app-modal--body",
          content: "app-modal--content",
          close: "app-modal--close",
          header: "app-modal--header",
          inner: "app-modal--inner",
          overlay: "app-modal--overlay",
          root: "app-modal--root",
        },
      },
    }),
  },

  colors: {
    // https://mantine.dev/colors-generator/?color=F21616
    error: [
      "#ffe9e9",
      "#ffd1d1",
      "#fba0a1",
      "#f76d6d",
      "#f34141",
      "#f22625",
      "#f21616",
      "#d8070b",
      "#c10008",
      "#a90003",
    ],
    // https://mantine.dev/colors-generator/?color=f29422
    primary: [
      "#fff5e1",
      "#ffe8cd",
      "#fad29e",
      "#f7b86c",
      "#f4a341",
      "#f29525",
      "#f18f14",
      "#d77a05",
      "#c06c00",
      "#a85c00",
    ],
  },
  other: {},
});

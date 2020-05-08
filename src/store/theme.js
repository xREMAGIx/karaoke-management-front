import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4078F9",
    },
    secondary: {
      main: "#F94078",
    },
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#000",
  },
});

export default theme;

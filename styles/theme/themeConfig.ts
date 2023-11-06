// styles/themeConfig.ts
import type { ThemeConfig } from "antd";

import ButtonTheme from "./ButtonTheme";

const colorPrimary0 = "#132743";
const colorPrimary1 = "#4a6282";
const colorPrimary2 = "#88a0c3";
const colorSecondary0 = "#ffb5b5";
const colorSecondary1 = "#ffc6c6";
const colorSecondary2 = "#ffdddd";
const colorGrey0 = "#3f4135";
const colorGrey1 = "#7f848d";
const colorGrey2 = "#d9d9d9";
const colorGreywhite0 = "#fcfdff";
const colorRed0 = "#b20000";
const colorGreen0 = "#00621b";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: "GmarketSans",
    sizeStep: 5,

    colorPrimary: colorPrimary0,
    colorError: colorRed0,
  },
  components: {
    Button: ButtonTheme,
  },
};

export default theme;

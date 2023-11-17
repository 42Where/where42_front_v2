// styles/themeConfig.ts
import type { ThemeConfig } from "antd";

import color from "./Colors";
import ButtonTheme from "./ButtonTheme";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: "GmarketSans",

    colorPrimary: color.Primary0,
    colorError: color.Red0,
  },
  components: {
    Button: ButtonTheme,
  },
};

export default theme;

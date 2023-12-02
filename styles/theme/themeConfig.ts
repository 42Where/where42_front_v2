// styles/themeConfig.ts
import type { ThemeConfig } from "antd";

import color from "./Colors";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    fontFamily: "GmarketSans",
    fontWeightStrong: 500,

    colorPrimary: color.Primary0,
    colorError: color.Red0,
    colorSuccess: color.Green0,
    colorIcon: color.Primary0,
    colorBgLayout: color.Greywhite0,
    colorTextBase: color.Primary0,
  },
  components: {
    Button: {
      algorithm: true,
      // color
      primaryColor: color.Greywhite0,

      defaultColor: color.Primary0,
      defaultBg: color.Greywhite0,
      defaultBorderColor: color.Primary0,

      dangerColor: color.Greywhite0,
      borderColorDisabled: color.Grey2,

      colorPrimary: color.Primary0,
      colorPrimaryHover: color.Primary1,
      colorPrimaryActive: color.Primary0,
      colorPrimaryText: color.Greywhite0,

      colorError: color.Red0,
      colorErrorBg: color.Greywhite0,
      // style
      size: 32,
      borderRadiusSM: 24,
      borderRadius: 32,
      borderRadiusLG: 40,
      onlyIconSizeSM: 16,
      onlyIconSize: 24,
      onlyIconSizeLG: 32,

      // font
      contentFontSizeSM: 16,
      contentFontSize: 20,
      contentFontSizeLG: 24,
      fontWeight: 500,
    },
    Menu: {
      algorithm: true,

      controlItemBgActive: color.Primary2,
      colorBgTextHover: color.Grey2,
    },
    Modal: {
      algorithm: true,

      // TODO: 이거 버튼 색이 이상함 어케함???????????
      fontWeightStrong: 500,
    },
    Cascader: {
      algorithm: true,

      controlItemBgActive: color.Primary2,
      colorBgTextHover: color.Grey2,
    },
  },
};

export default theme;

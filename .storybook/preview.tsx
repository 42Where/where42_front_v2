import React from "react";
import type { Preview } from "@storybook/react";

import useMydataStore from "../src/stores/useMyDataStore";
import useGroupStore from "../src/stores/useGroupStore";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // decorators: [
  //   (Story) => {
  //     const myDataStore = useMydataStore((state) => state);
  //     const groupStore = useGroupStore((state) => state);
  //     return <Story {...myDataStore} {...groupStore} />;
  //   },
  // ],
};

export default preview;

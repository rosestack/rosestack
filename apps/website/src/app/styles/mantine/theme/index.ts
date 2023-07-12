import type { MantineThemeOverride, Tuple, DefaultMantineColor } from "@mantine/core";

type Colors = DefaultMantineColor | "primary";

declare module "@mantine/core" {
  interface MantineThemeColorsOverride {
    colors: Record<Colors, Tuple<string, 10>>;
  }
}

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "primary",
  primaryShade: 5,
  black: "hsl(0,0%,0%)",
  white: "hsl(0,0%,100%)",
  loader: "oval",
  colors: {
    primary: [
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      // 5
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
      "hsl(350,50%,50%)",
    ],
    dark: [
      "hsl(0,0%,90%,0.6)",
      "hsl(0,0%,80%,0.8)",
      "hsl(0,0%,70%,0.8)",
      "hsl(0,0%,60%,0.8)",
      "hsl(0,0%,45%,0.8)",
      // 5
      "hsl(0,0%,25%,0.5)",
      "hsl(0,0%,18%,0.8)",
      "hsl(0,0%,14%,0.8)",
      "hsla(0,0%,10%,0.8)",
      "hsla(0,0%,6%,0.8)",
    ],
  },
  fontFamily: "inherit",
  globalStyles: (theme) => {
    return {
      "*, *::before, *::after": {
        boxSizing: "border-box",
        userSelect: "none",
        margin: 0,
        padding: 0,
      },
      "img, svg, a": {
        WebkitUserDrag: "none",
      },
      body: {
        overflowX: "hidden",
        backgroundColor: theme.black,
        position: "relative",
        height: "100vh",
      },
      ["a[href]"]: {
        color: "inherit",
        textDecoration: "none",
      },
    };
  },
};

export default theme;
"use client";

import React from "react";

import {MantineProvider} from "@mantine/core";

import theme from "./theme";

const Mantine = (props: React.PropsWithChildren) => {
  return (
    <MantineProvider defaultColorScheme={ "dark" } theme={ theme }>
      {props.children}
    </MantineProvider>
  );
};

export default Mantine;
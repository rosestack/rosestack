"use client";

import React from "react";

import { Center, Loader, useMantineTheme } from "@mantine/core";

const Loading = () => {
  const theme = useMantineTheme();

  return (
    <Center h={ "100%" }>
      <Loader color={ theme.primaryColor } size={ "md" } variant={ "oval" }/>
    </Center>
  );
};

export default Loading;
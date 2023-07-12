"use client";

import React from "react";

import { Group, Text, Anchor, Paper, Box } from "@mantine/core";

const Footer = () => {
  return (
    <Box py={ "md" }>
      <Paper bg={ "dark.8" } h={ "100%" } p={ "md" } radius={ "sm" }>
        <Group position={ "apart" }>
          <Group spacing={ "xs" }>
            <Text>
              This site is powered by <Anchor href={ "https://vercel.com?utm_source=rosestack&utm_campaign=oss" } target={ "_blank" }>Vercel</Anchor>.
            </Text>
          </Group>

          <Group spacing={ "xs" }>
            <Anchor href={ "https://meslzy.com" } target={ "_blank" }>Meslzy </Anchor>
          </Group>
        </Group>
      </Paper>
    </Box>
  );
};

export default Footer;
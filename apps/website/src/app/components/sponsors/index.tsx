"use client";

import React from "react";

import { Center, Button, Stack, Highlight, Text } from "@mantine/core";
import Link from "next/link";

const Sponsors = () => {
  return (
    <Center p={ "2rem" }>
      <Stack align={ "center" }>
        <Link href={ "https://github.com/sponsors/meslzy" } target={ "_blank" }>
          <Button radius={ "md" } size={ "md" } uppercase={ true } variant={ "outline" }>become the first sponsor</Button>
        </Link>

        <Highlight
          align={ "center" }
          component={ Text }
          highlight={ "Rosestack" }
          highlightStyles={
            (theme) => {
              return {
                background: "transparent",
                color: theme.colors.primary[theme.fn.primaryShade()],
              };
            }
          }
        >
          become a sponsor and keep Rosestack alive
        </Highlight>
      </Stack>
    </Center>
  );
};

export default Sponsors;
"use client";

import React from "react";

import type { Sx } from "@mantine/core";
import { Center, Highlight, Title, Text, Group, Badge, Stack } from "@mantine/core";

interface Props {
  name: string;
  description: string;
  stargazers_count: number;
}

const Header = (props: Props) => {
  const nameStyles: Sx = () => ({
    textTransform: "capitalize",
    lineHeight: "1",
  });

  const highlightStyles: Sx = (theme) => ({
    background: "transparent",
    color: theme.colors.primary[theme.fn.primaryShade()],
  });

  return (
    <Center py={ "xl" }>
      <Stack align={ "center" } spacing={ 2 }>
        <Highlight
          component={ Title }
          highlight={ "stack" }
          highlightStyles={ highlightStyles }
          order={ 1 }
          size={ "4rem" }
          sx={ nameStyles }
        >
          {props.name}
        </Highlight>

        <Text align={ "center" }>
          {props.description}
        </Text>

        <Group pt={ "md" }>
          <Badge radius={ "md" } size={ "lg" } variant={ "dot" }>
            <Group align={ "center" } spacing={ "sm" }>
              <Text>stars</Text>
              <Text>{props.stargazers_count}</Text>
            </Group>
          </Badge>
        </Group>
      </Stack>
    </Center>
  );
};

export default Header;
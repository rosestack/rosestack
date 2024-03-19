import React from "react";

import {Center, Title, Stack, Text, Badge, Group, Highlight} from "@mantine/core";

import {Repository} from "~types/github";

import {getName} from "~utils/rosestack";

interface HeaderProps {
  rosestack: Repository;
}

const Header = (props: HeaderProps) => {
  const {rosestack} = props;

  return (
    <Center component={ "header" } py={ "xl" }>
      <Stack align={ "center" } gap={ 4 }>
        <Highlight component={ Title } fz={ "4rem" } highlight={ getName(rosestack.name) } order={ 1 } tt={ "capitalize" }>
          {rosestack.name}
        </Highlight>

        <Text ta={ "center" }>
          {rosestack.description}
        </Text>

        <Group pt={ "sm" }>
          <Badge bg={ "dark.8" } radius={ "sm" } size={ "lg" } variant={ "dot" }>
            <Group align={ "center" } gap={ "xs" } justify={ "center" }>
              <Text>stars</Text>
              <Text>{rosestack.stargazers_count}</Text>
            </Group>
          </Badge>
          <Badge bg={ "dark.8" } radius={ "sm" } size={ "lg" } variant={ "dot" }>
            <Group align={ "center" } gap={ "xs" }>
              <Text>license</Text>
              <Text>{rosestack.license?.key}</Text>
            </Group>
          </Badge>
        </Group>
      </Stack>
    </Center>
  );
};

export type {
  HeaderProps,
};

export default Header;
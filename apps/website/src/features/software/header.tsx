import React from "react";

import Link from "next/link";
import Image from "next/image";

import {Flex, ActionIcon, Paper, Text, Group, Badge, Title, Highlight} from "@mantine/core";

import {IconHome, IconBrandGithub} from "@tabler/icons-react";

import {Repository} from "~types/github";

import {getRepositoryAvatar} from "~utils/github";
import {getName} from "~utils/rosestack";

interface HeaderProps {
  repository: Repository;
}

const Header = (props: HeaderProps) => {
  const {repository} = props;

  return (
    <Flex direction={ {base: "column", sm: "row"} } justify={ {base: "space-between"} } py={ "sm" } w={ "100%" }>
      <Flex align={ "center" } direction={ {base: "column", sm: "row"} } gap={ "md" } h={ "100%" } justify={ "center" }>
        <Paper bg={ "dark.8" } h={ "100%" } p={ "sm" } radius={ "sm" } shadow={ "sm" } w={ "fit-content" } withBorder={ true }>
          <Flex align={ "center" } direction={ {base: "row", sm: "column"} } gap={ "md" } h={ "100%" } justify={ {sm: "space-evenly"} }>
            <ActionIcon color={ "primary" } component={ Link } href={ "/" } radius={ "xl" } variant={ "filled" }>
              <IconHome size={ "75%" }/>
            </ActionIcon>
            <ActionIcon color={ "primary" } component={ Link } href={ repository.html_url } radius={ "xl" } variant={ "filled" }>
              <IconBrandGithub size={ "75%" }/>
            </ActionIcon>
          </Flex>
        </Paper>
        <Flex align={ {base: "center", sm: "flex-start"} } direction={ "column" } gap={ 0 } h={ "100%" } justify={ "space-between" }>
          <Highlight component={ Title } fz={ "3em" } highlight={ getName(repository.name) } order={ 1 } tt={ "capitalize" }>
            {repository.name}
          </Highlight>
          <Text>{repository.description}</Text>
          <Group pt={ "md" }>
            <Badge bg={ "dark.8" } radius={ "md" } size={ "lg" } variant={ "dot" }>
              <Group align={ "center" } gap={ "sm" }>
                <Text>stars</Text>
                <Text>{repository.stargazers_count}</Text>
              </Group>
            </Badge>
            <Badge bg={ "dark.8" } radius={ "md" } size={ "lg" } variant={ "dot" }>
              <Group align={ "center" } gap={ "sm" }>
                <Text>issues</Text>
                <Text>{repository.open_issues}</Text>
              </Group>
            </Badge>
            <Badge bg={ "dark.8" } radius={ "md" } size={ "lg" } variant={ "dot" }>
              <Group align={ "center" } gap={ "sm" }>
                <Text>license</Text>
                <Text>{repository.license.key}</Text>
              </Group>
            </Badge>
          </Group>
        </Flex>
      </Flex>
      <Paper bg={ "dark.8" } display={ {base: "none", sm: "unset"} } h={ "100%" } p={ "sm" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
        <Image alt={ repository.name } height={ 100 } src={ getRepositoryAvatar(repository) } width={ 100 }/>
      </Paper>
    </Flex>
  );
};

export type {
  HeaderProps,
};

export default Header;
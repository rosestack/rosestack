import React from "react";

import Link from "next/link";

import {ActionIcon, Paper, Text, Group, Box, Button, Menu, MenuTarget, MenuDropdown, MenuItem} from "@mantine/core";

import {IconArrowLeft} from "@tabler/icons-react";

import {Repository} from "~types/github";
import {Config, Page} from "~types/rosestack";

interface NavbarItemProps {
  repository: Repository;
  branch: string;
  pages: string[];
  page: Page;
}

const NavbarItem = (props: NavbarItemProps) => {
  const {repository, page, pages, branch} = props;

  if (!page.sub) {
    const isActive = pages.join("/") === page.url;

    return (
      <Button c={ isActive ? "primary.6" : "white" } component={ Link } href={ `/${repository.name}/${branch}/${page.url}` } variant={ "transparent" }>{page.name}</Button>
    );
  }

  const isActive = pages.join("/").startsWith(page.url);

  return (
    <Menu arrowPosition={ "center" } offset={ 4 } position={ "bottom-end" } shadow={ "md" } withArrow={ true }>
      <MenuTarget>
        <Button c={ isActive ? "primary.6" : "white" } variant={ "transparent" }>{page.name}</Button>
      </MenuTarget>

      <MenuDropdown bg={ "dark.9" } miw={ 120 }>
        {
          page.sub.map((subPage, index) => {
            const isActive = pages.join("/") === `${page.url}/${subPage.url}`;

            return (
              <MenuItem c={ isActive ? "primary.6" : "white" } component={ Link } href={ `/${repository.name}/${branch}/${page.url}/${subPage.url}` } key={ index }>
                {subPage.name}
              </MenuItem>
            );
          })
        }
      </MenuDropdown>
    </Menu>
  );
};

interface HeaderProps {
  repository: Repository;
  config: Config;
  branch: string;
  pages: string[];
}

const Header = (props: HeaderProps) => {
  const {repository, branch, config, pages} = props;

  return (
    <Box py={ "sm" }>
      <Paper bg={ "dark.8" } p={ "sm" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
        <Group align={ "center" } gap={ "md" } justify={ "space-between" }>
          <Group align={ "center" } gap={ "xs" }>
            <ActionIcon color={ "primary" } component={ Link } href={ `/${repository.name}` } radius={ "xl" } variant={ "filled" }>
              <IconArrowLeft size={ "75%" }/>
            </ActionIcon>
            <Text tt={ "capitalize" }>{repository.name}</Text>
          </Group>

          <Group gap={ "md" }>
            {
              config.navbar.map((page, index) => {
                return (
                  <NavbarItem branch={ branch } key={ index } page={ page } pages={ pages } repository={ repository }/>
                );
              })
            }
          </Group>
        </Group>
      </Paper>
    </Box>
  );
};

export type {
  HeaderProps,
};

export default Header;
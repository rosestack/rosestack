import React from "react";

import Link from "next/link";

import {Paper, Text, Group, Box, Button, Menu, MenuTarget, MenuDropdown, MenuItem} from "@mantine/core";

import {Config, Page} from "~types/rosestack";

interface NavbarItemProps {
  port: string;
  pages: string[];
  page: Page;
}

const NavbarItem = (props: NavbarItemProps) => {
  const {port, page, pages} = props;

  if (!page.sub) {
    const isActive = pages.join("/") === page.url;

    return (
      <Button c={ isActive ? "primary.6" : "white" } component={ Link } href={ `/preview/${port}/${page.url}` } variant={ "transparent" }>{page.name}</Button>
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
              <MenuItem c={ isActive ? "primary.6" : "white" } component={ Link } href={ `/preview/${port}/${page.url}/${subPage.url}` } key={ index }>
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
  port: string;
  config: Config;
  pages: string[];
}

const Header = (props: HeaderProps) => {
  const {port, config, pages} = props;

  return (
    <Box py={ "sm" }>
      <Paper bg={ "dark.8" } p={ "sm" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
        <Group align={ "center" } gap={ "md" } justify={ "space-between" }>
          <Group align={ "center" } gap={ "xs" }>
            <Text tt={ "capitalize" }>Preview</Text>
          </Group>

          <Group gap={ "md" }>
            {
              config.navbar.map((page, index) => {
                return (
                  <NavbarItem key={ index } page={ page } pages={ pages } port={ port }/>
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
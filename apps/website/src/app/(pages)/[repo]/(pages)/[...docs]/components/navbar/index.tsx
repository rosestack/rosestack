"use client";

import React from "react";

import Link from "next/link";

import { Paper, Text, Box, ActionIcon, Group, Menu, Button, Center } from "@mantine/core";

import { BiLeftArrowAlt } from "react-icons/bi";

import type { Repo, BarItem } from "~api/github";
import { AiFillEye } from "react-icons/ai";

interface Props {
  repo: Repo;
  navbarItems?: BarItem[];
  docPath: string[];
}

interface NavbarItem extends BarItem {
  repo: Repo;
  docPath: string[];
}

const NavbarItem = (props: NavbarItem) => {
  if ( !props.sub ) {
    const isActive = props.docPath.join("/") === props.url;

    return (
      <Link href={ `/${ props.repo.name }/${ props.url }` }>
        <Button variant={ isActive ? "light" : "subtle" }>{props.name}</Button>
      </Link>
    );
  }

  const isActive = props.docPath.join("/").startsWith(props.url);

  return (
    <Menu arrowPosition={ "center" } position={ "bottom-end" } shadow={ "md" } withArrow={ true }>
      <Menu.Target>
        <Button variant={ isActive ? "light" : "subtle" }>{props.name}</Button>
      </Menu.Target>

      <Menu.Dropdown bg={ "dark.9" } miw={ 120 }>
        {
          props.sub.map((item, index) => {
            const isActive = props.docPath.join("/") === `${ props.url }/${ item.url }`;

            const selectedIcon = (
              <Center h={ "100%" }>
                <AiFillEye/>
              </Center>
            );

            return (
              <Link href={ `/${ props.repo.name }/${ props.url }/${ item.url }` } key={ index }>
                <Menu.Item color={ isActive ? "primary" : "" } rightSection={ isActive ? selectedIcon : null }>
                  {item.name}
                </Menu.Item>
              </Link>
            );
          })
        }
      </Menu.Dropdown>
    </Menu>
  );
};

const Navbar = (props: Props) => {
  return (
    <Box py={ "md" }>
      <Paper bg={ "dark.8" } p={ "md" } radius={ "sm" } shadow={ "sm" }>
        <Group position={ "apart" } spacing={ "md" }>
          <Group spacing={ "xs" }>
            <Link href={ `/${ props.repo.name }` }>
              <ActionIcon color={ "primary" } radius={ "xl" } variant={ "light" }>
                <BiLeftArrowAlt size={ 24 }/>
              </ActionIcon>
            </Link>

            <Text transform={ "capitalize" }>{props.repo.name}</Text>
          </Group>

          <Group spacing={ "md" }>
            {
              props.navbarItems?.map((item, index) => {
                return (
                  <NavbarItem docPath={ props.docPath } key={ index } repo={ props.repo } { ...item }/>
                );
              })
            }
          </Group>
        </Group>
      </Paper>
    </Box>
  );
};

export default Navbar;
"use client";

import React from "react";

import Link from "next/link";

import {useRouter} from "next/navigation";

import {Paper, Flex, Text, Select, Divider, ScrollArea, NavLink} from "@mantine/core";

import {Repository} from "~types/github";

import {Page, Config} from "~types/rosestack";

interface SidebarItemProps {
  repository: Repository;
  branch: string;
  pages: string[];
  page: Page;
}

const SidebarItem = (props: SidebarItemProps) => {
  const {repository, page, branch, pages} = props;

  if (page.sub) {
    const isActive = pages.join("/").startsWith(page.url);

    return (
      <NavLink active={ isActive } defaultOpened={ isActive } label={ page.name } variant={ "light" }>
        {
          page.sub.map((subItem, index) => {
            subItem.url = [page.url, subItem.url].join("/");

            return (
              <SidebarItem branch={ branch } key={ index } page={ subItem } pages={ pages } repository={ repository }/>
            );
          })
        }
      </NavLink>
    );
  }

  const isActive = page.url === pages.join("/");

  return (
    <NavLink
      active={ isActive }
      component={ Link }
      defaultOpened={ isActive }
      href={ `/${repository.name}/${branch}/${page.url}` }
      label={ page.name }
      variant={ "light" }
    />
  );
};

interface SidebarProps {
  repository: Repository;
  config: Config;
  branches: string[];
  branch: string;
  pages: string[];
}

const Sidebar = (props: SidebarProps) => {
  const {repository, config, branches, branch, pages} = props;

  const router = useRouter();

  const setBranch = (branch: string) => {
    if (!branch) {
      return;
    }

    router.push(`/${repository.name}/${branch}/${pages.join("/")}`);
  };

  return (
    <Paper bg={ "dark.8" } p={ "sm" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
      <Flex direction={ "column" } h={ "100%" }>
        <Text mb={ "xs" } ta={ "center" }>
          Version
        </Text>

        <Select
          data={ branches }
          value={ branch }
          variant={ "filled" }
          onChange={ setBranch }
        />

        <Divider my={ "md" }/>

        <Flex flex={ 1 } style={ {position: "relative"} }>
          <ScrollArea inset={ 0 } pos={ "absolute" } scrollbars={ "y" }>
            {
              config.sidebar.map((page, index) => (
                <SidebarItem branch={ branch } key={ index } page={ page } pages={ pages } repository={ repository }/>
              ))
            }
          </ScrollArea>
        </Flex>
      </Flex>
    </Paper>
  );
};

export default Sidebar;
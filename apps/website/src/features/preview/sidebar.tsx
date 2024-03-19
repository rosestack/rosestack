import React from "react";

import Link from "next/link";

import {Paper, ScrollArea, NavLink} from "@mantine/core";

import {Page, Config} from "~types/rosestack";

interface SidebarItemProps {
  port: string;
  pages: string[];
  page: Page;
}

const SidebarItem = (props: SidebarItemProps) => {
  const {port, page, pages} = props;

  if (page.sub) {
    const isActive = pages.join("/").startsWith(page.url);

    return (
      <NavLink active={ isActive } defaultOpened={ isActive } label={ page.name } variant={ "light" }>
        {
          page.sub.map((subItem, index) => {
            subItem.url = [page.url, subItem.url].join("/");

            return (
              <SidebarItem key={ index } page={ subItem } pages={ pages } port={ port }/>
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
      href={ `/preview/${port}/${page.url}` }
      label={ page.name }
      variant={ "light" }
    />
  );
};

interface SidebarProps {
  port: string;
  config: Config;
  pages: string[];
}

const Sidebar = (props: SidebarProps) => {
  const {port, config, pages} = props;

  return (
    <Paper bg={ "dark.8" } p={ "sm" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
      <ScrollArea scrollbars={ "y" }>
        {
          config.sidebar.map((page, index) => (
            <SidebarItem key={ index } page={ page } pages={ pages } port={ port }/>
          ))
        }
      </ScrollArea>
    </Paper>
  );
};

export default Sidebar;
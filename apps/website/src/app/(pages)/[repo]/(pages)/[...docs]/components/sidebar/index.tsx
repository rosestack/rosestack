"use client";

import React from "react";

import Link from "next/link";

import { Paper, NavLink, ScrollArea, Divider, Select, Text } from "@mantine/core";

import type { BarItem, Repo } from "~api/github";
import { AiFillEye } from "react-icons/ai";

interface SidebarItemProps extends BarItem {
  repo: Repo;
  docPath: string[];
}

const SidebarItem = (props: SidebarItemProps) => {
  if ( props.sub ) {
    const isActive = props.docPath.join("/").startsWith(props.url);

    return (
      <NavLink active={ isActive } defaultOpened={ isActive } label={ props.name } variant={ "light" }>
        {
          props.sub.map((sidebarItem, index) => {
            return (
              <SidebarItem { ...sidebarItem } docPath={ props.docPath } key={ index } repo={ props.repo } url={ [ props.url, sidebarItem.url ].join("/") }/>
            );
          })
        }
      </NavLink>
    );
  }

  const isActive = props.url === props.docPath.join("/");

  return (
    <Link href={ `/${ props.repo.name }/${ props.url }` }>
      <NavLink
        active={ isActive }
        defaultOpened={ isActive }
        label={ props.name }
        variant={ "light" }
        rightSection={
          (
            isActive ? (
              <AiFillEye/>
            ) : null
          )
        }
      />
    </Link>
  );
};

interface Props {
  repo: Repo;
  //
  docPath: string[];
  sidebarItems?: BarItem[];
  //
  branches?: string[];
  activeBranch: string;
  setActiveBranch: (activeBranch: string) => void;
}

const Sidebar = (props: Props) => {
  if ( !props.sidebarItems ) {
    return null;
  }

  return (
    <Paper bg={ "dark.8" } h={ "100%" } miw={ 200 } p={ "md" } radius={ "sm" } shadow={ "sm" }>
      <Text align={ "center" } color={ "primary" } mb={ "xs" }>
        Version
      </Text>

      <Select
        defaultValue={ props.activeBranch }
        variant={ "filled" }
        data={
          (props.branches ?? []).map((branch) => {
            return branch;
          })
        }
        onChange={ props.setActiveBranch }
      />

      <Divider my={ "md" }/>

      <ScrollArea h={ "100%" } offsetScrollbars={ true }>
        {
          props.sidebarItems.map((sidebarItem, index) => (
            <SidebarItem { ...sidebarItem } docPath={ props.docPath } key={ index } repo={ props.repo }/>
          ))
        }
      </ScrollArea>
    </Paper>
  );
};

export default Sidebar;
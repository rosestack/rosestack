"use client";

import React from "react";

import useSWR from "swr";

import { Flex, Center, Loader } from "@mantine/core";

import type { Repo } from "~api/github";
import { fetchDocsConfig } from "~api/github";

import Layout from "~app/components/layout";
import Footer from "~app/components/footer";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Main from "./components/main";

interface Props {
  repo: Repo;
  selectedVersion: string | undefined;
  branches: string[];
  docPath: string[];
}

const Client = (props: Props) => {
  const version = props.selectedVersion ?? props.repo.default_branch!;

  const [ activeBranch, setActiveBranch ] = React.useState<string>(version);

  const docsConfig = useSWR(activeBranch, (activeBranch) => {
    return fetchDocsConfig(props.repo.name, activeBranch);
  });

  const header = (
    <Navbar
      docPath={ props.docPath }
      navbarItems={ docsConfig.data?.navbar }
      repo={ props.repo }
    />
  );

  const footer = (
    <Footer/>
  );

  return (
    <Layout footer={ footer } header={ header }>
      {
        docsConfig.isLoading ? (
          <Center h={ "100%" }>
            <Loader/>
          </Center>
        ) : (
          <Flex gap={ "md" } h={ "100%" } sx={ { flex: 1, position: "relative", overflow: "hidden" } }>
            <Sidebar
              activeBranch={ activeBranch }
              branches={ props.branches }
              docPath={ props.docPath }
              repo={ props.repo }
              setActiveBranch={ setActiveBranch }
              sidebarItems={ docsConfig.data?.sidebar }
            />

            <Main
              activeBranch={ activeBranch }
              docPath={ props.docPath }
              navbarItems={ docsConfig.data?.navbar }
              repo={ props.repo }
              sidebarItems={ docsConfig.data?.sidebar }
            />
          </Flex>
        )
      }
    </Layout>
  );
};

export default Client;
import React from "react";

import {Flex, Center} from "@mantine/core";

import MainLayout from "~layouts/main";

import Header from "~features/preview/header";
import Sidebar from "~features/preview/sidebar";
import Document from "~features/preview/document";

import {fetchConfig} from "~api/local";

interface Props {
  params: {
    port: string;
    pages: string[];
  };
}

const Page = async (props: Props) => {
  const {port, pages} = props.params;

  const config = await fetchConfig(port);

  return (
    <MainLayout header={ <Header config={ config } pages={ pages } port={ port }/> }>
      <Flex flex={ 1 } gap={ "sm" } w={ "100%" }>
        <Sidebar config={ config } pages={ pages } port={ port }/>
        <Flex component={ Center } flex={ 1 }>
          <Document config={ config } pages={ pages } port={ port }/>
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export default Page;
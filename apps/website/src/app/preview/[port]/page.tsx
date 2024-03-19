import React from "react";

import MainLayout from "~layouts/main";

import {fetchConfig} from "~api/local";

import Header from "~features/preview/header";
import Sidebar from "~features/preview/sidebar";
import Document from "~features/preview/document";

import {Center, Flex} from "@mantine/core";

interface Props {
  params: {
    port: string;
  };
}

const Page = async (props: Props) => {
  const {port} = props.params;

  const config = await fetchConfig(port);

  return (
    <MainLayout header={ <Header config={ config } pages={ [] } port={ port }/> }>
      <Flex flex={ 1 } gap={ "sm" } w={ "100%" }>
        <Sidebar config={ config } pages={ [] } port={ port }/>
        <Flex component={ Center } flex={ 1 }>
          <Document config={ config } pages={ [] } port={ port }/>
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export default Page;
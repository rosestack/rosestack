import React from "react";
import {Center, Loader} from "@mantine/core";

const Loading = () => {
  return (
    <Center h={ "100%" }>
      <Loader size={ "md" } variant={ "oval" }/>
    </Center>
  );
};

export default Loading;
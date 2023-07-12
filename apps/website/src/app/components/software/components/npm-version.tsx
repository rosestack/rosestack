"use client";

import React from "react";

import { Badge, Loader } from "@mantine/core";
import { useNpmVersion } from "~api/npm";

interface Props {
  npm: string;
}

const NpmVersion = ( props: Props ) => {
  const { data, error, isLoading } = useNpmVersion( props.npm.replace( "https://www.npmjs.com/package/", "" ));

  if ( isLoading ) {
    return (
      <Loader size={ "xs" }/>
    );
  }

  if ( error ) {
    return (
      <Badge radius={ "md" } variant={ "outline" }>error</Badge>
    );
  }

  return (
    <Badge radius={ "md" } variant={ "outline" }>{data}</Badge>
  );
};

export default NpmVersion;
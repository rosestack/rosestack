"use client";

import React from "react";

import Link from "next/link";

import {Center, Text, Stack, Button} from "@mantine/core";

const NotFound = () => {
  return (
    <Center h={ "100%" } key={ "error" } w={ "100%" }>
      <Stack align={ "center" }>
        <Text>We could not find the page you were looking for.</Text>
        <Link href={ "/" }>
          <Button>Go back home</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default NotFound;
import React from "react";

import Link from "next/link";

import {Center, Button, Stack, Text} from "@mantine/core";

const Sponsors = () => {
  return (
    <Center p={ "2rem" }>
      <Stack align={ "center" }>
        <Link href={ "https://github.com/sponsors/meslzy" } target={ "_blank" }>
          <Button radius={ "md" } size={ "md" } tt={ "capitalize" } variant={ "filled" }>become the first sponsor</Button>
        </Link>

        <Text ta={ "center" }>
          become a sponsor and keep <Text c={ "primary.6" } span={ true }>Rosestack</Text> alive
        </Text>
      </Stack>
    </Center>
  );
};

export default Sponsors;
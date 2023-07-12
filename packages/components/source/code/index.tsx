import React from "react";

import type { RestEndpointMethodTypes } from "@octokit/rest";

import type { Sx } from "@mantine/core";
import { Paper, Center, Loader, Text, Stack, Anchor, Button } from "@mantine/core";
import type { PrismProps } from "@mantine/prism";
import { Prism } from "@mantine/prism";

const Code = (props: PrismProps) => {
  const style: Sx = {
    userSelect: "text",
    ["*"]: {
      userSelect: "text",
    },
  };

  return (
    <Prism sx={ style } { ...props } children={ props.children }/>
  );
};

interface RemoteCodeProps extends Omit<PrismProps, "children"> {
  repo: RestEndpointMethodTypes["repos"]["get"]["response"]["data"];
  fullname: string;
  branch: string;
  file: string;
  url: string;
}

const RemoteCode = (props: RemoteCodeProps) => {
  const [ loading, setLoading ] = React.useState<boolean>(true);
  const [ error, setError ] = React.useState<boolean>(false);
  const [ code, setCode ] = React.useState<string>("");

  React.useEffect(() => {
    const url = new URL("https://raw.githubusercontent.com");
    url.pathname = `${ props.fullname }/${ props.branch }/${ props.url }`;

    fetch(url).then(async (response) => {
      if ( response.ok ) {
        const text = await response.text();
        setCode(text);
        setLoading(false);
      } else {
        setError(true);
      }
    }).catch(() => {
      setError(true);
    });
  }, [props]);

  if ( error ) {
    const issueUrl = new URL(`${ props.repo.html_url }/issues/new`);

    issueUrl.searchParams.set("title", `Failed to load code from ${ props.url }`);
    issueUrl.searchParams.set("body", `Failed to load code ${ props.url } in ${ props.file } ${ props.branch } branch`);
    issueUrl.searchParams.set("labels", "documentation,bug");

    return (
      <Paper bg={ "dark.8" } p={ "md" }>
        <Center>
          <Stack align={ "center" }>
            <Text>Failed to load code, if this error persists, please open an issue on Github</Text>
            <Button uppercase={ true } w={ "fit-content" }>
              <Anchor href={ issueUrl.href } target={ "_blank" }>
                create issue
              </Anchor>
            </Button>
          </Stack>
        </Center>
      </Paper>
    );
  }

  if ( loading ) {
    return (
      <Paper bg={ "dark.8" } p={ "md" }>
        <Center>
          <Loader/>
        </Center>
      </Paper>
    );
  }

  return (
    <Code { ...props }>
      {code}
    </Code>
  );
};

export type {
  PrismProps,
  RemoteCodeProps,
};

export {
  Code,
  RemoteCode,
};
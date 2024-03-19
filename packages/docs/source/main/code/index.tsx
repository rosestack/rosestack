import React from "react";

import {Paper, Center, Loader, Text, Stack, Anchor, Button} from "@mantine/core";

import {CodeHighlight, CodeHighlightProps} from "@mantine/code-highlight";

interface CodeProps extends CodeHighlightProps {
  children: string;
}

const Code = (props: CodeProps) => {
  return (
    <CodeHighlight { ...props } bg={ "dark.9" } code={ props.children }/>
  );
};

interface RemoteCodeProps extends Omit<CodeHighlightProps, "children"> {
  fullname: string;
  html_url: string;
  branch: string;
  file: string;
  url: string;
}

const RemoteCode = (props: RemoteCodeProps) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>("");

  React.useEffect(() => {
    const url = new URL("https://raw.githubusercontent.com");

    url.pathname = `${props.fullname}/${props.branch}/${props.url}`;

    fetch(url).then(async (response) => {
      if (response.ok) {
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

  if (error) {
    const issueUrl = new URL(`${props.html_url}/issues/new`);

    issueUrl.searchParams.set("title", `Failed to load code from ${props.url}`);
    issueUrl.searchParams.set("body", `Failed to load code ${props.url} in ${props.file} ${props.branch} branch`);
    issueUrl.searchParams.set("labels", "documentation,bug");

    return (
      <Paper bg={ "dark.8" } p={ "md" }>
        <Center>
          <Stack align={ "center" }>
            <Text>Failed to load code, if this error persists, please open an issue on Github</Text>
            <Button tt={ "uppercase" } w={ "fit-content" }>
              <Anchor href={ issueUrl.href } target={ "_blank" }>
                create issue
              </Anchor>
            </Button>
          </Stack>
        </Center>
      </Paper>
    );
  }

  if (loading) {
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
  CodeProps,
  RemoteCodeProps,
};

export {
  Code,
  RemoteCode,
};
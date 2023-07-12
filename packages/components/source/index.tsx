/* eslint no-var: 0 */

import type { RestEndpointMethodTypes } from "@octokit/rest";

import { Paper, Loader, Center, Title, Text, Tabs, List, Space, Anchor, Alert, Stack } from "@mantine/core";

import { WarningAlert, DangerAlert, InfoAlert } from "./alerts";

import { Code, RemoteCode } from "./code";

declare global {
  var state: Record<string, any>;
  var setState: (state: Record<string, any>) => void;

  var repo: RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"][number];
  var branch: string;
  var file: string;
}

const components = {
  Code,
  RemoteCode,
  //
  InfoAlert,
  WarningAlert,
  DangerAlert,
  //
  Loader,
  //
  Stack,
  Paper,
  Title,
  Center,
  Text,
  Tabs,
  List,
  Space,
  Anchor,
  Alert,
};

export {
  Code,
  RemoteCode,
  //
  InfoAlert,
  WarningAlert,
  DangerAlert,
  //
  Loader,
  //
  Stack,
  Paper,
  Title,
  Center,
  Text,
  Tabs,
  List,
  Space,
  Anchor,
  Alert,
};

export default components;
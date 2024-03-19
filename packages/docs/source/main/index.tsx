import {Paper, Loader, Center, Title, Text, Tabs, TabsList, TabsTab, List, ListItem, Space, Anchor, Alert, Stack, TabsPanel} from "@mantine/core";

import {WarningAlert, DangerAlert, InfoAlert} from "./alerts";

import {Code, RemoteCode} from "./code";

declare global {
  var state: Record<string, any>;
  var setState: (state: Record<string, any>) => void;
  var repository: any;
  var branch: string;
  var file: string;
  var local: boolean;
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
  TabsList,
  TabsPanel,
  TabsTab,
  List,
  ListItem,
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
  TabsList,
  TabsPanel,
  TabsTab,
  List,
  ListItem,
  Space,
  Anchor,
  Alert,
};

export default components;
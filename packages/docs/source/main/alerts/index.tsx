import {Alert, AlertProps} from "@mantine/core";

import {IconAlertCircle, IconAlertTriangle, IconAlertSquare} from "@tabler/icons-react";

const InfoAlert = (props: AlertProps) => {
  return (
    <Alert color={ "blue" } icon={ <IconAlertSquare/> } radius={ "md" } variant={ "light" }>
      {props.children}
    </Alert>
  );
};

const WarningAlert = (props: AlertProps) => {
  return (
    <Alert color={ "yellow" } icon={ <IconAlertCircle/> } radius={ "md" } variant={ "light" }>
      {props.children}
    </Alert>
  );
};

const DangerAlert = (props: AlertProps) => {
  return (
    <Alert color={ "red" } icon={ <IconAlertTriangle/> } radius={ "md" } variant={ "light" }>
      {props.children}
    </Alert>
  );
};

export {
  InfoAlert,
  WarningAlert,
  DangerAlert,
};
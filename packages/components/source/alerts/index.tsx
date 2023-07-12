import type { AlertProps } from "@mantine/core";
import { Alert } from "@mantine/core";

import { AiFillWarning } from "react-icons/ai";
import { CgDanger } from "react-icons/cg";

const InfoAlert = (props: AlertProps) => {
  return (
    <Alert
      color={ "blue" }
      icon={ <AiFillWarning/> }
      radius={ "md" }
      variant={ "light" }
      { ...props }
    />
  );
};

const WarningAlert = (props: AlertProps) => {
  return (
    <Alert
      color={ "yellow" }
      icon={ <AiFillWarning/> }
      radius={ "md" }
      variant={ "light" }
      { ...props }
    />
  );
};

const DangerAlert = (props: AlertProps) => {
  return (
    <Alert
      color={ "red" }
      icon={ <CgDanger/> }
      radius={ "md" }
      variant={ "light" }
      { ...props }
    />
  );
};

export {
  InfoAlert,
  WarningAlert,
  DangerAlert,
};
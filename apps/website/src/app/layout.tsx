import React from "react";
import {Kanit} from "next/font/google";

import Mantine from "~theme/mantine";

import Particles from "~components/particles";

import "./global.css";

const kanit = Kanit({
  display: "auto",
  subsets: ["latin", "thai"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
});

const Layout = (props: React.PropsWithChildren) => {
  return (
    <html lang={ "en" }>
      <body className={ kanit.className }>
        <Mantine>
          <Particles/>
          {props.children}
        </Mantine>
      </body>
    </html>
  );
};

export default Layout;

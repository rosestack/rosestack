import React from "react";

import { Kanit } from "next/font/google";

import Emotion from "./styles/emotion";
import Mantine from "./styles/mantine";

import Particles from "~components/particles";

const kanit = Kanit({
  display: "auto",
  subsets: [ "latin", "thai" ],
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
        <Emotion>
          <Mantine>
            <Particles/>
            {props.children}
          </Mantine>
        </Emotion>
      </body>
    </html>
  );
};

export default Layout;

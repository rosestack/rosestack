"use client";

import React from "react";

import { useMantineTheme } from "@mantine/core";

import type { IParticlesProps } from "react-tsparticles";
import ReactParticles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particles = () => {
  const init = React.useCallback((engine: any) => {
    return loadFull(engine);
  }, []);

  const theme = useMantineTheme();

  const options: IParticlesProps["options"] = {
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    backgroundMode: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      fpsLimit: 60,
      shape: {
        type: "circle",
      },
      number: {
        value: 100,
      },
      size: {
        value: 4,
      },
      color: {
        value: theme.colors.primary[theme.fn.primaryShade()],
      },
      move: {
        enable: true,
        direction: "none",
        outMode: "bounce",
        straight: false,
        random: false,
        speed: 2,
      },
    },
    smooth: true,
  };

  return (
    <ReactParticles init={ init } options={ options }/>
  );
};

export default Particles;
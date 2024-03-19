"use client";

import React from "react";

import {useMantineTheme} from "@mantine/core";

import ReactParticles, {initParticlesEngine} from "@tsparticles/react";

import type {ISourceOptions} from "@tsparticles/engine";

import {loadSlim} from "@tsparticles/slim";

const Particles = () => {
  const [loading, setLoading] = React.useState(true);

  const theme = useMantineTheme();

  const options = React.useMemo<ISourceOptions>(() => {
    return {
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
          value: theme.colors.primary[6],
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
  }, [theme]);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ReactParticles
      options={ options }
    />
  );
};

export default Particles;

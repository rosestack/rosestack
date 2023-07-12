"use client";

import React from "react";

import { useServerInsertedHTML } from "next/navigation";

import { CacheProvider } from "@emotion/react";
import { useEmotionCache } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

const EmotionStyles = ( props: Props ) => {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => {
    const dataEmotion = `${ cache.key } ${ Object.keys( cache.inserted ).join( " " ) }`;

    const dangerouslySetInnerHTML = {
      __html: Object.values( cache.inserted ).join( " " ),
    };

    return (
      <style dangerouslySetInnerHTML={ dangerouslySetInnerHTML } data-emotion={ dataEmotion }/>
    );
  });

  return (
    <CacheProvider value={ cache }>
      {props.children}
    </CacheProvider>
  );
};

export default EmotionStyles;
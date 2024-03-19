#!/usr/bin/env node

import express from "express";

import path from "node:path";

const app = express();

const cwd = process.cwd();

app.use(express.static(cwd));

app.use("/docs/snippet", express.static(path.join(cwd, "snippet")));

const server = app.listen();

server.on("listening", () => {
  const address = server.address();

  if (!address) {
    throw new Error("Server is not listening");
  }

  if (typeof address !== "object") {
    throw new Error("Server address is not an object");
  }

  console.log(`http://localhost:3000/preview/${address.port}`);
});
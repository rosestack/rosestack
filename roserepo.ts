import {defineRoserepo, Runner, Cache} from "roserepo";

export default defineRoserepo({
  root: true,
  runner: {
    dev: Runner.many({
      parallel: false,
      throwOnError: true,
    }),
    start: Runner.pipeline({
      parallel: false,
      throwOnError: true,
      self: "build",
    }),
    build: Runner.many({
      parallel: true,
      throwOnError: true,
      cache: Cache.file({
        include: [
          "src/**/*",
        ],
      }),
    }),
    lint: Runner.many({
      parallel: false,
      throwOnError: true,
    }),
  },
});
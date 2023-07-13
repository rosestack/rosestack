import { defineRoserepo, Runner, Cache } from "roserepo";

export default defineRoserepo({
  root: true,
  monorepo: {
    runner: {
      dev: Runner.many({
        parallel: false,
        throwOnError: true,
      }),
      start: Runner.pipeline({
        parallel: false,
        throwOnError: true,
        selfScript: "build",
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
    upgrade: {
      excludeDependencies: [
        "chalk",
      ],
    },
  },
});
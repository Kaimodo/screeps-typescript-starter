
import * as Inscribe from "screeps-inscribe";
import * as Config from "settings/config";

import * as L from "lib/index";

import * as M from "memory";

import { ENABLE_DEBUG_MODE } from "settings/config";

global.Profiler = L.Profiler.init();

L.log.info("load");
L.Utils.CpuUsedParsing();

// This is an example for using a config variable from `config.ts`.
if (Config.USE_PATHFINDER) {
  PathFinder.use(true);
}

// Credits X-ample
if (ENABLE_DEBUG_MODE) {
  L.log.info(`[${Inscribe.color("main", "skyblue")}] https://github.com/resir014/screeps-inscribe`);
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = L.ErrorMapper.wrapLoop(() => {
  // Console Commands needs to be set every Tick, duno why
  // For Testing Type 'cc.test()' in the Ingame-Console
  global.cc = L.ConsoleCommands;

  // Main Loop here
  L.profileRecord("clearNoExistingCreepMemory", true);
  L.Utils.clearNoExistingCreepMemory();
  L.profileRecord("clearNoExistingCreepMemory", false);
  // Show some CPU Info
  L.Utils.log_info();

  // X-Ample of Grafana
  L.Grafana.run();
});

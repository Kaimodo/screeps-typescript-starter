
import * as Inscribe from "screeps-inscribe";
import * as Config from "settings/config";

import * as L from "lib/index";

import * as M from "memory";

import * as RoomManager from "components/RoomManager";

global.Profiler = L.Profiler.init();

L.log.info("load");
L.Utils.CpuUsedParsing();

// This is an example for using a config variable from `config.ts`.
if (Config.USE_PATHFINDER) {
  PathFinder.use(true);
}

// Credits X-ample
L.log.info(
  `[${Inscribe.color(
    "main",
    "skyblue"
  )}] https://github.com/resir014/screeps-inscribe`
);

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = L.ErrorMapper.wrapLoop(() => {
  // Console Commands needs to be set every Tick, duno why
  // For Testing Type 'cc.test()' in the Ingame-Console
  global.cc = L.ConsoleCommands;

  // Basic Memory Resetting
  if (M.m().memVersion === undefined || M.m().memVersion !== M.MemoryVersion) {
    L.Utils.memoryInit();
  }
  if (!M.m().uuid || M.m().uuid > 1000) {
    M.m().uuid = 0;
  }
  L.log.info(`Current game tick is ${Game.time}`);
  // Main run
  for (const i in Game.rooms) {
    const room: Room = Game.rooms[i];
    const rm: M.RoomMemory = M.m().rooms[room.name];
    if (rm === undefined) {
      L.log.info(`Init room mem for ${room.name}`);
      Memory.rooms[room.name] = {};
      RoomManager.initRoomMemory(room, room.name);
    } else {
      RoomManager.run(room, rm);
    }

    if (Game.time % 10 === 0) {
      RoomManager.cleanupAssignMiners(rm);
    }
  }
  // Automatically delete memory of missing creeps
  L.Utils.clearStaleCreepMemory();

  // Show some CPU Info
  L.Utils.log_info();

  // X-Ample of Grafana
  L.Grafana.run();
});

import { log } from "lib/log/log";
import * as Inscribe from "screeps-inscribe";
import * as M from "Memory";

const Colors = [
    "cyan",
    "red",
    "green",
    "yellow",
    "white",
    "purple",
    "pink",
    "orange"
];

export const ConsoleCommands = {
  removeConstructionSites(roomName: string, leaveProgressStarted = true, structureType?: string) {
    Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES).forEach((site) => {
      if ((!structureType || (site as ConstructionSite).structureType === structureType) &&
          (!leaveProgressStarted || (site as ConstructionSite).progress === 0)) {
        (site as ConstructionSite).remove();
      }
    });
  },

  rc(roomName: string, leaveProgressStarted: boolean, structureType: string) {
    this.removeConstructionSites(roomName, leaveProgressStarted, structureType);
  },

  resetMemory() {
    for (const entry in Memory)
    {
        delete Memory[entry];
    }
  },

  test() {
    log.info(`[${Inscribe.color("CC", "red")}] Commands working`);
  },

  setMem(param: number) {
    M.setMemVersion(param);
    log.info(`[${Inscribe.color("CC", "blue")}] Setting Game-Memory-Version to ${M.MemoryVersion}`);
  },

  getMem() {
    log.info(`[${Inscribe.color("CC", "green")}] Game-Memory-Version: ${M.MemoryVersion}`);
  },

  killall(roomName?: string) {
    _.forEach(Game.creeps, (c: Creep) => {
      if ((roomName && c.room.name === roomName) || !roomName) {
        c.suicide();
      }
    });
  }
};

import * as Config from "settings/config";
import { log } from "lib/log/log";

import * as Inscribe from "screeps-inscribe";

import * as M from "Memory";

export class LinkGenerator {
  /** Creates an HTML link to the room. */
  public static linkRoom(room: string | Room, innerText?: string): string {
    if (room instanceof Room) {
      return this.linkRoom(room.name);
    }
    return `<a href="#!/room/${Game.shard.name}/${room}">${
      innerText ? innerText : room
    }</a>`;
  }
} // LinkGenerator

export function log_info() {
    // Periodic logging of useful info
    if ((Game.time % 100) === 0) {
      // CPU: limit: 30, tickLimit: 500, bucket: 10000, used: 4.08803
      console.log("CPU: limit: " + Game.cpu.limit + ", tickLimit: " + Game.cpu.tickLimit +
        ", bucket: " + Game.cpu.bucket + ", used: " + Game.cpu.getUsed());
    }
} // log_info()

export function logHelper(Param: any): any {
  if (Config.ENABLE_DEBUG_MODE) {
    log.debug(`[${Inscribe.color("logHelper", "red")}] ${Param} `);
    return Param;
  }
} // logHelper()

export function CpuUsedParsing(): void {
  let stringified = JSON.stringify(Memory);
  let startCpu = Game.cpu.getUsed();
  JSON.parse(stringified);
  log.info("CPU spent on Memory parsing:", Game.cpu.getUsed() - startCpu);
} // CpuUsedParsing()

export function logFive(): boolean {
  if (Game.time % 100 === 0) {
    return true;
  } else {
    return false;
  }
} // logFive()

export function clearStaleCreepMemory() {
    if (Game.time % 100 === 0) {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                log.info("Clearing non-existing creep memory:", name);
                delete Memory.creeps[name];
            }
        }
    }
} // clearStaleCreepMemory()

export function memoryInit() {
    log.info(`[${Inscribe.color("memoryInit", "blue")}]initing game`);
    delete Memory.flags;
    delete Memory.spawns;
    delete Memory.creeps;
    delete Memory.rooms;

    const mem = M.m();
    mem.creeps = {};
    mem.rooms = {};

    mem.uuid = 0;
    mem.memVersion = M.MemoryVersion;
} // memoryInit();

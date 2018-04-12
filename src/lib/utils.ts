import * as Config from "settings/config";
import { log } from "lib/log/log";

import * as Inscribe from "screeps-inscribe";

/**
 * Creates an HTML link to the room.
 */
export class LinkGenerator {
         /**
          * Function to generate the Link
          * @param room The Room for whicht the Link should be generated
          * @param innerText Optional Link Text
          * @returns HTML-Link as String
          */
         public static linkRoom(room: string | Room, innerText?: string): string {
           if (room instanceof Room) {
             return this.linkRoom(room.name);
           }
           return `<a href="#!/room/${Game.shard.name}/${room}">${innerText ? innerText : room}</a>`;
         }
       } // LinkGenerator
/**
 * Periodic logging of useful info
 * @returns       VOID
 */
export function log_info(): void {
    // Periodic logging of useful info
    if ((Game.time % 100) === 0) {
      // CPU: limit: 30, tickLimit: 500, bucket: 10000, used: 4.08803
      console.log("CPU: limit: " + Game.cpu.limit + ", tickLimit: " + Game.cpu.tickLimit +
        ", bucket: " + Game.cpu.bucket + ", used: " + Game.cpu.getUsed());
    }
} // log_info()

/**
 * Output CPU spend on Parsing in the Console
 * @returns       VOID
 */
export function CpuUsedParsing(): void {
  let stringified = JSON.stringify(Memory);
  let startCpu = Game.cpu.getUsed();
  JSON.parse(stringified);
  log.info("CPU spent on Memory parsing:", Game.cpu.getUsed() - startCpu);
} // CpuUsedParsing()

/**
 * Used as a "Timer"
 * @returns       True: Game.time % 100 === 0
 */
export function logFive(): boolean {
  if (Game.time % 100 === 0) {
    return true;
  } else {
    return false;
  }
} // logFive()

/**
 * Clear Memory for non existing Creeps
 * @returns       VOID
 */
export function clearNoExistingCreepMemory(): void {
    if (Game.time % 100 === 0) {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                log.info("Clearing non-existing creep memory:", name);
                delete Memory.creeps[name];
            }
        }
    }
} // clearNoExistingCreepMemory()

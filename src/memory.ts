import * as Config from "settings/config";

export let MemoryVersion = Config.MEMORY_VERSION;

export function setMemVersion(value: number): void {
  MemoryVersion = value;
}

export function getMemVersion(): number {
  return MemoryVersion;
}

export interface MyPosition {
  x: number;
  y: number;
}

export interface PositionPlusTarget {
  x: number;
  y: number;
  targetId: string;
}

export interface RoomPositionPlusTarget {
  roomTarget: string;
  x: number;
  y: number;
  targetId: string;
}
export class RoomMemory {
  public roomName: string;
}
export interface GameMemory {
  memVersion: number | undefined;
  uuid: number;
  log: any;
  Profiler: Profiler;

  creeps: {
    [name: string]: any;
  };

  flags: {
    [name: string]: any;
  };

  rooms: {
    [name: string]: RoomMemory;
  };

  spawns: {
    [name: string]: any;
  };
}

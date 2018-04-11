import { ENABLE_DEBUG_MODE } from "settings/config";

import * as Inscribe from "screeps-inscribe";
import * as Config from "settings/config";

import * as L from "lib/index";
import * as M from "memory";

import * as miner from "components/miner";

export let creeps: Creep[];
export let creepCount: number = 0;
export let miners: Creep[] = [];

export function run(room: Room, rm: M.RoomMemory): void {
  L.profileRecord("_loadCreeps", true);
  _loadCreeps(room);
  L.profileRecord("_loadCreeps", false);

  L.profileRecord("_buildMissingCreeps", true);
  _buildMissingCreeps(room, rm);
  L.profileRecord("_buildMissingCreeps", false);

  _.each(creeps, (creep: Creep) => {
    const creepMem = M.cm(creep);
    if (creepMem.role === M.CreepRoles.ROLE_MINER) {
      L.profileRecord("miner.run", true);
      miner.run(creep, rm);
      L.profileRecord("miner.run", false);
    } else {
      creepMem.role = M.CreepRoles.ROLE_MINER;
    }
  });
}

function _loadCreeps(room: Room) {
  creeps = room.find<Creep>(FIND_MY_CREEPS);
  creepCount = _.size(creeps);
  miners = _.filter(
    creeps,
    (creep: Creep) => M.cm(creep).role === M.CreepRoles.ROLE_MINER
  );
}

function _buildMissingCreeps(room: Room, rm: M.RoomMemory) {
  let bodyParts: string[];

  const inactiveSpawns: Spawn[] = room.find<Spawn>(FIND_MY_SPAWNS, {
    filter: (spawn: Spawn) => {
      return spawn.spawning === null;
    }
  });

  if (miners.length < rm.minerTasks.length) {
    bodyParts = [WORK, WORK, CARRY, MOVE];
    let spawned: boolean = false;
    _.each(inactiveSpawns, (spawn: Spawn) => {
      if (!spawned) {
        const status = _spawnCreep(spawn, bodyParts, M.CreepRoles.ROLE_MINER);
        if (status === OK) {
          spawned = true;
        }
      }
    });
  }
}

function _spawnCreep(
  spawn: Spawn,
  bodyParts: string[],
  role: M.CreepRoles
): number {
  const uuid: number = Memory.uuid;
  let status: number | string = spawn.canCreateCreep(bodyParts, undefined);

  const properties: M.CreepMemory = {
    log: false,
    role,
    roleString: M.roleToString(role)
  };

  status = _.isString(status) ? OK : status;
  if (status === OK) {
    Memory.uuid = uuid + 1;
    const creepName: string = spawn.room.name + " - " + role + uuid;

    L.log.info("Started creating new creep: " + creepName);
    if (Config.ENABLE_DEBUG_MODE) {
      L.log.info("Body: " + bodyParts);
    }

    status = spawn.createCreep(bodyParts, creepName, properties);

    return _.isString(status) ? OK : status;
  } else {
    if (Config.ENABLE_DEBUG_MODE && status !== ERR_NOT_ENOUGH_ENERGY) {
      L.log.info("Failed creating new creep: " + status);
    }

    return status;
  }
}

export function initRoomMemory(room: Room, roomName: string) {
  const rm: M.RoomMemory = M.m().rooms[roomName];
  rm.roomName = roomName;
  rm.minerTasks = [];

  let taskIdNum = 0;

  const sources = room.find(FIND_SOURCES);
  for (const sourceName in sources) {
    const source: Source = sources[sourceName] as Source;
    const positions = [
      [source.pos.x - 1, source.pos.y - 1],
      [source.pos.x - 1, source.pos.y + 0],
      [source.pos.x - 1, source.pos.y + 1],

      [source.pos.x + 1, source.pos.y - 1],
      [source.pos.x + 1, source.pos.y + 0],
      [source.pos.x + 1, source.pos.y + 1],

      [source.pos.x + 0, source.pos.y - 1],
      [source.pos.x + 0, source.pos.y + 1]
    ];

    for (const pos of positions) {
      const roomPos: RoomPosition | null = room.getPositionAt(pos[0], pos[1]);
      if (roomPos !== null) {
        const found: string = roomPos.lookFor(LOOK_TERRAIN) as any;
        if (found != "wall") {//  tslint:disable-line
          L.log.info("pos " + pos[0] + "," + pos[1] + "=" + found);
          const minerPos: M.PositionPlusTarget = {
            targetId: source.id,
            x: pos[0],
            y: pos[1]
          };
          taskIdNum++;
          const minerTask: M.MinerTask = {
            minerPosition: minerPos,
            taskId: taskIdNum
          };

          rm.minerTasks.push(minerTask);
        }
      }
    }
  }
}

export function cleanupAssignMiners(rm: M.RoomMemory) {
  for (const task of rm.minerTasks) {
    if (task.assignedMinerName !== undefined) {
      const creep = Game.creeps[task.assignedMinerName];
      if ((creep as any) === undefined) {
        L.log.info(`Clearing mining task assigned to ${task.assignedMinerName}`);
        task.assignedMinerName = undefined;
      } else if (M.cm(creep).role !== M.CreepRoles.ROLE_MINER) {
        L.log.info(`Clearing mining task assigned to ${task.assignedMinerName}`);
        task.assignedMinerName = undefined;
      }
    }
  }
}

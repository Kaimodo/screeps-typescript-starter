declare const require: (module: string) => any;

declare var global: Global;
declare const __REVISION__: string;
declare const __BUILD_TIME__: string;

interface Global {
  uuid: number;
  log: any;
  CREEP_BUILD_RANGE: number;
  CREEP_RANGED_ATTACK_RANGE: number;
  CREEP_UPGRADE_RANGE: number;
  CREEP_REPAIR_RANGE: number;
  CREEP_RANGED_HEAL_RANGE: number;
  Profiler: Profiler;
  Inscribe: any;
  cc: any;
}

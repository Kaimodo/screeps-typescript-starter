declare const require: (module: string) => any;

declare var global: Global;

interface Global {
  uuid: number;
  log: any;
  Profiler: Profiler;
  Inscribe: any;
  cc: any;
}

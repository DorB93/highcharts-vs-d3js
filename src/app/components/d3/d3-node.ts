import {SimulationNodeDatum} from "d3-force";

export interface D3Node extends SimulationNodeDatum{
  // index?: number | undefined;
  // x?: number | undefined;
  // y?: number | undefined;
  // vx?: number | undefined;
  // vy?: number | undefined;
  // fx?: number | null | undefined;
  // fy?: number | null | undefined;
  id: string;
  name: string;
  nodeSVG?: string| undefined;
  alert: boolean;
}

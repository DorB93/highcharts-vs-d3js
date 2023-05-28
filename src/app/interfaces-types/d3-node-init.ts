import {SimulationNodeDatum} from "d3-force";

export interface D3NodeInit extends SimulationNodeDatum{
  index: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number;
  fy: number;
  cx: number;
  cy: number ;
  id: string;
  name: string;
  nodeSVG: string;
  alert: boolean;
}

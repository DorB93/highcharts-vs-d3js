import {SimulationLinkDatum} from "d3";
import {D3Node} from "./d3-node";

export interface D3Link extends SimulationLinkDatum<D3Node> {
  source: D3Node | string;
  target: D3Node | string;
  color: string;

}

import {SimulationLinkDatum} from "d3";
import {D3NodeInit} from "./d3-node-init";

export interface D3LinkInit extends SimulationLinkDatum<D3NodeInit> {
  source: D3NodeInit;
  target: D3NodeInit;
  color: string;
  alert: boolean;
  index: number;
}

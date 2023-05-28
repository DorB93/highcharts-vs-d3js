import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as D3 from 'd3'
import {D3Node} from "../../interfaces-types/d3-node";
import {D3Link} from "../../interfaces-types/d3-link";
import nodesData from "../../data/NodesData";

@Component({
  selector: 'app-force-layout',
  templateUrl: './force-layout.component.html',
  styleUrls: ['./force-layout.component.scss']
})
export class ForceLayoutComponent implements OnInit {
  @ViewChild('#force_graph', {static: true}) element!: ElementRef;

  private simulation: any;
  private svg!: any;
  private width: number = 800;
  private height: number = 600;
  private nodes: D3Node[] = [];
  private links: D3Link[] = [];

  constructor() {

  }

  ngOnInit() {
    this.setNodes();
    this.setLinks();
    this.svg = D3.select("#force_graph").append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.initGraph()
  }

  initGraph() {
    const that = this
    this.simulation = D3.forceSimulation(this.nodes)
      .force('link',
        D3.forceLink()     // @ts-ignore
          .id((d) => d.id)
          .links(this.links))
      .force("charge", D3.forceManyBody().strength(-400))
      .force("center", D3.forceCenter((this.width / 2), this.height / 2))

    // Per-type markers, as they don't inherit styles.
    this.svg.append("defs").selectAll("marker")
      .data([1, 2])
      .join("marker")
      .attr("id", (numType: number) => `arrow-${numType}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");

    const link = this.svg.append('g')
      .attr("fill", "none")
      .selectAll("path")
      .data(this.links)
      .join("path")
      .attr('stroke-width', (link: D3Link) => link.alert ? 2 : 1)
      .style('stroke', (link: D3Link) => link.color)
      .join("path")
      .attr("marker-end", (link: D3Link) => `url(#arrow-${link.alert ? 1 : 2})`);

    const node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('image')
      .data(this.nodes)
      .enter()
      .append('image')
      .attr("xlink:href", (node: D3Node) =>
        `/assets/icons/${node.name === 'Entry Point' ? 'alert' : node.name.toLowerCase()}.png`)
      .attr('transform', `translate(${-10},${-5})`)
      .attr("width", "40px")
      .attr("height", "40px")
      .attr("fill", (node: D3Node) => node.alert ? "red" : "blue")
    console.log({node})
    console.log({link})
    node.append("title") // @ts-ignore
      .text((node: D3Node) => node.name);

    this.simulation.on("tick", function () {
      link
        .attr("d", that.linkArc)
      node
        .attr('x', (node: any) => node.x)
        .attr('y', (node: any) => node.y - 15)
    })
  }

  setNodes() {
    nodesData.forEach(node => {
      this.nodes.push({
        id: node.id,
        name: node.name,
        alert: node.alert
      })
    })
  }

  setLinks() {
    nodesData.forEach((node) => {
      node.to.forEach(nId => {
        const targetNode = nodesData.find(n => n.id === nId)
        this.links.push({
          source: node.id,
          target: nId,
          color: (node.alert && targetNode?.alert) ? 'red' : 'green',
          alert: !!(node.alert && targetNode?.alert)
        });
      })
    }, [])
  }

  linkArc(d: D3Link) {
    // @ts-ignore
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);

    // @ts-ignore
    return `M${d.source.x},${d.source.y} A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }
}

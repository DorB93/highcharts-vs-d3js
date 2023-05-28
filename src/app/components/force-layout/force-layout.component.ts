import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as D3 from 'd3'
import {D3Node} from "../../interfaces-types/d3-node";
import {D3Link} from "../../interfaces-types/d3-link";
import nodesData from "../../data/NodesData";
import {D3NodeInit} from "../../interfaces-types/d3-node-init";
import {D3LinkInit} from "../../interfaces-types/d3-link-init";

@Component({
  selector: 'app-force-layout',
  templateUrl: './force-layout.component.html',
  styleUrls: ['./force-layout.component.scss']
})
export class ForceLayoutComponent implements OnInit {
  @ViewChild('#force_graph', {static: true}) element!: ElementRef;

  private simulation: any;
  private svg!: any;
  private width: number = 960;
  private height: number = 700;
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
          .id((d) => d.id).distance(60)
          .links(this.links))
      .force("charge", D3.forceManyBody().strength(-1000))
      .force("center", D3.forceCenter(this.width / 2, this.height / 2))
      .force("x", D3.forceX())
      .force("y", D3.forceY())

    // Per-type markers, as they don't inherit styles.
    this.svg.append("defs").selectAll("marker")
      .data([1, 2])
      .join("marker")
      .attr("id", (numType: number) => `arrow-${numType}`)
      .attr("fill", (numType: number) => `arrow-${numType}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 7)
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
      .attr('stroke-width', (link: D3LinkInit) => link.alert ? 4 : 3)
      .style('stroke', (link: D3LinkInit) => link.color)
      .on('mouseover', onMouseOver)
      .on('mousemove', onMouseOver)
      .on('mouseleave', hideTooltip)
      .join("path")
      .attr("marker-end", (link: D3LinkInit) => `url(#arrow-${link.alert ? 1 : 2})`)

    function onMouseOver(event: MouseEvent, link: D3LinkInit) {
      // console.log({event})
      // console.log({link})
      showTooltip(event, link)
    }

    const node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('image')
      .data(this.nodes)
      .enter()
      .append('image')
      .attr("xlink:href", (node: D3Node) =>
        `/assets/icons/${node.name === 'Entry Point' ? 'alert' : node.name.toLowerCase()}.png`)
      .attr('transform', `translate(${-25},${-15})`)
      .attr("width", "40px")
      .attr("height", "40px")
      .attr("fill", (node: D3Node) => node.alert ? "red" : "blue")
    console.log({node})
    console.log({link})

    const text = this.svg.append('g')
      .selectAll('text')
      .data(this.nodes)
      .enter()
      .append("text")
      .attr('class', 'node-title')
      .attr("y", (n: D3Node) => n.y)
      .attr("x", (n: D3Node) => n.x)
      .style("text-anchor", "start")
      .text((n: D3NodeInit) => {
        console.log(n)
        return n.name
      });

    const tooltip = D3.select('#tooltip-container')
    console.log({tooltip})

    function showTooltip(event: MouseEvent, link: D3LinkInit) {
      const xPos = event.clientX
      const yPos = event.clientY
      tooltip
        .attr('class', 'graph-tooltip')
        .style('left', `${xPos - 100}px`)
        .style('top', `${yPos - 60}px`)
        .html(`From ${link.source.name} to ${link.target.name}. SG : some group name`)
    }

    function hideTooltip() {
      tooltip.attr('class', 'graph-tooltip hidden')
    }

    this.simulation.on("tick", function () {
      link
        .attr('d', that.linkArc)

      node
        .attr('x', (node: D3Node) => node.x)
        .attr('y', (node: D3Node) => (node.y && node.y - 15))
      text
        .attr('x', (node: D3Node) => node.x)
        .attr('y', (node: D3Node) => (node.y && node.y - 15))
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

  linkArc(d: D3LinkInit) {
    const xSource = d.source.x;
    const ySource = d.source.y;

    const r = Math.hypot(d.target.x - xSource, d.target.y - ySource);

    return `M${xSource},${ySource} A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }
}

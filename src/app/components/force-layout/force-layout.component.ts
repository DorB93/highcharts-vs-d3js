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
  private nodesArr: D3Node[] = [];
  private linksArr: D3Link[] = [];
  private nodesSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;
  private linksSelection!: D3.Selection<D3.BaseType, D3LinkInit, SVGElement, D3LinkInit>;
  private textsSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;

  constructor() {

  }

  ngOnInit() {
    this.setNodesData();
    this.setLinksData();
    this.svg = D3.select("#force_graph").append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
    this.initGraph()
  }

  initGraph() {

    this.runForceSimulation()
    // Per-type markers, as they don't inherit styles.
    this.addArrowHeadMarker()

    this.addLinksToSVG()

    this.addNodeToSVG()

    this.addLabelsToNodesSVG()
  }

  runForceSimulation() {
    this.simulation = D3.forceSimulation(this.nodesArr)
      .force("charge", D3.forceManyBody().strength(-1000))
      .force("center", D3.forceCenter(this.width / 2, this.height / 2))
      .force('link',
        D3.forceLink()     // @ts-ignore
          .id((d) => d.id).distance(100)
          .links(this.linksArr))
      .force("x", D3.forceX())
      .force("y", D3.forceY())
      .on("tick", this.ticked.bind(this))
  }

  ticked() {
    this.linksSelection
      .attr('d', this.linkArc)

    this.nodesSelection
      .attr('x', (node: D3NodeInit) => node.x)
      .attr('y', (node: D3NodeInit) => (node.y && node.y - 15))
    this.textsSelection
      .attr('x', (node: D3NodeInit) => node.x)
      .attr('y', (node: D3NodeInit) => (node.y && node.y - 15))
  }

  setNodesData() {
    nodesData.forEach(node => {
      this.nodesArr.push({
        id: node.id,
        name: node.name,
        alert: node.alert
      })
    })
  }

  setLinksData() {
    nodesData.forEach((node) => {
      node.to.forEach(nId => {
        const targetNode = nodesData.find(n => n.id === nId)
        this.linksArr.push({
          source: node.id,
          target: nId,
          color: (node.alert && targetNode?.alert) ? 'red' : 'green',
          alert: !!(node.alert && targetNode?.alert)
        });
      })
    }, [])
  }

  addArrowHeadMarker() {
    this.svg.append("defs").selectAll("marker")
      .data([1, 2])
      .join("marker")
      .attr("id", (numType: number) => `arrow-${numType}`)
      .attr("fill", (numType: number) => numType === 1 ? 'red' : 'green')
      .attr("viewBox", "0 -5 10 10")
      .style("cursor", "pointer")
      .attr("refX", 7)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");
  }

  addNodeToSVG() {
    this.nodesSelection = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('image')
      .data(this.nodesArr)
      .enter()
      .append('image')
      .attr("xlink:href", (node: D3Node) =>
        `/assets/icons/${node.name === 'Entry Point' ? 'alert' : node.name.toLowerCase()}.png`)
      .attr('transform', `translate(${-25},${-15})`)
      .attr("width", "40px")
      .attr("height", "40px")
      .attr("fill", (node: D3Node) => node.alert ? "red" : "blue")

  }

  addLabelsToNodesSVG() {
    this.textsSelection = this.svg.append('g')
      .selectAll('text')
      .data(this.nodesArr)
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

  }

  addLinksToSVG() {
    this.linksSelection = this.svg.append('g')
      .attr("fill", "none")
      .selectAll("path")
      .data(this.linksArr)
      .join("path")
      .attr('stroke-width', (link: D3LinkInit) => link.alert ? 4 : 3)
      .style('stroke', (link: D3LinkInit) => link.color)
      .style('cursor', 'pointer')
      .on('mouseover', showTooltip)
      .on('mousemove', showTooltip)
      .on('mouseleave', hideTooltip)
      .join("path")
      .attr("marker-end", (link: D3LinkInit) => `url(#arrow-${link.alert ? 1 : 2})`)

    const tooltip = D3.select('#tooltip-container')

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
  }

  linkArc(d: D3LinkInit) {

    const xStart = d.source.x;
    const yStart = d.source.y;


    const r = Math.hypot(d.target.x - xStart, d.target.y - yStart);

    return `M${xStart},${yStart} A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
  }
}

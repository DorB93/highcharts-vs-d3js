import { Component, OnInit } from "@angular/core";
import * as D3 from "d3";
import { D3Node } from "../../interfaces-types/d3-node";
import { D3Link } from "../../interfaces-types/d3-link";
import nodesData from "../../data/NodesData";
import { D3NodeInit } from "../../interfaces-types/d3-node-init";
import { D3LinkInit } from "../../interfaces-types/d3-link-init";

@Component({
  selector: "app-force-layout",
  templateUrl: "./force-layout.component.html",
  styleUrls: ["./force-layout.component.scss"]
})
export class ForceLayoutComponent implements OnInit {
  private simulation: any;
  private svg!: any;
  private width: number = 1200;
  private height: number = 700;
  private nodesArr: D3Node[] = [];
  private linksArr: D3Link[] = [];
  private nodesSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;
  private linksSelection!: D3.Selection<D3.BaseType, D3LinkInit, SVGElement, D3LinkInit>;
  private tooltipSelection!: D3.Selection<D3.BaseType, D3LinkInit, HTMLElement, D3LinkInit>;
  private hostDataContainerSelection!: D3.Selection<D3.BaseType, D3NodeInit, HTMLElement, D3NodeInit>;
  private hostSourceContainerSelection!: D3.Selection<D3.BaseType, D3NodeInit, HTMLElement, D3NodeInit>;
  private hostHeaderSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;
  private hostAddressSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;
  private hostSourceSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;
  private alertNoteSelection!: D3.Selection<D3.BaseType, D3NodeInit, SVGElement, D3NodeInit>;

  constructor() {
  }

  ngOnInit() {
    this.setNodesData();
    this.setLinksData();
    this.tooltipSelection = D3.select("#tooltip-container");
    this.svg = D3.select("#force_graph").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    this.svg.append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "#F5F5F5");
    this.initGraph();
  }

  initGraph() {
    this.runForceSimulation();

    this.addShadowBoxDefs();

    this.addLinksToSVG();

    this.addNodeRectData();

    this.addNodeToSVG();
  }

  runForceSimulation() {
    this.simulation = D3.forceSimulation(this.nodesArr)
      .force("charge", D3.forceManyBody().strength(-1700))
      .force("link",
        D3.forceLink()     // @ts-ignore
          .id((d) => d.id)
          .links(this.linksArr)
          .distance(50)
          .strength(1))
      .on("tick", this.ticked.bind(this));
  }

  setNodesData() {
    nodesData.forEach(node => {
      this.nodesArr.push({
        id: node.id,
        name: node.name,
        alert: node.alert,
        numTo: node.to.length,
        address: node.address,
        source: node.source
      });
    });
  }

  setLinksData() {
    nodesData.forEach((node) => {
      node.to.forEach(nId => {
        const targetNode = nodesData.find(n => n.id === nId);
        this.linksArr.push({
          source: node.id,
          target: nId,
          color: "#C2CBD9",
          alert: !!(node.alert && targetNode?.alert)
        });
      });
    }, []);
  }

  addNodeToSVG() {
    this.nodesSelection = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll(".node-icon")
      .data(this.nodesArr)
      .enter()
      .append("image")
      .attr('class','node-icon')
      .attr("xlink:href", (node: D3Node) =>
        `/assets/svg-icons/${node.name === "Entry Point" ? "entry" : "host"}.svg`)
      .attr("transform", `translate(${-25},${-15})`)
      .style("cursor","pointer")
      .attr("width", "60px")
      .attr("height", "60px")
      .attr("fill", (node: D3Node) => node.alert ? "red" : "blue")
      .style("filter", "url(#drop-shadow)")
      .on("click",function(event:MouseEvent,node:D3NodeInit){
        console.log(node);
      })
  }

  addNodeRectData() {
    this.hostDataContainerSelection = this.svg.append("g")
      .attr("class", "data-table")
      .selectAll(".node-div-data")
      .data(this.nodesArr)
      .enter().append("rect")
      .attr("rx", 10)
      .attr("height", "75px")
      .attr("width", "150px")
      .attr("fill", "white")
      .style("filter", "url(#drop-shadow1)");

    this.hostHeaderSelection = this.svg.selectAll(".header-text")
      .data(this.nodesArr)
      .enter().append("text").attr("class", ".header-text")
      .text((node: D3NodeInit) => `${node.name}`)
      .attr("fill", "#14A65C")
      .attr("font-size", "14px")
      .attr("font-family", "Open Sans");

    this.hostAddressSelection = this.svg.selectAll(".address-text")
      .data(this.nodesArr)
      .enter().append("text").attr("class", ".address-text")
      .text((node: D3NodeInit) => `${node.address}`)
      .attr("fill", "#808080")
      .attr("font-size", "11px")
      .attr("font-family", "Open Sans");

    this.hostSourceContainerSelection = this.svg.selectAll(".rect-source")
      .data(this.nodesArr)
      .enter().append("rect").attr("class", ".rect-source")
      .attr("height", "16px")
      .attr("width", "90px")
      .attr("fill", "white")
      .attr("rx", 5)
      .style("filter", "url(#drop-shadow2)");

    this.hostSourceSelection = this.svg.selectAll(".address-text")
      .data(this.nodesArr)
      .enter().append("text").attr("class", ".address-text")
      .text((node: D3NodeInit) => `${node.source}`)
      .attr("fill", "#1C3136")
      .attr("font-size", "11px")
      .attr("font-family", "Open Sans");

    this.alertNoteSelection = this.svg.selectAll('.alert-breach')
      .data(this.nodesArr)
      .enter().append('image')
      .attr("xlink:href", `/assets/svg-icons/alert.svg`)
      .attr("transform", `translate(${-25},${-15})`)
      .style("cursor","pointer")
      .attr("width", "20px")
      .attr("height", "20px")
      .style("display", (node: D3Node) => node.alert ? true : "none")

  }

  addLinksToSVG() {
    this.linksSelection = this.svg.append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(this.linksArr)
      .join("path")
      .attr("stroke-width", 3)
      .style("stroke", (link: D3LinkInit) => link.color)
      .style("cursor", "pointer")
      .on("mouseover", this.showTooltip.bind(this))
      .on("mousemove", this.showTooltip.bind(this))
      .on("mouseleave", this.hideTooltip.bind(this))
      .join("path")
      .attr("marker-end", "url(#end)");
  }

  showTooltip(event: MouseEvent, link: D3LinkInit) {
    this.tooltipSelection
      .attr("class", "graph-tooltip")
      .style("left", `${event.clientX - 100}px`)
      .style("top", `${event.clientY - 60}px`)
      .html(`From ${link.source.name} to ${link.target.name}. SG : some group name`);
  }

  hideTooltip() {
    this.tooltipSelection.attr("class", "graph-tooltip hidden");
  }

  addShadowBoxDefs() {
    // filters go in defs element
    const defs = this.svg.append("defs");

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
    const filter = defs.append("filter")
      .attr("id", "drop-shadow1")
      .attr("height", "130%");
    const filter2 = defs.append("filter")
      .attr("id", "drop-shadow2")
      .attr("height", "140%");
// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
    filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3);
    filter2.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3);

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
    filter.append("feOffset")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");
    filter2.append("feOffset")
      .attr("dx", 1)
      .attr("dy", 1)
      .attr("result", "offsetBlur");

// Control opacity of shadow filter
    const feTransfer = filter.append("feComponentTransfer");
    const feTransfer2 = filter2.append("feComponentTransfer");

    feTransfer.append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.2);
    feTransfer2.append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.2);

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
    const feMerge = filter.append("feMerge");
    const feMerge2 = filter2.append("feMerge");

    feMerge.append("feMergeNode");
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");
    feMerge2.append("feMergeNode");
    feMerge2.append("feMergeNode")
      .attr("in", "SourceGraphic");
  }

  ticked() {// @ts-ignore
    this.linksSelection
      .attr("d", this.linkArc.bind(this));

    this.nodesSelection
      .attr("x", (node: D3NodeInit) => node.x)
      .attr("y", (node: D3NodeInit) => node.y - 15);

    this.hostDataContainerSelection
      .attr("transform", (node: D3NodeInit) => {
        return `translate(${node.x + 10},${node.y - 25})`;
      });

    this.hostHeaderSelection
      .attr("transform", (node: D3NodeInit) => {
        return `translate(${node.x + 25},${node.y - 2})`;
      });

    this.hostAddressSelection
      .attr("transform", (node: D3NodeInit) => {
        return `translate(${node.x + 25},${node.y + 15})`;
      });

    this.hostSourceContainerSelection
      .attr("transform", (node: D3NodeInit) => {
        return `translate(${node.x + 25},${node.y + 23})`;
      });

    this.hostSourceSelection
      .attr("transform", (node: D3NodeInit) => {
        return `translate(${node.x + 28},${node.y + 35})`;
      });
    this.alertNoteSelection
      .attr("transform", (node: D3NodeInit) => {
        return `translate(${node.x + 135},${node.y + 25})`;
      });
  }

  linkArc(link: D3LinkInit) {
    if (link.source.name === "Entry Point") {
      link.source.fx = 100;
      link.source.fy = this.height / 2;
      link.target.fx = 350;
      link.target.fy = 150 + link.target.index * 100;
    }
    link.target.x = link.source.x + 250;

    return `M ${link.source.x} , ${link.source.y} C ${(link.source.x + link.target.x) / 2}, ${link.source.y}  ${(link.source.x + link.target.x) / 2} , ${link.target.y}  ${link.target.x} , ${link.target.y}`
  }

  nodeClick() {

  }

}

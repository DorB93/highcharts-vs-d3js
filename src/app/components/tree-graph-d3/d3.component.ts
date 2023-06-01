import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-tree-graph-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {


  constructor() {

  }

  ngOnInit() {

    const treeData =
      {
        "name": "Top Level",
        "value": 10,
        "type": "black",
        "level": "red",
        "icon": "earth.png",
        "children": [
          {
            "name": "Level 2: A",
            "value": 5,
            "type": "grey",
            "level": "red",
            "icon": "cart.png",
            "children": [
              {
                "name": "Son of A",
                "value": 5,
                "type": "steelblue",
                "icon": "lettern.png",
                "level": "orange"
              },
              {
                "name": "Daughter of A",
                "value": 18,
                "type": "steelblue",
                "icon": "vlc.png",
                "level": "red"
              }
            ]
          },
          {
            "name": "Level 2: B",
            "value": 10,
            "type": "grey",
            "icon": "random.png",
            "level": "green"
          }
        ]
      };

// set the dimensions and margins of the diagram
    const margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 660 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// declares a tree layout and assigns the size
    const treemap = d3.tree()
      .size([height, width]);

//  assigns the data to a hierarchy using parent-child relationships
    let nodes = d3.hierarchy(treeData);

// maps the node data to the tree layout
    // @ts-ignore
    nodes = treemap(nodes);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    // @ts-ignore
    const svg = d3.select("#my_graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
      g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// adds the links between the nodes
    const link = g.selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter().append("path")
      .style('stroke', d => d.data.level)
      .style('fill','none')
      .attr("class", "link") // @ts-ignore
      .attr("d", (d) => `M ${d.y} , ${d.x} C ${(d.y + d.parent.y) / 2}, ${d.x}  ${(d.y + d.parent.y) / 2} , ${d.parent.x}  ${d.parent.y} , ${d.parent.x}`
      );

// adds each node as a group
    const node = g.selectAll(".node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", (d) => `node ${d.children ? " node--internal" : " node--leaf"}`)// @ts-ignore
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

// adds the symbol to the node
// node.append("path")
//     .style("stroke", d => d.data.type)
//     .style("fill", d => d.data.level)
//     .attr("d", tree-graph-d3.symbol()
//         .size( d=> d.data.value * 30)
//         .type( d=> {
//             if (d.data.value >= 9) {
//                 return tree-graph-d3.symbolCross;
//             } else if (d.data.value <= 9) {
//                 return tree-graph-d3.symbolDiamond;
//             }
//         }));

// Add image to a node
    node.append("image")
      .attr("xlink:href", (d)=> `/assets/${d.data.icon}`)
      .attr("x", "-12px")
      .attr("y", "-12px")
      .attr("width", "24px")
      .attr("height", "24px");

// adds the text to the node
    node.append("text")
      .attr("dy", "-1em")
      .attr("x", (d) => d.children ? (d.data.value + 4) * -1 : d.data.value + 4)
      .style("text-anchor","middle" /*(d) => d.children ? 'end' : 'start'*/)
      .text((d) => d.data.name);


  }


  // setNodes(){
  //   this.data.forEach(node=>{
  //     this.nodes.push({
  //       id:node.id,
  //       name:node.name,
  //       alert: node.alert
  //     })
  //   })
  // }
  // setLinks(){
  //    this.data.forEach((node)=>{
  //     node.to.forEach(nId => {
  //       const targetNode = this.data.find(n=>n.id === nId)
  //         this.links.push({
  //           source: node.id,
  //           target: nId,
  //           color: (node.alert && targetNode?.alert) ? 'red' : 'green'
  //         });
  //       })
  //   },[])
  // }


}

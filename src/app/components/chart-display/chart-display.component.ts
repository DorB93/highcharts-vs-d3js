import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';

HighchartsNetworkgraph(Highcharts);

// A networkgraph is a type of relationship chart,
// where connnections (links) attracts nodes (points) and other nodes repulse each other.
// In TypeScript the type option must always be set.
// Configuration options for the series are given in three levels:
// Options for all series in a chart are defined in the plotOptions.series object.
// Options for all networkgraph series are defined in plotOptions.networkgraph.
// Options for one single series are given in the series instance array.


@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss']
})
export class ChartDisplayComponent implements OnInit {
  chartId = 'chart-container'
  Highcharts: typeof Highcharts = Highcharts;
  dirDist50 = "#E8544E";
  dirDist10 = "#FFD265";
  dirDistLess10 = "#2AA775";
  // chartOptions: Highcharts.Options = {
  //   chart: {
  //     type: 'networkgraph',
  //     height: '100%'
  //   },
  //   title: {
  //     text: 'Network Graph Example'
  //   },
  //   plotOptions: {
  //     networkgraph: {
  //       keys: ['from', 'to'],
  //       layoutAlgorithm: {
  //         enableSimulation: true,
  //         integration: 'verlet',
  //         linkLength: 100
  //       }
  //     }
  //   },
  //   series: [{
  //     dataLabels: {
  //       enabled: true,
  //       format: '{point.linknum}: {point.link}'
  //     },
  //     data: [{
  //       from: 'A',
  //       to: 'B',
  //       link: 'Link 1',
  //       linknum: 1,
  //       name: 'Entry'
  //     }, {
  //       from: 'A',
  //       to: 'C',
  //       link: 'Link 2',
  //       linknum: 2
  //     }, {
  //       from: 'B',
  //       to: 'C',
  //       link: 'Link 3',
  //       linknum: 3
  //     }]
  //   }]
  // };
  // generalSeries = {
  //   ///////////// general options for all series//////////////
  //   allowPointSelect: false, // => boolean, Allow this series' points to be selected by clicking on the graphic (columns, point markers, pie slices, map areas etc).
  //   animation: false, //=> boolean, Highcharts.AnimationOptionsObject
  //   className: 'my-network-graph', // =>An additional class name to apply to the series' graphical elements. This option does not replace default class names of the graphical element. Changes to the series' color will also be reflected in a chart's legend and tooltip.
  //   cursor: 'pointer', // Highcharts.CursorValue
  //   dataLabels: [{// if we want to display several label for the same point we need to pass 2 objects
  //     align: 'center',
  //     allowOverlap: false, // prevant tittle allowOverlap,
  //     // animation : { defer: 4000} add delay of 4 sec in the initial
  //     // backgroundColor: Highcharts.ColorString, Highcharts.GradientColorObject, Highcharts.PatternObject
  //     // borderColor: Highcharts.ColorString, Highcharts.GradientColorObject, Highcharts.PatternObject
  //     // borderRadius: number
  //     // borderWidth: number
  //     // className: string // style with css
  //     crop: false, // Whether to hide data labels that are outside the plot area.
  //     // defer: boolean // defaults to true. if we want to delay the display
  //     enabled: true, //Enable or disable the data labels. Defaults to false.
  //     /* filter: {  ////  If we want to add condition for the display the label
  //       property: 'percentage',
  //       operator: '>',
  //       value: 4
  //     },*/
  //     /*
  //     for formatting the text label we can use
  //     format: 'this point lable is {point.key}' OR
  //     formatter: add callback for returning a string to be the label. to access the point data we use "this"
  //     nullFormat: if we have a point with data === null, we deside here what the clinet see OR
  //     nullFormatter: Highcharts.DataLabelsFormatterCallbackFunction
  //     * */
  //     // position: Highcharts.AlignValue
  //   }],
  //   /*
  //    * events:{ ----- General event handlers for the series items. These event hooks can also be attached to the series at run time using the Highcharts.addEvent function
  //       afterAnimate:undefined
  //       checkboxClick:undefined
  //       click:undefined
  //       hide:undefined
  //       legendItemClick:undefined
  //       mouseOut:undefined
  //       mouseOver:undefined
  //       show:undefined
  //   },*/
  //   // point:{
  //   //   events:{
  //   //     click:undefined
  //   //     drag:undefined
  //   //     dragStart:undefined
  //   //     drop:undefined
  //   //     mouseOut:undefined
  //   //     mouseOver:undefined
  //   //     remove:undefined
  //   //     select:undefined
  //   //     unselect:undefined
  //   //     update:undefined
  //   //   }
  //   // },
  //
  //   // tooltip: {
  //   //   clusterFormat: 'Clustered points: {point.clusterPointsAmount}',
  //   //   dateTimeLabelFormats: {
  //   //     day: '% A, % e % b % Y',
  //   //     hour: '% A, % e % b, % H:%M',
  //   //     millisecond: '% A, % e % b, % H:%M:%S.%L',
  //   //     minute: '% A, % e % b, % H:%M',
  //   //     month: '% B % Y',
  //   //     second: '% A, % e % b, % H:%M:%S',
  //   //     week: 'Weekfrom % A, % e % b % Y',
  //   //     year: ' % Y',
  //   //   },
  //   //   distance: 16,
  //   //   followPointer: false,
  //   //   followTouchMove: true,
  //   //   footerFormat: "",
  //   //   headerFormat: undefined,
  //   //   nullFormat: undefined,
  //   //   nullFormatter: undefined,
  //   //   pointFormat: undefined,
  //   //   pointFormatter: undefined,
  //   //   valueDecimals: undefined,
  //   //   valuePrefix: undefined,
  //   //   valueSuffix: undefined,
  //   //   xDateFormat: undefined,
  //   // },
  // };

  //   networkGraphOptions = {
//     // shared options for all networkgraph series
//     /*
//     networkgraph: {
//       accessibility: {...},
//       allowPointSelect: false,
//       className: undefined,
//       clip: true,
//       color: undefined,
//       colorIndex: undefined,
//       crisp: true,
//       cursor: undefined,
//       custom: undefined,
//       dashStyle: Solid,
//     draggable: true,
//     enableMouseTracking: true,
//     events: { ... },
//     findNearestPointBy: x,
//     includeInDataExport: undefined,
//     keys: undefined,
//     layoutAlgorithm: { ... },
//     legendSymbol: 'rectangle',
//     lineWidth: 1,
//     link: { ... },
//     linkedTo: undefined,
//     marker: { ... },
//     onPoint: { ... },
//     opacity: 1,
//     point: { ... },
//     pointDescriptionFormatter: undefined,
//     relativeXValue: false,
//     selected: false,
//     shadow: false,
//     showCheckbox: false,
//     showInLegend: false,
//     skipKeyboardNavigation: undefined,
//     sonification: { ... },
//     states: { ... },
//     stickyTracking: false,
//     tooltip: { ... },
//     turboThreshold: 1000,
//     visible: true,
//     zones: [{ ... }],
//     },
// */
//   }

  /*
  {
    type: "networkgraph",
    accessibility:{...}
    allowPointSelect:false
    className:undefined
    clip:true
    color:undefined
    colorAxis:0
    colorIndex:undefined
    colorKey:y
    crisp:true
    cursor:undefined
    custom:undefined
    dashStyle:Solid
    data:[{...}]
    dataLabels:{...}
    description:undefined
    draggable:true
    enableMouseTracking:true
    events:{...}
    findNearestPointBy:x
    id:undefined
    includeInDataExport:undefined
    index:undefined
    keys:undefined
    layoutAlgorithm:{...}
    legendIndex:undefined
    legendSymbol:rectangle
    lineWidth:1
    link:{...}
    linkedTo:undefined
    marker:{...}
    name:undefined
    nodes:[{...}]
    onPoint:{...}
    opacity:1
    point:{...}
    pointDescriptionFormatter:undefined
    relativeXValue:false
    selected:false
    shadow:false
    showCheckbox:false
    showInLegend:false
    skipKeyboardNavigation:undefined
    sonification:{...}
    states:{...}
    stickyTracking:false
    tooltip:{...}
    turboThreshold:1000
    type:undefined
    visible:true
    zIndex:undefined
    zones:[{...}]
    }
   */

  nodes =
    [
      {id: '1', name: 'Entry Point', alert: true, to: ['API1', 'API2', 'API3']},
      {id: 'API1', name: 'Node Server', alert: true, to: ['MGUS1', 'MSSQL1']},
      {id: 'API2', name: 'Jango', alert: false, to: ['SQL1']},
      {id: 'API3', name: 'Azure studio', alert: false, to: ['MDB1']},
      {id: 'MGUS1', name: 'Mongoose', alert: true, to: ['MDB2']},
      {id: 'MSSQL1', name: 'MSSQL', alert: true, to: ['SQL2']},
      {id: 'SQL1', name: 'MySQL1', alert: false, to: []},
      {id: 'SQL2', name: 'MySQL', alert: true, to: []},
      {id: 'MDB1', name: 'MongoDB1', alert: false, to: []},
      {id: 'MDB2', name: 'MongoDB2', alert: true, to: []},
    ];
/*
 [
          {
            id: "1",
            name: "Entry Point",
            marker: {
              radius: 30
            },
            color: that.dirDist50
          },
          {
            id: "Api 1",
            name:'Dor',
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "Api 2",
            name: "Api 2",
            marker: {
              radius: 30
            },
            color: that.dirDist50
          },
          {
            id: "Node Server",
            name: "Node Server",
            marker: {
              radius: 20
            },
            color: that.dirDist10
          },
          {
            id: "Jango Server",
            name: "Jango Server",
            marker: {
              radius: 30
            },
            color: that.dirDist50
          },
          {
            id: "Azure studio",
            name: "Azure studio",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "A",
            name: "A",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "B",
            name: "B",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "C",
            name: "C",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "D",
            name: "D",
            marker: {
              radius: 20
            },
            color: that.dirDist10
          },
          {
            id: "H",
            name: "H",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "G",
            name: "G",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "I",
            name: "I",
            marker: {
              radius: 10
            },
            color: that.dirDistLess10
          },
          {
            id: "J",
            name: "J",
            marker: {
              radius: 20
            },
            color: that.dirDist10
          }
        ]

 */
  constructor() {
  }
  getNodes(){
    return this.nodes.map(node =>{
      const marker = {
        radius: node.alert ? 20 : 10
      }
      return{ id: node.id, name:node.name, color: node.alert ? 'red' : 'blue', marker}
    });

  }
  getConnections() {
    return this.nodes.reduce((pre: [string, string][], node) => {
      if (node.to && node.to.length > 0) {
        node.to.forEach(to => {
          pre.push([node.id, to])
        })
      }
      return pre
    }, [])
  }

  ngOnInit() {
    const that = this;
    // @ts-ignore
    this.Highcharts.chart(this.chartId, {
      chart: {
        type: 'networkgraph',
        marginTop: 80
      },
      title: {
        text: 'Possible Entry Point - XX'
      },
      tooltip: {
        formatter: function () {
          return "<b>" + this.key + "</b> ";
        }
      },
      plotOptions: {
        networkgraph: {
          keys: ['from', 'to'],
          layoutAlgorithm: {
            enableSimulation: true,
            integration: 'verlet',
            linkLength: 100
          }
        }
      },
      series: [{
        id: 'language-tree',
        dataLabels: {
          enabled: true,
          textPath: {
            enabled: true
          },
          format: '{point.name}',
          linkFormat: '',
          allowOverlap: true
        },
        data: this.getConnections(),
        nodes: this.getNodes(),
      }]
    });
  }

}

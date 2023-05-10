import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';
HighchartsNetworkgraph(Highcharts);


@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss']
})
export class ChartDisplayComponent implements OnInit{
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {chart: {
      type: 'networkgraph',
    },
    title: {
      text: 'Database Network'
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9
        },
        marker: {
          radius: 13
        },
        events: {
          click: function (event) {
            console.log(event.point);
          }
        }
      }
    },
    series: [{
      dataLabels: {
        enabled: true,
        // @ts-ignore
        linkFormat: ''
      },
      data: [{
        id: 'entry1',
        name: 'Entry Point 1',
        marker: {
          radius:30
        }
      }, {
        id: 'entry2',
        name: 'Entry Point 2',
        marker: {
          radius:30
        }
      }, {
        id: 'server1',
        name: 'Server 1',
        marker: {
          radius:30
        }
      }, {
        id: 'server2',
        name: 'Server 2',
        marker: {
          radius:30
        }
      }, {
        id: 'database1',
        name: 'Database 1',
        marker: {
          radius:30
        }
      }, {
        id: 'database2',
        name: 'Database 2',
        marker: {
          radius:30
        }
      }],
      links: [{
        from: 'entry1',
        to: 'server1',
        color: 'black'
      }, {
        from: 'entry1',
        to: 'server2',
        color: 'black'
      }, {
        from: 'entry2',
        to: 'server1',
        color: 'black'
      }, {
        from: 'entry2',
        to: 'server2',
        color: 'black'
      }, {
        from: 'server1',
        to: 'database1',
        color: 'black'
      }, {
        from: 'server2',
        to: 'database2',
        color: 'black'
      }, {
        from: 'entry1',
        to: 'database1',
        color: 'green'
      }, {
        from: 'entry2',
        to: 'database2',
        color: 'green'
      }]
    }]
  }
  ngOnInit() {
    // this.Highcharts.chart('container',this.chartOption)
  }
}

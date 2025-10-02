import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-barr',
  templateUrl: './barr.component.html',
  styleUrls: ['./barr.component.css']
})
export class BarrComponent implements OnChanges {

  option: any;

  @Input()
  data1: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data1'] && this.data1) {
      this.initializeChart();
    }
  }

  initializeChart() {
    const percentage = this.data1?.taux_realisation_physique || 0;
    
    this.option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50, 50, 50, 0.95)',
        borderColor: 'transparent',
        textStyle: {
          color: '#fff',
          fontSize: 11,
          fontFamily: 'Tahoma, sans-serif'
        },
        formatter: function(params: any) {
          let result = '';
          params.forEach((param: any) => {
            result += `${param.seriesName}: ${param.value}%<br/>`;
          });
          return result;
        },
        extraCssText: 'border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%',
          fontSize: 9,
          color: '#6b7280'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6',
            width: 1
          }
        }
      },
      yAxis: {
        type: 'category',
        data: [''],
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          name: 'محقق',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{c}%',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: '#22c55e',
            borderRadius: [0, 4, 4, 0]
          },
          data: [percentage]
        },
        {
          name: 'باقي',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{c}%',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: '#ef4444',
            borderRadius: [4, 0, 0, 4]
          },
          data: [100 - percentage]
        }
      ]
    };
  }

  constructor() {
    
  }
}
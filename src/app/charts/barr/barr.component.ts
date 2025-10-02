import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-barr',
  templateUrl: './barr.component.html',
  styleUrls: ['./barr.component.css']
})
export class BarrComponent implements OnChanges{


  
  myChart: any;
  option: any;
  labelOption:any

  @Input()
  data1: any;
  @Input()
  data2: any[] = [];
  @Input()
  data3: any[] = [];

  @Input()
  label: any;


  @Input()
  labels: any[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    // Check if data1, data2, data3, or labels have changed
    
    
      this.onInputChange(); // Call your function when inputs change
  
  }

  ngAfterContentInit(): void {
     
    this.onInputChange();
  }

  onInputChange(){
     
    let finaldata= []
     if(this.data1){
       
       
         
        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['donnée']
          },
          series: [
            {
              name: 'réalisé',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [this.data1?.taux_realisation_physique]
            } ,
            {
              name: 'Rest',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [100-this.data1?.taux_realisation_physique]
            }  
          ]
        };
    
          this.myChart ? this.myChart.setOption(this.option):'';
      }
     
     
  
   
    

  }
  

  constructor() {
    
   }

  
 

   
  
 



  ngOnInit(): void {
    var app:any = {};



const posList = [
  'left',
  'right',
  'top',
  'bottom',
  'inside',
  'insideTop',
  'insideLeft',
  'insideRight',
  'insideBottom',
  'insideTopLeft',
  'insideTopRight',
  'insideBottomLeft',
  'insideBottomRight'
];
app.configParameters = {
  rotate: {
    min: -90,
    max: 90
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  position: {
    options: posList.reduce( (map:any, pos:any)=> {
      map[pos] = pos;
      return map;
    }, {})
  },
  distance: {
    min: 0,
    max: 100
  }
};
app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  onChange:  () =>{
    const labelOption = {
      rotate: app.config.rotate,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      position: app.config.position,
      distance: app.config.distance
    };
    this.myChart.setOption({
      series: [
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        },
        {
          label: labelOption
        }
      ]
    });
  }
};
this.labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}%',
  fontSize: 12,
  rich: {
    name: {}
  }
};


const labelOption = {
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c} %',
  fontSize: 16,
  rich: {
    name: {}
  }
};

this.option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['donnée']
  },
  series: [
    {
      name: 'réalisé',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320]
    } ,
    {
      name: 'Rest',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320]
    }  
  ]
};


 
}
}



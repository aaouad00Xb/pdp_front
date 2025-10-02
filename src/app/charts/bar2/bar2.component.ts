import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.scss']
})
export class Bar2Component implements OnChanges{


  
  myChart: any;
  option: any;
  labelOption:any

  @Input()
  data1: any[] = [];
  @Input()
  data2: any[] = [];
  @Input()
  data3: any[] = [];

  @Input()
  label: any;


  @Input()
  labels: any[] = [];

  @Input()
  legendLabels: string[] = [];


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
      for(let ele of this.data1){
        ele?.data.forEach((item, index) => {
          ele.data[index] = ele.data[index].toFixed(1);
          // Adjust the number of decimal places as needed
      });

       

       
       

        finaldata.push({
          name: ele.name,
          type: 'bar',
          label: this.labelOption,
          emphasis: {
            focus: 'series'
          },
          data: ele.data
        } )
      }
       
      if(this.option){
        if(this.option){
        let sources = []
        if(this.data1){
          for(let ele of this.data1){
            sources.push([ele.type,ele.qtt])
          }
        }
       
         
        this.option   = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: this.legendLabels.length > 0 ? this.legendLabels : ['Côut estimé en Mds', 'Contribution du CP', 'Contribution des aprtenaires']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              axisLabel: { interval: 0, rotate: 10 },
              data: this.label
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: finaldata
        };
    
          this.myChart ? this.myChart.setOption(this.option):'';
      }
     
      }
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
  formatter: '{c}  ',
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
  formatter: '{c}  ',
  fontSize: 16,
  rich: {
    name: {}
  }
};

this.option   = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Côut estimé en Mds', 'Contribution du CP', 'Contribution des aprtenaires']
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar', 'stack'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['2012', '2013', '2014', '2015', '2016']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Côut estimé en Mds',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Contribution du CP',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'Contribution des aprtenaires',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190]
    } 
  ]
};


 
}
}


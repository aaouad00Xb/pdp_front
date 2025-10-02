import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-evolution2',
  templateUrl: './evolution2.component.html',
  styleUrls: ['./evolution2.component.css']
})
export class Evolution2Component {

  
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
  dates: any[] = [];

  constructor() {
    
   }

  
 
   ngOnChanges(changes: SimpleChanges): void {
    // Check if data1, data2, data3, or labels have changed
    
    
      this.onInputChange(); // Call your function when inputs change
  
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
    this.onInputChange()
  }


  onInputChange(){
    console.log("hello")

    this.option = {
      title: {
        text: 'Suivi du Déblaiment',
        left: 'center',
        top: 5,
        textStyle: {
          color: 'black'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['douars concernés' ,'désigné', 'déblayé',]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
          {
          name: 'douars concernés',
          type: 'line',
          stack: 'Total',
          data: this.data3
        },  
        {
          name: 'désigné',
          type: 'line',
          stack: 'Total',
          data: this.data1
        },
        {
          name: 'déblayé',
          type: 'line',
          stack: 'Total',
          data: this.data2
        },    
        
      ]
    };
    
    

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
  onChange: function () {
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
  formatter: '{c}  {name|{a}}',
  fontSize: 12,
  rich: {
    name: {}
  }
};


this.option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },    
  ]
};


 
}
}

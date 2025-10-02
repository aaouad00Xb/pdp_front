import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {




  myChart: any;
  option: any;
  labelOption: any
  @Input() data1: any ;
  @Input() data2: any ;


  @Input()
  label: any;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if data1, data2, data3, or labels have changed
    
    
      this.onInputChange(); // Call your function when inputs change
  
  }

  ngAfterContentInit(): void {
     
    this.onInputChange()
  }
 

  onInputChange(){
       

      if(this.data1!= null){
         
        this.data1.forEach(item => {
          item.value = item.value.toFixed(3); // Adjust the number of decimal places as needed
      });

        let formater = '{c} MDH';
        // if(this.label == "Surface du gazon en m²"){
        //   formater =  '{c} m²'
        // }else{
        //   formater =  '{c} (U)'
  
        // }
  
  
      if(this.option){
        if(this.option){
          this.option = {
            title: {
              text: this.label,
              left: 'center',
              top: 5,
              textStyle: {
                color: 'black'
              }
            },
            tooltip: {
              trigger: 'item'
            },
          
          
            legend: {
               top: '80%',
              left: 'center',
              bottom: 0, 
              textStyle: {
                fontSize: 9 // Adjust the font size of the legend
              },
              formatter: function (name) {
                // Convert the labels to strings or apply any desired formatting
                return name.toString().substring(0,30)+"..."; // Convert the label to a string
                // Convert the label to a string
            }
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['20%', '60%'],
                avoidLabelOverlap: false,
                label: {
                  show: true, // Set to true to show labels
                  position: 'inside', // Adjust the label position as per your requirement
                  distanceToLabelLine: -10, // Adjust the distance of the labels from the label lines
          
                  formatter: formater // Format the label as per your requirement
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 12, // Adjust the font size of the emphasized label
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: this.data1,
                
              }
            ]
          };
      
    
          this.myChart ? this.myChart.setOption(this.option):'';
      }
     
      }
      }

    
    

  }

  ngOnInit(): void {
    var app:any = {};
    const colorList = ['#164B60', '#1B6B93', '#4FC0D0', '#A2FF86', '#EF6262','#F3AA60'];



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
  tooltip: {
    trigger: 'item'
  },
  title: {
    text: 'titre'
  },

  legend: {
     top: '80%',
    left: 'center',
    bottom: 0, 
    textStyle: {
      fontSize: 9 // Adjust the font size of the legend
    }

  },
  series: [
    {
      name: ' ',
      type: 'pie',
      radius: ['0%', '60%'],
      avoidLabelOverlap: false,
      label: {
        show: true, // Set to true to show labels
        position: 'inside', // Adjust the label position as per your requirement
        distanceToLabelLine: -10, // Adjust the distance of the labels from the label lines

        formatter: '{c}' // Format the label as per your requirement
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12, // Adjust the font size of the emphasized label
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 0, name: 'Veuiller selectioner une année' },
         
      ],
      itemStyle: {
        color:  (params: any)=> {
          return colorList[params.dataIndex % colorList.length];
        }
      }
    }
  ]
};


 
}
}

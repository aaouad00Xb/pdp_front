import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pie2',
  templateUrl: './pie2.component.html',
  styleUrls: ['./pie2.component.css']
})
export class Pie2Component {




  myChart: any;
  option: any;
  labelOption: any
  @Input() data1: any ;
  @Input() data2: any ;
  @Input() data3: boolean = false ;


  @Input()
  label: any;
  colorList
  constructor() {
     // Professional color palette with better contrast and modern look
     this.colorList = [
       '#2E86AB', // Professional blue
       '#A23B72', // Deep magenta
       '#F18F01', // Vibrant orange
       '#C73E1D', // Rich red
       '#6A994E', // Forest green
       '#7209B7', // Royal purple
       '#F77F00', // Amber
       '#D62828', // Crimson
       '#003566', // Navy blue
       '#8B5CF6'  // Modern purple
     ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if data1, data2, data3, or labels have changed
    
    
      this.onInputChange(); // Call your function when inputs change
  
  }

  ngAfterContentInit(): void {
     
    this.onInputChange()
  }


  onInputChange(){
       

      if(this.data1){

      let final_data = []
      for(let ele of Object.keys(this.data1)){
        final_data.push(
          {
            value: this.data1[ele],
            name: ele,
          }
        )
      }
      


    if(this.option){
      if(this.option){
        this.option = {
          title: {
            show: false // Hide title since it's now shown outside the chart
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(50, 50, 50, 0.95)',
            borderColor: 'transparent',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontFamily: 'Tahoma, sans-serif'
            },
            formatter: '{a} <br/>{b}: {c}% ({d}%)',
            extraCssText: 'border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);'
          },
        
        
          legend: {
             top: '80%',
            left: 'center',
            bottom: 5, 
    textStyle: {
      fontSize: 9,
      color: '#4a5568',
      fontFamily: 'Tahoma, sans-serif'
    },
            formatter: function (name) {
              return name.toString().length > 20 ? name.toString().substring(0,20)+"..." : name.toString();
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 6
          },
          series: [
            {
              name: 'Réalisation',
              type: 'pie',
              radius: ['40%', '65%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'inside',
                fontSize: 11,
                fontWeight: '600',
                color: '#fff',
                fontFamily: 'Tahoma, sans-serif',
                formatter: function(params: any) {
                  return params.percent >= 8 ? `${params.value}%` : '';
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 13,
                  fontWeight: 'bold'
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)'
                }
              },
              labelLine: {
                show: false
              },
              data: final_data &&  final_data.map((item, index) => {
                let color;
                // Check for both French and Arabic labels for "Réalisé"/"محقق"
                if (item.name === 'Réalisé' || item.name === 'محقق') {
                    color = '#22c55e'; // Modern green for completed
                } else if (item.name === 'Reste' || item.name === 'باقي') {
                    color = '#ef4444'; // Modern red for remaining
                } else {
                    color = this.colorList[index % this.colorList.length];
                }
                return {
                    value: typeof item.value === 'number' ? item.value.toFixed(1) : parseFloat(item.value).toFixed(1),
                    name: item.name,
                    itemStyle: {
                        color: color,
                        borderColor: '#fff',
                        borderWidth: 2,
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.1)'
                    }
                };
            })
              
            }
          ]
        };
    
  
        this.myChart ? this.myChart.setOption(this.option):'';
    }
   
    }
    }
    

  }


  getColorByClass(param: any): string {
  // Define a mapping of class names to colors
  const classColorMap: Record<string, string> = {
      'Réseau REUE': '#86B6F6',
      'Conduite interne d’arrosage': '#FDE767',
      'Goutte à Goutte': '#74E291',
      ' Asperseur': '#DF2E38',
      'Clapet vanne': '#7F27FF',
      'Divers': '#FF8911',
      'Elagage des palmiers': '#8CB9BD',
      'Elagage des arbres': '#7F27FF',
      'Tonte du gazon': '#74E291',
      'Fertilisation et traitement phytosanitaire': '#A86464',
      'Programme de plantation (arbres, palmiers,arbustes, gazon)': '#FDE767',
      'Désherbage mécanique et manuel': '#DF2E38',

    // Add more mappings as needed
  };

  // Check if class name exists in the mapping
  if (classColorMap.hasOwnProperty(param.name)) {
    return classColorMap[param.name];
  } else {
    // If class name not found, return a random color from colorList
    return  this.colorList[param.dataIndex % this.colorList.length];
  }
}

// Function to generate a random color from colorList
getRandomColorFromList(): string {
  const colorList = ['#164B60', '#1B6B93', '#4FC0D0', '#A2FF86', '#EF6262', '#F3AA60',"#F7B787","#5C8374",'#FF9800'];
  const randomIndex = Math.floor(Math.random() * colorList.length);
  return colorList[randomIndex];
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
    trigger: 'item',
    backgroundColor: 'rgba(50, 50, 50, 0.95)',
    borderColor: 'transparent',
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontFamily: 'Tahoma, sans-serif'
    },
    formatter: '{a} <br/>{b}: {c}% ({d}%)',
    extraCssText: 'border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);'
  },


  legend: {
     top: '80%',
    left: 'center',
    bottom: 10, 
    textStyle: {
      fontSize: 10,
      color: '#4a5568',
      fontFamily: 'Tahoma, sans-serif'
    },
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 8
  },
  series: [
    {
      name: 'Données',
      type: 'pie',
      radius: ['35%', '55%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
        fontSize: 11,
        fontWeight: '600',
        color: '#fff',
        fontFamily: 'Tahoma, sans-serif',
        formatter: function(params: any) {
          return params.percent >= 8 ? `${params.value}%` : '';
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 13,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      itemStyle: {
        color: (params: any)=> {
          return this.colorList[params.dataIndex % this.colorList.length];
        },
        borderColor: '#fff',
        borderWidth: 2,
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      }
    }
  ]
};


 
}
}

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
     this.colorList = ['#164B60', '#1B6B93', '#4FC0D0', '#A2FF86', '#EF6262', '#F3AA60',"#F7B787","#5C8374",'#FF9800'];

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
            text: this.label,
            left: 'center',
            top: 15,
            textStyle: {
              color: 'black'
            }
          },
          tooltip: {
            trigger: 'item'
          },
        
        
          legend: {
             top: '70%',
            left: 'center',
            bottom: 0, 
            textStyle: {
              fontSize: 9 // Adjust the font size of the legend
            },
            formatter: function (name) {
              // Convert the labels to strings or apply any desired formatting
              return name.toString().substring(0,30)+"..."; // Convert the label to a string
          }
          },
          series: [
            {
              name: '--',
              type: 'pie',
              radius: ['30%', '45%'],
              avoidLabelOverlap: false,
              label: {
                show: true, // Set to true to show labels
                position: 'inside', // Adjust the label position as per your requirement
                distanceToLabelLine: -10, // Adjust the distance of the labels from the label lines
        
                formatter: '{c} %' // Format the label as per your requirement
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
              data: final_data &&  final_data.map(item => {
                let color;
                if (item.name === 'Réalisé') {
                    color = 'green'; // Assign green color to 'realisé' category
                } else if (item.name === 'Reste') {
                    color = 'red'; // Assign red color to 'rest' category
                }
                return {
                    value: item.value.toFixed(1),
                    name: item.name,
                    itemStyle: {
                        color: color // Apply the color to the itemStyle
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
    trigger: 'item'
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
      name: 'Access From',
      type: 'pie',
      radius: ['25%', '60%'],
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
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
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
